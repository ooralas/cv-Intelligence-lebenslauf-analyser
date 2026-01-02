<script setup>
import { useResumeStore } from '../stores/resumeStore'
import { useScoreFormatter } from '../composables/useScoreFormatter'
import { computed } from 'vue'

const store = useResumeStore()
const { getScoreColor } = useScoreFormatter()
const result = computed(() => store.analysisResult)
const profile = computed(() => result.value?.profile || {})
</script>

<template>
  <div class="analysis-container glass">
    <!-- Header Section -->
    <div class="header-section">
      <div class="profile-main">
        <div class="avatar" :style="{ borderColor: getScoreColor(result?.score) }">
          {{ profile.name?.charAt(0) || '?' }}
        </div>
        <div class="info">
          <h2>{{ profile.name || 'Unbekannter Kandidat' }}</h2>
          <p class="headline">{{ profile.headline }}</p>
          <p class="location" v-if="profile.location">📍 {{ profile.location }}</p>
        </div>
      </div>
      
      <div class="score-card">
        <div class="score-ring" :style="{ borderColor: getScoreColor(result?.score) }">
          <span class="score-number">{{ result?.score || 0 }}</span>
        </div>
        <span class="score-label">Gesamtbewertung</span>
      </div>
    </div>

    <!-- Executive Summary -->
    <div class="summary-section">
      <h3>🔍 Executive Summary</h3>
      <p>{{ result?.executive_summary }}</p>
    </div>

    <!-- Grid Layout for Analysis -->
    <div class="analysis-grid">
      <!-- Strengths -->
      <div class="card card-green">
        <div class="card-header">
          <span class="card-icon">💪</span>
          <h4>Stärken</h4>
        </div>
        <ul>
          <li v-for="(item, index) in result?.strengths" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>

      <!-- Weaknesses -->
      <div class="card card-red">
        <div class="card-header">
          <span class="card-icon">🚩</span>
          <h4>Schwachstellen</h4>
        </div>
        <ul>
          <li v-for="(item, index) in result?.weaknesses" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>

      <!-- Improvements -->
      <div class="card card-blue">
        <div class="card-header">
          <span class="card-icon">🚀</span>
          <h4>Verbesserungspotenzial</h4>
        </div>
        <ul>
          <li v-for="(item, index) in result?.improvements" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <div class="action-footer">
      <button @click="store.reset" class="secondary">Neue Analyse</button>
    </div>
  </div>
</template>

<style scoped>
.analysis-container {
  padding: 3rem;
  max-width: 1000px;
  margin: 0 auto;
  animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Header Styling */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.profile-main {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  border: 3px solid #60a5fa;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.info h2 {
  margin: 0;
  font-size: 2rem;
  background: linear-gradient(to right, #fff, #cbd5e1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.headline {
  color: #60a5fa;
  font-size: 1.1rem;
  margin: 0.3rem 0;
}

.location {
  color: #94a3b8;
  font-size: 0.9rem;
  margin: 0;
}

/* Score Styling */
.score-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.score-ring {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 6px solid #4ade80;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  background: rgba(0,0,0,0.2);
}

.score-number {
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
}

.score-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #94a3b8;
}

/* Summary Section */
.summary-section {
  margin-bottom: 3rem;
  background: rgba(255,255,255,0.03);
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 4px solid #facc15;
}

.summary-section h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #facc15;
}

.summary-section p {
  color: #e2e8f0;
  line-height: 1.7;
  font-size: 1.05rem;
  margin: 0;
}

/* Grid Layout */
.analysis-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.card {
  padding: 1.5rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.card-icon {
  font-size: 1.5rem;
}

.card h4 {
  margin: 0;
  font-size: 1.2rem;
}

.card ul {
  margin: 0;
  padding-left: 0;
  list-style: none;
}

.card li {
  margin-bottom: 0.8rem;
  padding-left: 1.2rem;
  position: relative;
  color: #cbd5e1;
  font-size: 0.95rem;
}

.card li::before {
  content: "•";
  position: absolute;
  left: 0;
  font-weight: bold;
}

/* Card Variants */
.card-green {
  border-top: 4px solid #4ade80;
}
.card-green h4 { color: #4ade80; }
.card-green li::before { color: #4ade80; }

.card-red {
  border-top: 4px solid #f87171;
}
.card-red h4 { color: #f87171; }
.card-red li::before { color: #f87171; }

.card-blue {
  border-top: 4px solid #60a5fa;
}
.card-blue h4 { color: #60a5fa; }
.card-blue li::before { color: #60a5fa; }

.action-footer {
  text-align: center;
  margin-top: 2rem;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  
  .profile-main {
    flex-direction: column;
  }
  
  .analysis-grid {
    grid-template-columns: 1fr;
  }
  
  .analysis-container {
    padding: 1.5rem;
  }
}
</style>
