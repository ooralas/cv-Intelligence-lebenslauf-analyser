/**
 * Flattens and cleans an array, ensuring only valid strings remain.
 * Handles nested arrays and extracts values from objects if necessary.
 * @param {Array} list - The list to clean
 * @returns {Array<string>} - Cleaned list of strings
 */
export const cleanList = (list) => {
    if (!Array.isArray(list)) return [];
    return list
        .flat(Infinity)
        .filter(item => item) // Remove null/undefined
        .map(item => {
            if (typeof item === 'object') return item.value || item.name || JSON.stringify(item);
            return String(item).trim();
        });
};

/**
 * Normalizes the raw AI response into a consistent structure.
 * Applies fallbacks and default values.
 * @param {Object} rawData - The raw JSON from AI
 * @returns {Object} - Normalized Resume Data
 */
export const normalizeResumeData = (rawData) => {
    if (!rawData) return null;

    const data = {
        profile: rawData.profile || rawData.contact || rawData.contact_information || rawData.personal_information || {},

        score: rawData.score || (rawData.professional_experience?.length > 0 ? 80 : 0),

        executive_summary: rawData.executive_summary || rawData.summary || "Keine Zusammenfassung verfügbar.",

        strengths: cleanList(
            rawData.strengths ||
            rawData.skills ||
            rawData.skills_interests ||
            rawData.skills_and_interests ||
            rawData.key_skills ||
            []
        ),

        weaknesses: cleanList(rawData.weaknesses || []),

        improvements: cleanList(rawData.improvements || rawData.suggestions || [])
    };

    // Rely strictly on AI output for consistent results.

    // Normalize Profile Name - derived from AI output structure
    if (!data.profile.name || data.profile.name === "Unbekannter Kandidat") {
        if (rawData.name) data.profile.name = rawData.name;
        else if (rawData.contact?.name) data.profile.name = rawData.contact.name;
        else if (rawData.personal_information?.name) data.profile.name = rawData.personal_information.name;
        else data.profile.name = "Unbekannter Kandidat";
    }

    return data;
};

/**
 * Validates if the data is sufficient to display a result.
 * @param {Object} data 
 * @returns {Boolean}
 */
export const isValidAnalysis = (data) => {
    if (!data) return false;
    return data.strengths.length > 0 || data.weaknesses.length > 0 || data.improvements.length > 0;
};
