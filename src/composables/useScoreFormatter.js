export function useScoreFormatter() {
    const getScoreColor = (score) => {
        if (score >= 80) return '#4ade80' // Green
        if (score >= 60) return '#facc15' // Yellow
        return '#f87171' // Red
    }

    return {
        getScoreColor
    }
}
