<script setup>
import { useCart } from '../composables/useCart.js'

const { state } = useCart()

// today, formatted for the date input's min attribute
const today = new Date().toISOString().split('T')[0]
</script>

<template>
  <div class="order-type">
    <div class="toggle" role="tablist" aria-label="Jenis pesanan">
      <button
        role="tab"
        :aria-selected="state.orderType === 'now'"
        :class="{ active: state.orderType === 'now' }"
        @click="state.orderType = 'now'"
      >
        Order Sekarang
      </button>
      <button
        role="tab"
        :aria-selected="state.orderType === 'preorder'"
        :class="{ active: state.orderType === 'preorder' }"
        @click="state.orderType = 'preorder'"
      >
        Pre-Order
      </button>
    </div>

    <Transition name="expand">
      <div v-if="state.orderType === 'preorder'" class="po-fields">
        <div class="row">
          <div class="field">
            <label for="po-date">Tanggal</label>
            <input id="po-date" v-model="state.preorder.date" type="date" :min="today" />
          </div>
          <div class="field">
            <label for="po-time">Jam</label>
            <input id="po-time" v-model="state.preorder.time" type="time" />
          </div>
        </div>
        <div class="field">
          <label for="po-notes">Catatan khusus PO</label>
          <textarea id="po-notes" v-model="state.preorder.notes" rows="2" placeholder="Contoh: untuk acara ulang tahun, ambil jam makan siang"></textarea>
        </div>
        <p class="hint">Pesanan Pre-Order membutuhkan DP 50% untuk konfirmasi jadwal.</p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.toggle {
  display: flex; background: var(--bg); border: 1px solid var(--border); border-radius: 999px; padding: 4px;
}
.toggle button {
  flex: 1; padding: 10px 14px; border: none; background: transparent; color: var(--text-muted);
  border-radius: 999px; font-size: 13px; font-weight: 600; transition: all 0.2s ease;
}
.toggle button.active { background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: #1a1208; }

.po-fields { margin-top: 16px; display: flex; flex-direction: column; gap: 14px; }
.row { display: flex; gap: 12px; }
.field { flex: 1; }
.field label { display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; }
.field input, .field textarea {
  width: 100%; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm);
  color: var(--text); padding: 10px 12px; font-family: inherit; font-size: 13.5px;
}
.field input[type="date"], .field input[type="time"] { color-scheme: dark; }
.hint { font-size: 12px; color: var(--accent); }

.expand-enter-active, .expand-leave-active { transition: all 0.3s ease; overflow: hidden; }
.expand-enter-from, .expand-leave-to { max-height: 0; opacity: 0; }
.expand-enter-to, .expand-leave-from { max-height: 260px; opacity: 1; }
</style>
