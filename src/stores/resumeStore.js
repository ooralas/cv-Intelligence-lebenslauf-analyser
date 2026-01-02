import { defineStore } from 'pinia'
import { useResumeAnalyzer } from '../composables/useResumeAnalyzer'
import { usePuterFileSystem } from '../composables/usePuterFileSystem'
import { normalizeResumeData, isValidAnalysis } from '../utils/dataHelpers'

export const useResumeStore = defineStore('resume', {
    state: () => ({
        resumeFile: null,
        analysisResult: null,
        isAnalyzing: false,
        error: null,
    }),
    actions: {
        setResumeFile(file) {
            this.resumeFile = file
            this.error = null
            this.analysisResult = null
        },

        async analyzeResume() {
            if (!this.resumeFile) return

            this.isAnalyzing = true
            this.error = null
            this.analysisResult = null

            const analyzer = useResumeAnalyzer()
            const puterFs = usePuterFileSystem()

            try {
                // Unified Flow: Upload ANY file (PDF or Image) and let AI analyze it directly
                // This allows the AI (GPT-4o) to see the full layout and structure of the PDF
                const uploadedFile = await puterFs.uploadFile(this.resumeFile)
                let response

                try {
                    // Use new unified file analysis function
                    response = await analyzer.analyzeWithFile(uploadedFile.path)
                } finally {
                    // Cleanup: Delete temporary file always, even if analysis fails
                    await puterFs.deleteFile(uploadedFile.name)
                }

                const rawData = analyzer.parseResponse(response)
                const normalizedData = normalizeResumeData(rawData)

                // Validation
                if (!isValidAnalysis(normalizedData)) {
                    console.error("Invalid AI Response Structure:", rawData);
                    throw new Error('Die Analyste lieferte keine verwertbaren Ergebnisse.');
                }

                this.analysisResult = normalizedData
            } catch (err) {
                console.error('Analysis failed:', err)
                this.error = err.message || 'Fehler: Die KI konnte diesen Lebenslauf nicht lesen. Bitte lade eine besser lesbare Datei hoch.'
            } finally {
                this.isAnalyzing = false
            }
        },

        reset() {
            this.resumeFile = null;
            this.analysisResult = null;
            this.isAnalyzing = false;
            this.error = null;
        }
    },
})
