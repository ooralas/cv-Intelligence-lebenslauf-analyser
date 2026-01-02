<script setup>
import Header from './components/Header.vue'
import FileUpload from './components/FileUpload.vue'
import AnalysisView from './components/AnalysisView.vue'
import PuterInfoModal from './components/PuterInfoModal.vue'
import DisclaimerModal from './components/DisclaimerModal.vue'
import { useResumeStore } from './stores/resumeStore'
import { ref, onMounted } from 'vue'

const store = useResumeStore()
const showPuterModal = ref(false)
const showDisclaimerModal = ref(false)
const hasShownModal = ref(false)
const hasAcceptedDisclaimer = ref(false)

onMounted(() => {
  // Check if user has seen the modals before
  hasShownModal.value = localStorage.getItem('puterModalShown') === 'true'
  hasAcceptedDisclaimer.value = localStorage.getItem('disclaimerAccepted') === 'true'
  
  // Show disclaimer on first visit
  if (!hasAcceptedDisclaimer.value) {
    showDisclaimerModal.value = true
  }
})

const handleDisclaimerAccept = () => {
  showDisclaimerModal.value = false
  hasAcceptedDisclaimer.value = true
  localStorage.setItem('disclaimerAccepted', 'true')
}

const handleStartAnalysis = () => {
  // Show Puter modal only on first analysis attempt (after disclaimer)
  if (!hasShownModal.value) {
    showPuterModal.value = true
  } else {
    proceedWithAnalysis()
  }
}

const proceedWithAnalysis = async () => {
  showPuterModal.value = false
  hasShownModal.value = true
  localStorage.setItem('puterModalShown', 'true')
  // Trigger the actual analysis
  await store.analyzeResume()
}

const closeModal = () => {
  showPuterModal.value = false
}
</script>

<template>
  <div class="app-wrapper">
    <Header />
    
    <main>
      <Transition name="fade" mode="out-in">
        <FileUpload v-if="!store.analysisResult" @startAnalysis="handleStartAnalysis" />
        <AnalysisView v-else />
      </Transition>
    </main>
    
    <footer class="app-footer">
      <p>&copy; 2026 CV Intelligence. Powered by Puter AI.</p>
    </footer>
    
    <PuterInfoModal 
      :show="showPuterModal" 
      @close="closeModal"
      @proceed="proceedWithAnalysis"
    />
    
    <DisclaimerModal 
      :show="showDisclaimerModal"
      @accept="handleDisclaimerAccept"
    />
  </div>
</template>

<style>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 90vh;
}

main {
  flex: 1;
}

.app-footer {
  text-align: center;
  color: #64748b;
  font-size: 0.9rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
