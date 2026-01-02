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
        <!-- Icon oben (Subtil und modern) -->
        <div class="hero-icon">
          ⚖️
        </div>
        
        <h2>Wichtiger Hinweis</h2>
        <p class="subtitle">Bitte vor der Nutzung lesen</p>
        
        <div class="info-list">
          <div class="info-item">
            <span class="icon">🧪</span>
            <div class="text">
              <strong>Demo & Test</strong>
              Dies ist eine Entwicklungs-Anwendung. Nicht für produktive Zwecke nutzen.
            </div>
          </div>
          
          <div class="info-item">
            <span class="icon">🔒</span>
            <div class="text">
              <strong>Datenschutz</strong>
              Bitte keine echten personenbezogenen Daten hochladen. Die Analyse erfolgt via KI.
            </div>
          </div>

          <div class="info-item">
            <span class="icon">🚫</span>
            <div class="text">
              <strong>Haftungsausschluss</strong>
              Keine Garantie auf Richtigkeit der Analyseergebnisse.
            </div>
          </div>
        </div>

        <div class="actions">
          <button @click="handleAccept" class="modern-btn">
            Verstanden & Akzeptieren
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
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.8); /* Helles Overlay statt dunkel */
  backdrop-filter: blur(12px); /* Starker Blur für den Glas-Effekt */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: #FFFFFF;
  width: 100%;
  max-width: 420px;
  padding: 40px 32px;
  border-radius: 24px;
  box-shadow: 
    0 20px 40px -10px rgba(0,0,0,0.08), 
    0 0 1px rgba(0,0,0,0.1); /* Ultra-softer Schatten */
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
}

.hero-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

h2 {
  font-size: 24px;
  font-weight: 700;
  color: #111;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.subtitle {
  color: #666;
  font-size: 15px;
  margin: 0 0 32px 0;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
  margin-bottom: 32px;
}

.info-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.info-item .icon {
  font-size: 20px;
  background: #F5F5F7;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  flex-shrink: 0;
}

.info-item .text {
  font-size: 14px;
  color: #555;
  line-height: 1.5;
}

.info-item strong {
  display: block;
  color: #111;
  margin-bottom: 2px;
  font-weight: 600;
}

.modern-btn {
  background: #000000;
  color: #FFFFFF;
  border: none;
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s, background 0.2s;
}

.modern-btn:hover {
  background: #333;
  transform: translateY(-1px);
}

.modern-btn:active {
  transform: scale(0.98);
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(10px);
}
</style>
