import * as pdfjsLib from 'pdfjs-dist'

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.530/build/pdf.worker.min.mjs`

/**
 * Composable for PDF text extraction
 */
export function usePdfExtractor() {
    const extractTextFromPDF = async (file) => {
        try {
            const arrayBuffer = await file.arrayBuffer()
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
            let fullText = ''

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i)
                const textContent = await page.getTextContent()
                const pageText = textContent.items.map(item => item.str).join(' ')
                fullText += pageText + '\n'
            }

            return fullText
        } catch (error) {
            console.error('PDF extraction failed:', error)
            throw new Error('Fehler beim Extrahieren des PDF-Texts')
        }
    }

    return {
        extractTextFromPDF
    }
}
