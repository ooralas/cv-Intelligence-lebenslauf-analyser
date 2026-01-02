<script setup>
import { ref } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'proceed'])
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-overlay" @click.self="emit('close')">
      <div class="modal-content">
        <div class="hero-icon">
          🤖
        </div>
        
        <h2>KI-Verbindung</h2>
        <p class="subtitle">Verbinde dich mit Puter.js für die Analyse</p>
        
        <div class="info-list">
          <div class="info-item">
            <div class="step-number">1</div>
            <div class="text">
              <strong>Puter.js autorisieren</strong>
              Verbindung zum KI-Service herstellen.
            </div>
          </div>
          
          <div class="info-item">
            <div class="step-number">2</div>
            <div class="text">
              <strong>Analyse starten</strong>
              Dein Dokument wird sicher verarbeitet.
            </div>
          </div>
        </div>

        <div class="actions">
          <button @click="emit('proceed')" class="modern-btn primary">
            Verbinden & Starten
          </button>
          <button @click="emit('close')" class="modern-btn secondary">
            Abbrechen
          </button>
        </div>
        
        <p class="footer-note">
           Powered by <a href="https://puter.com" target="_blank">Puter.js</a>
        </p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Same design system as DisclaimerModal for consistency */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: #FFFFFF;
  width: 100%;
  max-width: 400px;
  padding: 40px 32px;
  border-radius: 24px;
  box-shadow: 
    0 30px 60px -12px rgba(0, 0, 0, 0.15), 
    0 18px 36px -18px rgba(0, 0, 0, 0.2),
    0 0 1px rgba(0, 0, 0, 0.1); /* Layered shadows for more depth */
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
  gap: 16px;
  text-align: left;
  margin-bottom: 32px;
}

.info-item {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 12px;
  background: #FAFAFA;
  border-radius: 12px;
}

.step-number {
  width: 28px;
  height: 28px;
  background: #000;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  flex-shrink: 0;
}

.info-item .text {
  font-size: 14px;
  color: #555;
  line-height: 1.4;
}

.info-item strong {
  display: block;
  color: #111;
  font-weight: 600;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modern-btn {
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s;
  border: none;
}

.modern-btn:active {
  transform: scale(0.98);
}

.modern-btn.primary {
  background: #000000;
  color: #FFFFFF;
}

.modern-btn.secondary {
  background: #F0F0F0;
  color: #333;
}

.modern-btn.secondary:hover {
  background: #E5E5E5;
}

.footer-note {
    font-size: 12px;
    color: #999;
    margin-top: 24px;
}

.footer-note a {
    color: #999;
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
