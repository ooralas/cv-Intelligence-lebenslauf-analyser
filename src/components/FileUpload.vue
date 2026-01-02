<script setup>
import { ref } from 'vue'
import { useResumeStore } from '../stores/resumeStore'

const store = useResumeStore()
const emit = defineEmits(['startAnalysis'])

const fileInput = ref(null)
const fileName = ref('')
const isDragging = ref(false)

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    handleFile(file)
  }
}

const handleFile = (file) => {
  // Validate file type
  const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
  if (!validTypes.includes(file.type)) {
    alert('Bitte lade nur PDF oder Bild-Dateien (JPG, PNG) hoch.')
    return
  }
  
  fileName.value = file.name
  store.setResumeFile(file)
}

const onDrop = (e) => {
  e.preventDefault()
  isDragging.value = false
  
  const files = e.dataTransfer.files
  if (files.length > 0) {
    handleFile(files[0])
  }
}

const onDragOver = (e) => {
  e.preventDefault()
  isDragging.value = true
}

const onDragLeave = () => {
  isDragging.value = false
}

const handleAnalyze = () => {
  if (!store.resumeFile) return
  emit('startAnalysis')
}

const clear = () => {
    store.reset()
    fileName.value = ''
    if (fileInput.value) fileInput.value.value = ''
}
</script>

<template>
  <div class="upload-container glass">
    <h3>Lebenslauf hochladen</h3>
    <p class="subtitle">PDF oder Bild (JPG, PNG)</p>
    
    <div 
      class="drop-zone" 
      :class="{ 'dragging': isDragging }"
      @click="fileInput.click()"
      @drop="onDrop"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
    >
        <div v-if="!fileName" class="prompt">
            <span class="icon">📄</span>
            <p class="main-text">Klicke hier oder ziehe eine Datei hierher</p>
            <p class="sub-text">PDF, JPG oder PNG (max. 10MB)</p>
        </div>
        <div v-else class="file-info">
            <span class="icon">✅</span>
            <p class="file-name">{{ fileName }}</p>
            <p class="file-ready">Bereit zur Analyse</p>
        </div>
        <input 
            type="file" 
            ref="fileInput" 
            @change="onFileChange" 
            accept=".pdf,image/*" 
            style="display: none"
        />
    </div>
    
    <div class="actions">
      <button 
        @click="handleAnalyze" 
        :disabled="!store.resumeFile || store.isAnalyzing"
        class="primary-btn"
      >
        <span v-if="!store.isAnalyzing">🚀 Analyse starten</span>
        <span v-else class="loader-container">
          <span class="loader"></span>
          <span>Analysiere...</span>
        </span>
      </button>
      <button v-if="store.resumeFile" @click="clear" class="secondary">🗑️ Leeren</button>
    </div>
    
    <p v-if="store.error" class="error">⚠️ {{ store.error }}</p>
  </div>
</template>

<style scoped>
.upload-container {
  padding: 2.5rem;
  margin-bottom: 2rem;
  transition: transform 0.3s;
  text-align: center;
}

h3 {
  margin-bottom: 0.5rem;
  font-weight: 700;
  font-size: 1.8rem;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: #94a3b8;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.drop-zone {
    border: 2px dashed rgba(96, 165, 250, 0.3);
    border-radius: 16px;
    padding: 3rem 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.02);
    position: relative;
}

.drop-zone:hover {
    border-color: #60a5fa;
    background: rgba(96, 165, 250, 0.05);
    transform: translateY(-2px);
}

.drop-zone.dragging {
    border-color: #a78bfa;
    background: rgba(167, 139, 250, 0.1);
    border-style: solid;
}

.icon {
    font-size: 3.5rem;
    display: block;
    margin-bottom: 1rem;
    animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.prompt .main-text {
    color: #e2e8f0;
    margin: 0 0 0.5rem 0;
    font-weight: 600;
    font-size: 1.1rem;
}

.prompt .sub-text {
    color: #94a3b8;
    margin: 0;
    font-size: 0.9rem;
}

.file-info .file-name {
    color: #60a5fa;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
}

.file-info .file-ready {
    color: #86efac;
    margin: 0;
    font-size: 0.9rem;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.primary-btn {
  min-width: 180px;
}

.secondary {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: none;
}

.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
}

.error {
  color: #fca5a5;
  margin-top: 1.5rem;
  font-size: 0.95rem;
  padding: 1rem;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.loader-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.loader {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 600px) {
  .actions {
    flex-direction: column;
  }
  
  .primary-btn, .secondary {
    width: 100%;
  }
}
</style>
