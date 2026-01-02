<script setup>
import { useResumeStore } from '../stores/resumeStore'
import { ref } from 'vue'

const store = useResumeStore()
const isDragging = ref(false)
const emit = defineEmits(['startAnalysis'])

const handleFileUpload = (event) => {
    if (store.isAnalyzing) return // Block interaction
    const file = event.target.files[0]
    if (file) processFile(file)
}

const processFile = (file) => {
    store.setResumeFile(file)
    emit('startAnalysis')
}

const onDrop = (event) => {
    if (store.isAnalyzing) return // Block interaction
    isDragging.value = false
    const file = event.dataTransfer.files[0]
    if (file) processFile(file)
}
</script>

<template>
    <div class="upload-block">
        <h2 style="border:none; margin-top: 0; font-weight: 600; font-size: 20px;">Datei hochladen</h2>
        
        <!-- Drop Zone (Hidden/Disabled when analyzing to show loading state clearly, or just visually disabled?) -->
        <!-- User request: "in dem Drag&Drop Box den Name der Datei angezeigt wird" -->
        
        <div 
            class="drop-zone"
            :class="{ active: isDragging, disabled: store.isAnalyzing }"
            @dragover.prevent="!store.isAnalyzing && (isDragging = true)"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="onDrop"
            @click="!store.isAnalyzing && $refs.fileInput.click()"
        >
            <template v-if="!store.isAnalyzing">
                <div class="icon">📄</div>
                <div class="text">
                    <span style="font-weight: 600;">Klicke zum Upload</span> oder ziehe Datei hierher
                    <br>
                    <span class="subtext">Unterstützt PDF, PNG, JPEG</span>
                </div>
            </template>
            
            <template v-else>
                <!-- Loading Content INSIDE the box as requested -->
                <div class="spinner"></div>
                <div class="text">
                    Analysiere <strong>{{ store.resumeFile?.name }}</strong>...
                    <br>
                    <span class="subtext">Dies kann einen Moment dauern</span>
                </div>
            </template>
            
            <input 
                type="file" 
                ref="fileInput" 
                class="hidden-input" 
                accept=".pdf,.png,.jpg,.jpeg"
                @change="handleFileUpload"
                :disabled="store.isAnalyzing"
            >
        </div>

        <!-- Error State -->
        <div v-if="store.error" class="error-state fade-in">
             <span style="font-size: 20px;">⚠️</span>
             <span>{{ store.error }}</span>
        </div>
    </div>
</template>

<style scoped>
.upload-block {
    margin-top: 2rem;
}

/* Modern Notion Upload Style */
.drop-zone {
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 3rem;
    border: 2px dashed var(--border-strong);
    border-radius: 6px;
    background: var(--bg-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--text-secondary);
    min-height: 200px;
}

.drop-zone:hover:not(.disabled), .drop-zone.active {
    background: rgba(35, 131, 226, 0.05);
    border-color: #2383E2;
    color: var(--text-primary);
}

.drop-zone.disabled {
    cursor: default;
    opacity: 0.8;
    background: #FAFAFA;
    border-color: var(--border-subtle);
}

/* ... existing icon animation only when not disabled ... */
.drop-zone:hover:not(.disabled) .icon {
    transform: scale(1.1) translateY(-5px);
}
.icon {
    font-size: 48px;
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.text {
    text-align: center;
    font-size: 16px;
    line-height: 1.5;
}

.subtext {
    font-size: 14px;
    color: var(--text-tertiary);
    margin-top: 4px;
    display: block;
}

.hidden-input {
    display: none;
}

.spinner {
    width: 24px;
    height: 24px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #333;
    animation: spin 0.8s ease-in-out infinite;
    margin-bottom: 4px;
}

.error-state {
    margin-top: 24px;
    padding: 16px;
    background: #ffe2dd;
    color: #d44c47;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.fade-in {
    animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
