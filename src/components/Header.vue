<template>
  <header class="header">
    <h1 class="gradient-text">CV Intelligence</h1>
    <p>Analysiere deinen Lebenslauf mit KI-Präzision</p>
  </header>
</template>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 3rem;
  animation: slideDown 0.8s ease-out;
}

h1 {
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  letter-spacing: -1px;
}

p {
  color: #94a3b8;
  font-size: 1.2rem;
}

@keyframes slideDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
}
</style>
