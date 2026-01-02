<script setup>
import { ref } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'proceed'])

const handleProceed = () => {
  emit('proceed')
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-overlay" @click.self="emit('close')">
      <div class="modal-content">
        <div class="modal-header">
          <span class="info-icon">ℹ️</span>
          <h3>Puter.js Authentifizierung erforderlich</h3>
        </div>
        
        <div class="modal-body">
          <p>
            Um deinen Lebenslauf zu analysieren, benötigt diese App Zugriff auf <strong>Puter.js</strong> – 
            eine sichere Cloud-Plattform für KI-Dienste.
          </p>
          
          <div class="info-box">
            <h4>Was passiert als Nächstes?</h4>
            <ul>
              <li>📂 Ein neues Fenster wird geöffnet</li>
              <li>🔐 Du wirst aufgefordert, dich bei Puter anzumelden oder zu registrieren</li>
              <li>✅ Nach der Authentifizierung kannst du die Analyse starten</li>
            </ul>
          </div>
          
          <p class="privacy-note">
            Weitere Informationen zum Datenschutz findest du in der 
            <a href="https://puter.com/privacy" target="_blank" rel="noopener noreferrer">
              Puter.js Datenschutzerklärung
            </a>.
          </p>
        </div>
        
        <div class="modal-actions">
          <button @click="handleProceed" class="primary-btn">
            Verstanden, fortfahren
          </button>
          <button @click="emit('close')" class="secondary">
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.98) 0%, rgba(51, 65, 85, 0.98) 100%);
  border: 1px solid rgba(96, 165, 250, 0.3);
  border-radius: 20px;
  padding: 2rem;
  max-width: 550px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.info-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.modal-body {
  margin-bottom: 2rem;
}

.modal-body p {
  color: #e2e8f0;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.info-box {
  background: rgba(96, 165, 250, 0.1);
  border: 1px solid rgba(96, 165, 250, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.info-box h4 {
  margin: 0 0 1rem 0;
  color: #60a5fa;
  font-size: 1.1rem;
}

.info-box ul {
  margin: 0;
  padding-left: 1.2rem;
  color: #cbd5e1;
}

.info-box li {
  margin-bottom: 0.7rem;
  line-height: 1.6;
}

.privacy-note {
  font-size: 0.9rem;
  color: #94a3b8;
  background: rgba(167, 139, 250, 0.1);
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid #a78bfa;
}

.privacy-note a {
  color: #60a5fa;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.privacy-note a:hover {
  color: #a78bfa;
  text-decoration: underline;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.modal-actions button {
  flex: 1;
  min-width: 140px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95) translateY(20px);
}

@media (max-width: 600px) {
  .modal-content {
    padding: 1.5rem;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .modal-actions button {
    width: 100%;
  }
}
</style>
