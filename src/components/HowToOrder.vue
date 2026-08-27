<script setup>
import { UtensilsCrossed, ShoppingBag, MessageCircle, Wallet } from 'lucide-vue-next'

const steps = [
  { n: '01', title: 'Pilih Menu', desc: 'Jelajahi menu dan pilih hidangan favoritmu.', icon: UtensilsCrossed },
  { n: '02', title: 'Masukkan ke Keranjang', desc: 'Atur jumlah dan catatan sesuai selera.', icon: ShoppingBag },
  { n: '03', title: 'Order via WhatsApp', desc: 'Kirim pesananmu langsung, kami balas cepat.', icon: MessageCircle },
  { n: '04', title: 'Bayar DP 50% via DANA', desc: 'Kunci pesananmu dengan DP, sisanya saat terima.', icon: Wallet }
]
</script>

<template>
  <section id="cara-order" class="how-section">
    <div class="container">
      <div v-reveal="'up'" class="head">
        <span class="section-label">Cara Order</span>
        <h2 class="section-title">Empat langkah, sesederhana itu</h2>
      </div>

      <div class="timeline">
        <div v-for="(step, i) in steps" :key="step.n" v-reveal="i % 2 === 0 ? 'left' : 'right'" class="step">
          <div class="icon-wrap"><component :is="step.icon" :size="22" /></div>
          <span class="num">{{ step.n }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how-section { padding: 90px 0; }
.head { margin-bottom: 50px; }
.timeline {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; position: relative;
}
.timeline::before {
  content: ''; position: absolute; top: 23px; left: 8%; right: 8%; height: 1px;
  background: linear-gradient(90deg, transparent, var(--border) 15%, var(--border) 85%, transparent);
}
.step { position: relative; text-align: center; }
.icon-wrap {
  width: 46px; height: 46px; margin: 0 auto 14px;
  border-radius: 50%; background: var(--bg-elevated); border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center; color: var(--accent);
  position: relative; z-index: 1;
}
.num { font-family: var(--font-mono); font-size: 11px; color: var(--accent); letter-spacing: 1px; }
h3 { font-family: var(--font-display); font-size: 16px; font-weight: 600; margin: 6px 0 6px; }
p { font-size: 12.5px; color: var(--text-muted); line-height: 1.5; }

@media (max-width: 768px) {
  .timeline { grid-template-columns: 1fr 1fr; row-gap: 40px; }
  .timeline::before { display: none; }
}
@media (max-width: 460px) {
  .timeline { grid-template-columns: 1fr; }
}
</style>
