import puter from '@heyputer/puter.js'

/**
 * Composable for AI-based resume analysis
 */
export function useResumeAnalyzer() {
    const analyzeWithText = async (text) => {
        const response = await puter.ai.chat(
            `Analyze the following resume text and provide a structured summary in JSON format. 
       Include the following fields: 
       - name (The full name of the person)
       - contact (email, phone, location)
       - summary (brief professional summary)
       - experience (list of jobs with title, company, duration, and key_responsibilities as an array of strings. If no jobs found, return empty array [])
       - education (list of degrees with school, degree, year. If no education found, return empty array [])
       - skills (list of technical and soft skills as an array of strings)
       - strengths (top 3 professional strengths as an array of strings)
       - suggestions (3 tips to improve this resume as an array of strings)
       
       IMPORTANT: If you cannot find any information because the document is unreadable or not a resume, return an object with an "error" field.
       Return ONLY the valid JSON object.
       
       Resume Text:
       ${text}`,
            { model: 'gpt-4o' }
        )

        return response
    }

    const analyzeWithImage = async (uploadedFilePath) => {
        const response = await puter.ai.chat(
            [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: `Analyze the attached resume image and provide a structured summary in JSON format. 
                           Include the following fields: 
                           - name (The full name of the person)
                           - contact (email, phone, location)
                           - summary (brief professional summary)
                           - experience (list of jobs with title, company, duration, and key_responsibilities as an array of strings. If no jobs found, return empty array [])
                           - education (list of degrees with school, degree, year. If no education found, return empty array [])
                           - skills (list of technical and soft skills as an array of strings)
                           - strengths (top 3 professional strengths as an array of strings)
                           - suggestions (3 tips to improve this resume as an array of strings)
                           
                           IMPORTANT: If you cannot find any information because the document is unreadable or not a resume, return an object with an "error" field.
                           Return ONLY the valid JSON object.`
                        },
                        {
                            type: 'file',
                            puter_path: uploadedFilePath
                        }
                    ]
                }
            ],
            { model: 'gpt-4o' }
        )

        return response
    }

    const parseResponse = (response) => {
        let content = '';
        if (typeof response === 'string') {
            content = response;
        } else if (response.message && typeof response.message === 'string') {
            content = response.message;
        } else if (response.text && typeof response.text === 'string') {
            content = response.text;
        } else {
            content = response.toString();
        }

        // Clean up markdown code blocks if present
        if (content.includes('```json')) {
            content = content.split('```json')[1].split('```')[0].trim();
        } else if (content.includes('```')) {
            const parts = content.split('```');
            content = parts.length > 1 ? parts[1].trim() : parts[0].trim();
        } else {
            // Find first { and last } to isolate JSON
            const firstBrace = content.indexOf('{');
            const lastBrace = content.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1) {
                content = content.substring(firstBrace, lastBrace + 1);
            }
        }

        return JSON.parse(content)
    }

    return {
        analyzeWithText,
        analyzeWithImage,
        parseResponse
    }
}
