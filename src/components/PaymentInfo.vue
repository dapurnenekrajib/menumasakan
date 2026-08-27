<script setup>
import { Wallet, MessageCircle, Copy, Check } from 'lucide-vue-next'
import { ref } from 'vue'
import { business } from '../data/business.js'
import { buildPaymentConfirmMessage, waLink } from '../composables/useWhatsApp.js'

const copied = ref(false)

async function copyNumber() {
  try {
    await navigator.clipboard.writeText(business.danaNumber)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  } catch {
    // clipboard not available — number is still visible to copy manually
  }
}

function confirmPayment() {
  window.open(waLink(buildPaymentConfirmMessage()), '_blank', 'noopener')
}
</script>

<template>
  <section id="ketentuan" class="payment-section">
    <div class="container">
      <div v-reveal="'up'" class="head">
        <span class="section-label">Ketentuan Pemesanan</span>
        <h2 class="section-title">Setiap pesanan wajib DP 50%</h2>
        <p class="section-sub">Pembayaran DP dilakukan melalui DANA untuk mengunci pesananmu. Sisanya dibayar saat pesanan diambil atau diantar.</p>
      </div>

      <div v-reveal="'scale'" class="card">
        <div class="card-top">
          <div class="icon"><Wallet :size="22" /></div>
          <div>
            <span class="dp-label">DP {{ business.dpPercent }}%</span>
            <span class="via">Pembayaran melalui DANA</span>
          </div>
        </div>

        <div class="number-row">
          <span class="number">{{ business.danaNumber }}</span>
          <button class="copy-btn" @click="copyNumber">
            <Check v-if="copied" :size="15" />
            <Copy v-else :size="15" />
            {{ copied ? 'Tersalin' : 'Salin' }}
          </button>
        </div>
        <p class="owner">a.n. {{ business.danaName }}</p>

        <p class="note">Setelah melakukan pembayaran, kirim bukti pembayaran melalui WhatsApp agar pesanan segera diproses.</p>

        <button class="btn btn-primary confirm-btn" @click="confirmPayment">
          <MessageCircle :size="16" /> Konfirmasi Pembayaran via WhatsApp
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.payment-section { padding: 90px 0; }
.head { max-width: 560px; margin: 0 auto 40px; text-align: center; }
.head .section-sub { margin: 0 auto; }

.card {
  max-width: 420px; margin: 0 auto;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  backdrop-filter: blur(6px);
}
.card-top { display: flex; align-items: center; gap: 14px; margin-bottom: 22px; }
.icon {
  width: 46px; height: 46px; border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: #1a1208; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.dp-label { display: block; font-family: var(--font-display); font-size: 19px; font-weight: 600; }
.via { display: block; font-size: 12.5px; color: var(--text-muted); }

.number-row {
  display: flex; align-items: center; justify-content: space-between;
  background: var(--bg); border: 1px dashed var(--border); border-radius: var(--radius-sm);
  padding: 14px 16px; margin-bottom: 6px;
}
.number { font-family: var(--font-mono); font-size: 18px; letter-spacing: 1px; }
.copy-btn {
  display: flex; align-items: center; gap: 6px;
  background: var(--glass); border: 1px solid var(--border); color: var(--text);
  padding: 7px 12px; border-radius: 999px; font-size: 12px;
}
.owner { font-size: 12.5px; color: var(--text-muted); margin-bottom: 20px; }
.note { font-size: 13px; color: var(--text-muted); line-height: 1.55; margin-bottom: 22px; }
.confirm-btn { width: 100%; }
</style>
