<script setup>
import { useResumeStore } from '../stores/resumeStore'
import { computed, ref, watch } from 'vue'

const store = useResumeStore()
const result = computed(() => store.analysisResult)

// Simple score color logic
const scoreColorClass = computed(() => {
    const s = result.value?.score || 0
    if (s >= 90) return 'green'
    if (s >= 75) return 'blue'
    if (s >= 60) return 'yellow'
    return 'red'
})

// Checkbox Logic for Improvements
const checkedImprovements = ref(new Set())

const toggleImprovement = (index) => {
    if (checkedImprovements.value.has(index)) {
        checkedImprovements.value.delete(index)
    } else {
        checkedImprovements.value.add(index)
    }
}

// Reset checkboxes when result changes
watch(result, () => {
    checkedImprovements.value.clear()
})
</script>

<template>
    <div v-if="result" class="analysis-content">
        
        <!-- Notion Properties Section (Metadata) -->
        <div class="properties">
            <div class="property-item">
                <div class="prop-label">Name</div>
                <div class="prop-value">{{ result.profile.name }}</div>
            </div>
            <div class="property-item">
                <div class="prop-label">Headline</div>
                <div class="prop-value">{{ result.profile.headline || 'Nicht angegeben' }}</div>
            </div>
            <div class="property-item">
                <div class="prop-label">Score</div>
                <div class="prop-value">
                    <span class="score-tag" :class="scoreColorClass">
                        {{ result.score }}/100
                    </span>
                </div>
            </div>
        </div>

    

        <!-- Executive Summary Callout -->
        <div class="notion-callout animate-fade-in" style="animation-delay: 0.1s;">
            <span class="icon">💡</span>
            <div>
                <b style="font-size: 1.1em;">Executive Summary</b>
                <div style="margin-top: 4px; color: var(--text-primary); line-height: 1.6;">
                    {{ result.executive_summary }}
                </div>
            </div>
        </div>
        
        <!-- Grid Layout for Strengths & Weaknesses -->
        <div class="grid-row">
            <!-- Strengths Column -->
            <div class="column animate-fade-in" style="animation-delay: 0.2s;">
                <h2 class="section-title green-text">
                    <span class="icon-small">💪</span> Stärken
                </h2>
                <div class="styled-list">
                    <div v-for="(item, index) in result.strengths" :key="index" class="list-item">
                        <span class="bullet green">✓</span>
                        <span class="content">{{ item }}</span>
                    </div>
                </div>
            </div>

            <!-- Weaknesses Column -->
            <div class="column animate-fade-in" style="animation-delay: 0.3s;">
                <h2 class="section-title red-text">
                    <span class="icon-small">🚩</span> Schwächen
                </h2>
                <div class="styled-list">
                    <div v-for="(item, index) in result.weaknesses" :key="index" class="list-item">
                        <span class="bullet red">!</span>
                        <span class="content">{{ item }}</span>
                    </div>
                </div>
            </div>
        </div>

        <hr class="notion-divider" style="margin: 40px 0;" />

        <!-- Improvements Full Width -->
        <div class="section animate-fade-in" style="animation-delay: 0.4s;">
            <h2 class="section-title blue-text">
                <span class="icon-small">🚀</span> Potenzial
            </h2>
            <div class="improvements-grid">
                <div 
                    v-for="(item, index) in result.improvements" 
                    :key="index" 
                    class="improvement-card"
                    :class="{ completed: checkedImprovements.has(index) }"
                    @click="toggleImprovement(index)"
                >
                    <input 
                        type="checkbox" 
                        class="modern-checkbox" 
                        :checked="checkedImprovements.has(index)"
                        readonly 
                    />
                    <span class="improvement-text">{{ item }}</span>
                </div>
            </div>
        </div>

        <!-- Action Button at bottom -->
        <div style="margin-top: 5rem; text-align: center;">
            <button @click="store.reset()" class="notion-btn">
                ← Neue Analyse starten
            </button>
        </div>

    </div>
</template>

<style scoped>
/* Top Properties */
.properties {
    font-size: 14px;
    margin-bottom: 32px;
    color: var(--text-primary);
    display: flex;
    gap: 48px; 
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border-subtle);
}

.property-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.prop-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-tertiary);
    font-weight: 600;
}

.prop-value {
    font-size: 15px;
    font-weight: 500;
    color: var(--text-primary);
}

/* Grid Layout */
.grid-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    margin-top: 32px;
}

@media (max-width: 768px) {
    .grid-row {
        grid-template-columns: 1fr;
        gap: 32px;
    }
}

/* Typography */
.section-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border-subtle);
}

.icon-small { font-size: 18px; }

.green-text { color: #2d7d55; }
.red-text { color: #d44c47; }
.blue-text { color: #0b6e99; }

/* Styled Lists */
.styled-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.list-item {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    line-height: 1.6;
    font-size: 15px;
}

.bullet {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 800;
    flex-shrink: 0;
    margin-top: 2px;
}

.bullet.green { background: #dbeddb; color: #2d7d55; }
.bullet.red { background: #ffe2dd; color: #d44c47; }

/* Improvements */
.improvements-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

.improvement-card {
    background: #f7f9fb; 
    padding: 16px;
    border-radius: 8px;
    display: flex;
    gap: 12px;
    align-items: flex-start;
    border: 1px solid transparent;
    transition: all 0.2s;
    cursor: pointer;
}

.improvement-card:hover {
    background: #edf3f8;
    border-color: rgba(35, 131, 226, 0.2);
}

.improvement-card.completed {
    background: #f0f0f0;
    opacity: 0.6;
}

.improvement-card.completed .improvement-text {
    text-decoration: line-through;
    color: var(--text-tertiary);
}

.modern-checkbox {
    margin-top: 4px;
    accent-color: #2383E2;
    cursor: pointer;
    width: 16px;
    height: 16px;
}

.improvement-text {
    transition: all 0.2s;
}

/* Notion divider */
.notion-divider {
    border: none;
    border-top: 1px solid var(--border-subtle);
    margin: 24px 0;
}

/* Score Tags */
.score-tag {
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: 600;
}
.score-tag.green { background: #dbeddb; color: #2d7d55; }
.score-tag.blue { background: #d3e5ef; color: #0b6e99; }
.score-tag.yellow { background: #fdecc8; color: #d9730d; }
.score-tag.red { background: #ffe2dd; color: #d44c47; }

/* Callout */
.notion-callout {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-radius: 6px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  margin: 12px 0;
  border: 1px solid transparent;
}
</style>
