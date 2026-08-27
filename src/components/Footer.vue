<script setup>
import { Clock, Phone, Instagram, MapPin, Wallet } from 'lucide-vue-next'
import { business } from '../data/business.js'
</script>

<template>
  <footer id="kontak" class="footer">
    <div class="container grid">
      <div class="brand">
        <span class="logo">{{ business.name }}</span>
        <p>Seblak dan masakan rumahan otentik, dimasak dengan hati dan resep turun-temurun.</p>
      </div>

      <div class="col">
        <h4>Kontak</h4>
        <p><Clock :size="15" /> {{ business.hours }}</p>
        <p><Phone :size="15" /> +{{ business.waNumber }}</p>
        <p v-if="business.instagram"><Instagram :size="15" /> {{ business.instagram }}</p>
      </div>

      <div class="col">
        <h4>Lokasi &amp; Pembayaran</h4>
        <p><MapPin :size="15" /> {{ business.address }}</p>
        <p><Wallet :size="15" /> DANA: {{ business.danaNumber }}</p>
      </div>
    </div>

    <div class="container bottom">
      <span>&copy; {{ new Date().getFullYear() }} {{ business.name }}. Semua hak dilindungi.</span>
    </div>
  </footer>
</template>

<style scoped>
.footer { background: var(--bg-elevated); border-top: 1px solid var(--border); padding: 60px 0 24px; }
.grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 32px; margin-bottom: 40px; }
.logo { font-family: var(--font-display); font-size: 20px; font-weight: 600; display: block; margin-bottom: 10px; }
.brand p { color: var(--text-muted); font-size: 13.5px; line-height: 1.6; max-width: 320px; }
h4 { font-size: 13px; letter-spacing: 1px; text-transform: uppercase; color: var(--accent); margin-bottom: 14px; font-family: var(--font-mono); }
.col p { display: flex; align-items: center; gap: 8px; color: var(--text-muted); font-size: 13.5px; margin-bottom: 10px; }
.bottom { border-top: 1px solid var(--border); padding-top: 20px; font-size: 12px; color: var(--text-muted); text-align: center; }

@media (max-width: 700px) {
  .grid { grid-template-columns: 1fr; gap: 26px; }
}
</style>
