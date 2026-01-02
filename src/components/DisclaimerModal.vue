<script setup>
import { ref } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['accept'])

const handleAccept = () => {
  emit('accept')
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <span class="warning-icon">⚠️</span>
          <h3>Wichtiger Hinweis</h3>
        </div>
        
        <div class="modal-body">
          <div class="disclaimer-box">
            <h4>🧪 Demo- und Testanwendung</h4>
            <p>
              Diese Anwendung dient ausschließlich zu <strong>Entwicklungs- und Testzwecken</strong> 
              der Puter.js-Technologie. Sie ist <strong>nicht für den produktiven Einsatz</strong> 
              oder die Verarbeitung sensibler Daten vorgesehen.
            </p>
          </div>

          <div class="warning-box">
            <h4>🚫 Haftungsausschluss</h4>
            <ul>
              <li>Diese App wird <strong>ohne jegliche Garantie</strong> bereitgestellt</li>
              <li>Verwenden Sie <strong>keine echten oder sensiblen Lebensläufe</strong></li>
              <li>Der Entwickler übernimmt <strong>keine Verantwortung</strong> für:
                <ul>
                  <li>Datenverlust oder Datenschutzverletzungen</li>
                  <li>Fehlerhafte Analyseergebnisse</li>
                  <li>Verfügbarkeit oder Funktionsfähigkeit</li>
                </ul>
              </li>
            </ul>
          </div>

          <div class="info-box">
            <h4>✅ Empfohlene Nutzung</h4>
            <p>
              Verwenden Sie ausschließlich <strong>Beispiel- oder Testdaten</strong>, 
              um die Funktionalität der KI-Analyse zu testen.
            </p>
          </div>

          <p class="legal-note">
            Durch die Nutzung dieser Anwendung bestätigen Sie, dass Sie diese Hinweise 
            zur Kenntnis genommen haben und auf eigene Verantwortung handeln.
          </p>
        </div>
        
        <div class="modal-actions">
          <button @click="handleAccept" class="primary-btn">
            Verstanden, fortfahren
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
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
}

.modal-content {
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.98) 0%, rgba(51, 65, 85, 0.98) 100%);
  border: 2px solid rgba(239, 68, 68, 0.5);
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.warning-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

.modal-header h3 {
  margin: 0;
  font-size: 1.8rem;
  color: #fca5a5;
  font-weight: 700;
}

.modal-body {
  margin-bottom: 2rem;
}

.disclaimer-box,
.warning-box,
.info-box {
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.disclaimer-box {
  background: rgba(96, 165, 250, 0.1);
  border: 1px solid rgba(96, 165, 250, 0.3);
}

.warning-box {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.4);
}

.info-box {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.disclaimer-box h4,
.warning-box h4,
.info-box h4 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.disclaimer-box h4 {
  color: #60a5fa;
}

.warning-box h4 {
  color: #fca5a5;
}

.info-box h4 {
  color: #86efac;
}

.modal-body p {
  color: #e2e8f0;
  line-height: 1.7;
  margin: 0;
}

.modal-body ul {
  margin: 0.5rem 0 0 0;
  padding-left: 1.5rem;
  color: #cbd5e1;
}

.modal-body li {
  margin-bottom: 0.7rem;
  line-height: 1.6;
}

.modal-body ul ul {
  margin-top: 0.5rem;
  padding-left: 1.2rem;
}

.legal-note {
  font-size: 0.85rem;
  color: #94a3b8;
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid #64748b;
  font-style: italic;
  margin-top: 1.5rem;
}

.modal-actions {
  display: flex;
  justify-content: center;
}

.modal-actions button {
  min-width: 200px;
  padding: 1rem 2rem;
  font-size: 1.05rem;
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
  
  .disclaimer-box,
  .warning-box,
  .info-box {
    padding: 1rem;
  }
}
</style>
