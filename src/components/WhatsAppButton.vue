<script setup>
import { MessageCircle } from 'lucide-vue-next'
import { business } from '../data/business.js'
import { waLink } from '../composables/useWhatsApp.js'

const link = waLink(`Halo ${business.name}, saya mau tanya-tanya soal menu.`)
</script>

<template>
  <a :href="link" target="_blank" rel="noopener" class="fab" aria-label="Pesan via WhatsApp">
    <span class="pulse" aria-hidden="true"></span>
    <MessageCircle :size="24" class="icon" />
    <span class="label">Pesan via WhatsApp</span>
  </a>
</template>

<style scoped>
.fab {
  position: fixed; right: 20px; bottom: 20px; z-index: 55;
  display: flex; align-items: center; gap: 10px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: #1a1208; font-weight: 700; font-size: 13.5px;
  padding: 14px 20px; border-radius: 999px;
  box-shadow: 0 10px 30px rgba(232,161,60,0.35);
  transition: transform 0.2s ease;
}
.fab:hover { transform: translateY(-2px) scale(1.02); }
.pulse {
  position: absolute; inset: 0; border-radius: 999px;
  background: var(--accent); opacity: 0.5;
  animation: pulse 2.2s ease-out infinite;
  z-index: -1;
}
@keyframes pulse {
  0% { transform: scale(1); opacity: 0.45; }
  100% { transform: scale(1.35); opacity: 0; }
}

@media (max-width: 640px) {
  .fab {
    padding: 15px; border-radius: 50%;
    bottom: calc(16px + env(safe-area-inset-bottom));
  }
  .label { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .pulse { animation: none; }
}
</style>
