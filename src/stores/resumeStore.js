import { defineStore } from 'pinia'
import { usePuter } from '../composables/usePuter'
import { normalizeResumeData, isValidAnalysis } from '../utils/dataHelpers'

export const useResumeStore = defineStore('resume', {
    state: () => ({
        resumeFile: null,
        analysisResult: null,
        isAnalyzing: false,
        error: null,

        // Internal: used to prevent stale responses overriding newer ones
        _analysisRunId: 0,
    }),

    actions: {
        setResumeFile(file) {
            this.resumeFile = file
            this.error = null
            this.analysisResult = null

            // Invalidate any in-flight analysis result
            this._analysisRunId += 1
        },

        async analyzeResume() {
            // Avoid parallel runs
            if (this.isAnalyzing) return
            if (!this.resumeFile) return

            const runId = ++this._analysisRunId

            this.isAnalyzing = true
            this.error = null
            this.analysisResult = null

            const puter = usePuter()
            let uploadedFile = null

            try {
                // Upload file (PDF or image)
                uploadedFile = await puter.uploadFile(this.resumeFile)

                const uploadedPath = uploadedFile?.path
                const uploadedName = uploadedFile?.name

                if (!uploadedPath || !uploadedName) {
                    throw new Error('Upload failed: missing uploaded file reference.')
                }

                let response
                try {
                    response = await puter.analyzeWithFile(uploadedPath)
                } finally {
                    // Best-effort cleanup
                    try {
                        await puter.deleteFile(uploadedName)
                    } catch (cleanupErr) {
                        console.warn('Cleanup failed (deleteFile):', cleanupErr)
                    }
                }

                // If user changed file or started a new run meanwhile, ignore this result
                if (runId !== this._analysisRunId) return

                let rawData
                try {
                    rawData = puter.parseResponse(response)
                } catch (parseErr) {
                    console.error('Failed to parse analyzer response:', parseErr, response)
                    throw new Error('Die Analyse lieferte ein unerwartetes Format.')
                }

                let normalizedData
                try {
                    normalizedData = normalizeResumeData(rawData)
                } catch (normalizeErr) {
                    console.error('Failed to normalize resume data:', normalizeErr, rawData)
                    throw new Error('Die Analyse lieferte keine verwertbaren Ergebnisse.')
                }

                if (!isValidAnalysis(normalizedData)) {
                    console.error('Invalid AI response structure:', rawData)
                    throw new Error('Die Analyse lieferte keine verwertbaren Ergebnisse.')
                }

                // Final stale-check before committing state
                if (runId !== this._analysisRunId) return

                this.analysisResult = normalizedData
            } catch (err) {
                // Ignore errors from stale runs
                if (runId !== this._analysisRunId) return

                console.error('Analysis failed:', err)

                const message =
                    (err && typeof err === 'object' && 'message' in err && err.message) ||
                    'Fehler: Die KI konnte diesen Lebenslauf nicht lesen. Bitte lade eine besser lesbare Datei hoch.'

                this.error = message
            } finally {
                // Only end "isAnalyzing" if this is still the latest run
                if (runId === this._analysisRunId) {
                    this.isAnalyzing = false
                }
            }
        },

        reset() {
            this.resumeFile = null
            this.analysisResult = null
            this.isAnalyzing = false
            this.error = null

            // Invalidate any in-flight run
            this._analysisRunId += 1
        },
    },
})
