import puter from '@heyputer/puter.js'
import { ANALYSIS_SYSTEM_PROMPT, ANALYSIS_USER_PROMPT_FILE } from '../config/prompts'

/**
 * Composable for AI-based resume analysis
 * Focus: Critical Review (Strengths, Weaknesses, Improvements)
 */
export function useResumeAnalyzer() {

    // Unified function for PDF and Images (File-based analysis)
    const analyzeWithFile = async (uploadedFilePath) => {
        const response = await puter.ai.chat(
            [
                {
                    role: 'system',
                    content: ANALYSIS_SYSTEM_PROMPT
                },
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: ANALYSIS_USER_PROMPT_FILE
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
        analyzeWithFile,
        parseResponse
    }
}
