<script setup>
import { useResumeStore } from '../stores/resumeStore'

const store = useResumeStore()
</script>

<template>
  <div v-if="store.analysisResult" class="analysis-view">
    <div class="main-card glass animate-in">
      <div class="user-info">
        <div class="avatar">
           {{ store.analysisResult.name ? store.analysisResult.name.charAt(0) : '?' }}
        </div>
        <div>
           <h2>{{ store.analysisResult.name || 'Unbekannter Name' }}</h2>
           <p class="contact-info" v-if="store.analysisResult.contact">
             {{ store.analysisResult.contact.email || 'Keine E-Mail' }} | 
             {{ store.analysisResult.contact.phone || 'Keine Telefonnummer' }} | 
             {{ store.analysisResult.contact.location || 'Kein Standort' }}
           </p>
           <p class="contact-info" v-else>Keine Kontaktinformationen gefunden</p>
        </div>
      </div>

      <div class="section">
        <h3>Zusammenfassung</h3>
        <p>{{ store.analysisResult.summary }}</p>
      </div>

      <div class="grid">
        <div class="section">
          <h3>Erfahrung</h3>
          <div v-if="store.analysisResult.experience && store.analysisResult.experience.length">
            <div v-for="(job, index) in store.analysisResult.experience" :key="index" class="item">
                <strong>{{ job.title }}</strong> bei {{ job.company }}
                <span class="sub">{{ job.duration }}</span>
                <ul v-if="job.key_responsibilities">
                <li v-for="resp in job.key_responsibilities" :key="resp">{{ resp }}</li>
                </ul>
            </div>
          </div>
          <p v-else class="empty-msg">Keine Berufserfahrung extrahiert</p>
        </div>

        <div class="section">
          <h3>Ausbildung</h3>
          <div v-if="store.analysisResult.education && store.analysisResult.education.length">
            <div v-for="(edu, index) in store.analysisResult.education" :key="index" class="item">
                <strong>{{ edu.degree }}</strong>
                <span class="sub">{{ edu.school }} ({{ edu.year }})</span>
            </div>
          </div>
          <p v-else class="empty-msg">Keine Ausbildung extrahiert</p>
          
          <h3 class="mt-2">Fähigkeiten</h3>
          <div v-if="store.analysisResult.skills && store.analysisResult.skills.length" class="tags">
            <span v-for="skill in store.analysisResult.skills" :key="skill" class="tag">{{ skill }}</span>
          </div>
          <p v-else class="empty-msg">Keine Fähigkeiten extrahiert</p>
        </div>
      </div>

      <div class="grid footer-grid">
        <div class="section strength-section">
          <h3>Stärken</h3>
          <ul v-if="store.analysisResult.strengths && store.analysisResult.strengths.length">
            <li v-for="strength in store.analysisResult.strengths" :key="strength">{{ strength }}</li>
          </ul>
          <p v-else class="empty-msg">Keine Stärken gefunden</p>
        </div>
        <div class="section suggestion-section">
          <h3>Verbesserungsvorschläge</h3>
          <ul v-if="store.analysisResult.suggestions && store.analysisResult.suggestions.length">
            <li v-for="tip in store.analysisResult.suggestions" :key="tip">{{ tip }}</li>
          </ul>
          <p v-else class="empty-msg">Keine Vorschläge verfügbar</p>
        </div>
      </div>
      
      <div class="reset-container">
          <button @click="store.reset()" class="secondary">Neue Analyse</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.analysis-view {
  margin-top: 2rem;
}

.main-card {
  padding: 3rem;
  animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 2rem;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  box-shadow: 0 10px 20px rgba(96, 165, 250, 0.4);
}

.contact-info {
  color: #a0a0a0;
  font-size: 0.9rem;
}

h2 {
  margin: 0;
  font-size: 2.2rem;
}

h3 {
  color: #60a5fa;
  border-left: 4px solid #a78bfa;
  padding-left: 1rem;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.section {
  margin-bottom: 2.5rem;
}

.grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 3rem;
}

.item {
  margin-bottom: 1.5rem;
}

.sub {
  display: block;
  color: #888;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

ul {
  padding-left: 1.2rem;
  margin-top: 0.5rem;
}

li {
  margin-bottom: 0.4rem;
  color: #ddd;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: rgba(96, 165, 250, 0.2);
  border: 1px solid rgba(96, 165, 250, 0.4);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #60a5fa;
}

.mt-2 {
  margin-top: 2rem;
}

.empty-msg {
    color: #666;
    font-size: 0.9rem;
    font-style: italic;
}

.strength-section, .suggestion-section {
    background: rgba(255,255,255,0.02);
    padding: 1.5rem;
    border-radius: 16px;
}

.footer-grid {
    grid-template-columns: 1fr 1fr;
}

.reset-container {
    text-align: center;
    margin-top: 2rem;
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 900px) {
  .grid, .footer-grid {
    grid-template-columns: 1fr;
  }
  .main-card {
      padding: 1.5rem;
  }
  .user-info {
      flex-direction: column;
      text-align: center;
      gap: 1rem;
  }
}
</style>
