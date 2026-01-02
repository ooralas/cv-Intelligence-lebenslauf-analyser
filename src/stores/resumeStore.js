import { defineStore } from 'pinia'
import { usePdfExtractor } from '../composables/usePdfExtractor'
import { useResumeAnalyzer } from '../composables/useResumeAnalyzer'
import { usePuterFileSystem } from '../composables/usePuterFileSystem'

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
        },

        async analyzeResume() {
            if (!this.resumeFile) return

            this.isAnalyzing = true
            this.error = null
            this.analysisResult = null

            try {
                const { extractTextFromPDF } = usePdfExtractor()
                const { analyzeWithText, analyzeWithImage, parseResponse } = useResumeAnalyzer()
                const { uploadFile } = usePuterFileSystem()

                const fileType = this.resumeFile.type
                let response

                // For PDFs: Extract text first, then send as text prompt
                if (fileType === 'application/pdf') {
                    const extractedText = await extractTextFromPDF(this.resumeFile)
                    response = await analyzeWithText(extractedText)
                }
                // For images: Use vision model with file upload
                else if (fileType.startsWith('image/')) {
                    const uploadedFile = await uploadFile(this.resumeFile)
                    response = await analyzeWithImage(uploadedFile.path)
                } else {
                    throw new Error('Unsupported file type. Please upload a PDF or image file.')
                }

                const data = parseResponse(response)

                // Validation: Check if the AI returned an error or an empty name
                if (data.error || (!data.name && !data.experience?.length)) {
                    throw new Error('AI could not extract resume data')
                }

                this.analysisResult = data
            } catch (err) {
                console.error('Analysis failed:', err)
                this.error = err.message || 'Fehler: Die KI konnte diesen Lebenslauf nicht lesen. Bitte lade eine besser lesbare Datei hoch.'
            } finally {
                this.isAnalyzing = false
            }
        },

        reset() {
            this.resumeFile = null
            this.analysisResult = null
            this.isAnalyzing = false
            this.error = null
        }
    },
})
