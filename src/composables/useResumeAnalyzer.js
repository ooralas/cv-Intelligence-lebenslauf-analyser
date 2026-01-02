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
        // Debug Log
        console.log("Raw AI Response:", response);

        // 1. Detection of Usage Limits (Specific Paths & Text Search)
        try {
            // Path 1: Deep Puter Structure (as seen in logs)
            const textDeep = response?.result?.message?.content?.[0]?.text;
            // Path 2: Standard structure
            const textStandard = response?.message?.content?.[0]?.text;
            // Path 3: Stringify fallback
            const stringified = typeof response === 'object' ? JSON.stringify(response) : String(response);

            const checks = [textDeep, textStandard, stringified].filter(Boolean).join(' ').toLowerCase();

            if (checks.includes('usage limit') ||
                checks.includes('reached your ai') ||
                checks.includes('quota exceeded')) {
                throw new Error('Das tägliche KI-Limit ist vorübergehend erreicht. Bitte warten Sie einen Moment oder versuchen Sie es später erneut.');
            }
        } catch (e) {
            // Rethrow specific limit error
            if (e.message.includes('Limit')) throw e;
        }

        let content = '';

        // 2. Extract Content Safely
        if (typeof response === 'string') {
            content = response;
        } else if (response?.message?.content && typeof response.message.content === 'string') {
            content = response.message.content;
        } else if (response?.text && typeof response.text === 'string') {
            content = response.text;
        } else if (response?.message && typeof response.message === 'string') {
            content = response.message;
        } else {
            // Last resort: Stringify
            content = JSON.stringify(response);
        }

        // 3. Clean Markdown & Markers
        if (content.includes('```json')) {
            content = content.split('```json')[1].split('```')[0].trim();
        } else if (content.includes('```')) {
            const parts = content.split('```');
            content = parts.length > 1 ? parts[1].trim() : parts[0].trim();
        }

        // 4. Force JSON Isolation (Start from first { to last })
        const firstBrace = content.indexOf('{');
        const lastBrace = content.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
            content = content.substring(firstBrace, lastBrace + 1);
        }

        // 5. Safe Parse
        try {
            return JSON.parse(content);
        } catch (e) {
            console.error("JSON Parse Error on content:", content);
            throw new Error('Die Antwort konnte nicht verarbeitet werden (JSON Fehler).');
        }
    }

    return {
        analyzeWithFile,
        parseResponse
    }
}
