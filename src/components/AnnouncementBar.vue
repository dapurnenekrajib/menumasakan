<script setup>
import { ref } from 'vue'
import { X, Megaphone } from 'lucide-vue-next'

const visible = ref(true)
</script>

<template>
  <Transition name="slide-down">
    <div v-if="visible" class="announce">
      <Megaphone :size="15" class="icon" />
      <span>Order sekarang atau Pre-Order — DP 50% melalui DANA</span>
      <button class="close" aria-label="Tutup pengumuman" @click="visible = false">
        <X :size="14" />
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.announce {
  position: relative;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 9px 40px 9px 14px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  color: #1a1208;
  font-family: var(--font-mono);
  font-size: 11.5px;
  letter-spacing: 0.4px;
  text-align: center;
}
.icon { flex-shrink: 0; }
.close {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #1a1208;
  opacity: 0.7;
  display: flex;
  padding: 4px;
}
.close:hover { opacity: 1; }

.slide-down-enter-active { transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.slide-down-leave-active { transition: all 0.3s ease; }
.slide-down-enter-from { transform: translateY(-100%); opacity: 0; }
.slide-down-leave-to { transform: translateY(-100%); opacity: 0; }

@media (max-width: 600px) {
  .announce { font-size: 10.5px; padding: 8px 34px 8px 10px; }
}
</style>
