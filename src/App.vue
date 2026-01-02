<script setup>
import FileUpload from './components/FileUpload.vue'
import AnalysisView from './components/AnalysisView.vue'
import PuterInfoModal from './components/PuterInfoModal.vue'
import DisclaimerModal from './components/DisclaimerModal.vue'
import { useResumeStore } from './stores/resumeStore'
import { ref } from 'vue'

const store = useResumeStore()
const showPuterModal = ref(false)
const showDisclaimer = ref(false)

// Init: Check if disclaimer was already accepted
if (!localStorage.getItem('disclaimerAccepted')) {
    showDisclaimer.value = true
}

const handleDisclaimerAccept = () => {
    showDisclaimer.value = false
    localStorage.setItem('disclaimerAccepted', 'true')
}

const handleStartAnalysis = () => {
  const modalShown = localStorage.getItem('puterModalShown')
  if (!modalShown) {
    showPuterModal.value = true
  } else {
    store.analyzeResume()
  }
}

const handleModalClose = () => {
  showPuterModal.value = false
  localStorage.setItem('puterModalShown', 'true') // Mark as shown
  store.analyzeResume() // Proceed with analysis
}
</script>

<template>
  <div class="notion-page">
    <DisclaimerModal :show="showDisclaimer" @accept="handleDisclaimerAccept" />
    
    <!-- Top Icon & Title (Notion Page Header) -->
    <div style="margin-bottom: 3rem; margin-top: 2rem;">
        <div style="font-size: 78px; line-height: 1; margin-bottom: 1rem;">📝</div>
        <h1 style="margin-top: 0; margin-bottom: 0.5rem; color: var(--text-primary);">Lebenslauf Analyse</h1>
        <p style="color: var(--text-secondary); font-size: 18px; margin: 0;">
            Kritische HR-Analyse (Stärken, Schwächen, Optimierung)
        </p>
    </div>

    <!-- Main Block -->
    <main>
      <FileUpload v-if="!store.analysisResult" @startAnalysis="handleStartAnalysis" />
      <AnalysisView v-else />
    </main>

    <PuterInfoModal 
      :show="showPuterModal" 
      @proceed="handleModalClose"
      @close="showPuterModal = false"
    />
  </div>
</template>

<style>
/* No scoped styles needed, global Notion styles from style.css are used */
</style>
