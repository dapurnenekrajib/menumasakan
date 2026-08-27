<script setup>
import { X, Minus, Plus, Trash2, MessageCircle, ShoppingBag } from 'lucide-vue-next'
import { useCart } from '../composables/useCart.js'
import { useWhatsApp, buildOrderMessage, waLink } from '../composables/useWhatsApp.js'
import { business } from '../data/business.js'
import OrderType from './OrderType.vue'

const props = defineProps({ open: Boolean })
const emit = defineEmits(['close'])

const { state, itemCount, total, dpAmount, updateQty, removeItem, clearCart } = useCart()
const { formatRupiah } = useWhatsApp()

function sendOrder() {
  if (state.items.length === 0) return
  const msg = buildOrderMessage(state, total.value, dpAmount(business.dpPercent))
  window.open(waLink(msg), '_blank', 'noopener')
}
</script>

<template>
  <Transition name="fade">
    <div v-if="open" class="backdrop" @click.self="emit('close')">
      <Transition name="sheet" appear>
        <aside v-if="open" class="drawer" role="dialog" aria-modal="true" aria-label="Keranjang pesanan">
          <div class="head">
            <h2><ShoppingBag :size="18" /> Keranjang ({{ itemCount }})</h2>
            <button aria-label="Tutup keranjang" @click="emit('close')"><X :size="20" /></button>
          </div>

          <div v-if="state.items.length === 0" class="empty">
            <p>Keranjang masih kosong.</p>
            <span>Pilih menu favoritmu dulu, yuk.</span>
          </div>

          <div v-else class="body">
            <ul class="items">
              <li v-for="item in state.items" :key="item.id + item.note" class="item">
                <div class="info">
                  <span class="name">{{ item.name }}</span>
                  <span v-if="item.note" class="note">"{{ item.note }}"</span>
                  <span class="price">{{ formatRupiah(item.price) }}</span>
                </div>
                <div class="controls">
                  <div class="qty">
                    <button aria-label="Kurangi" @click="updateQty(item.id, item.note, item.qty - 1)"><Minus :size="14" /></button>
                    <span>{{ item.qty }}</span>
                    <button aria-label="Tambah" @click="updateQty(item.id, item.note, item.qty + 1)"><Plus :size="14" /></button>
                  </div>
                  <button class="remove" aria-label="Hapus item" @click="removeItem(item.id, item.note)">
                    <Trash2 :size="15" />
                  </button>
                </div>
              </li>
            </ul>

            <div class="field">
              <label for="cart-note">Catatan pesanan</label>
              <textarea id="cart-note" v-model="state.note" rows="2" placeholder="Contoh: kurangi pedas, tanpa bawang"></textarea>
            </div>

            <div class="field-row">
              <div class="field">
                <label for="cust-name">Nama</label>
                <input id="cust-name" v-model="state.customer.name" type="text" placeholder="Nama kamu" />
              </div>
              <div class="field">
                <label for="cust-address">Alamat</label>
                <input id="cust-address" v-model="state.customer.address" type="text" placeholder="Alamat pengiriman" />
              </div>
            </div>

            <OrderType />

            <div class="summary">
              <div class="row"><span>Subtotal</span><span>{{ formatRupiah(total) }}</span></div>
              <div class="row total"><span>Total</span><span>{{ formatRupiah(total) }}</span></div>
              <div class="row dp"><span>DP 50% (via DANA)</span><span>{{ formatRupiah(dpAmount(business.dpPercent)) }}</span></div>
            </div>

            <div class="footer-actions">
              <button class="btn btn-ghost" @click="clearCart">Kosongkan</button>
              <button class="btn btn-primary" @click="sendOrder">
                <MessageCircle :size="16" /> Order via WhatsApp
              </button>
            </div>
          </div>
        </aside>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.backdrop { position: fixed; inset: 0; z-index: 90; background: rgba(0,0,0,0.55); display: flex; justify-content: flex-end; }
.drawer {
  width: min(420px, 100%); height: 100%; background: var(--bg-elevated);
  display: flex; flex-direction: column; border-left: 1px solid var(--border);
}
.head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px; border-bottom: 1px solid var(--border);
}
.head h2 { display: flex; align-items: center; gap: 8px; font-family: var(--font-display); font-size: 18px; font-weight: 600; }
.head button { background: transparent; border: none; color: var(--text); }

.empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; color: var(--text-muted); text-align: center; padding: 40px; }
.empty p { font-size: 15px; color: var(--text); }
.empty span { font-size: 13px; }

.body { flex: 1; overflow-y: auto; padding: 18px 20px 100px; display: flex; flex-direction: column; gap: 20px; }

.items { display: flex; flex-direction: column; gap: 14px; list-style: none; }
.item {
  display: flex; align-items: flex-start; justify-content: space-between; gap: 10px;
  background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 12px 14px;
}
.info { display: flex; flex-direction: column; gap: 2px; }
.name { font-weight: 600; font-size: 14px; }
.note { font-size: 11.5px; color: var(--text-muted); font-style: italic; }
.price { font-family: var(--font-mono); font-size: 12px; color: var(--accent); margin-top: 4px; }
.controls { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
.qty { display: flex; align-items: center; gap: 8px; }
.qty button {
  width: 26px; height: 26px; border-radius: 50%; background: var(--glass); border: 1px solid var(--border);
  color: var(--text); display: flex; align-items: center; justify-content: center;
}
.qty span { font-family: var(--font-mono); font-size: 13px; min-width: 14px; text-align: center; }
.remove { background: transparent; border: none; color: var(--text-muted); }
.remove:hover { color: #ff6b6b; }

.field label { display: block; font-size: 12px; color: var(--text-muted); margin-bottom: 6px; }
.field input, .field textarea {
  width: 100%; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm);
  color: var(--text); padding: 10px 12px; font-family: inherit; font-size: 13.5px;
}
.field-row { display: flex; gap: 10px; }
.field-row .field { flex: 1; }

.summary { border-top: 1px dashed var(--border); padding-top: 14px; display: flex; flex-direction: column; gap: 6px; }
.summary .row { display: flex; justify-content: space-between; font-size: 13.5px; color: var(--text-muted); }
.summary .row.total { color: var(--text); font-weight: 700; font-size: 15px; }
.summary .row.dp { color: var(--accent); font-family: var(--font-mono); font-size: 12.5px; }

.footer-actions {
  position: sticky; bottom: -18px;
  display: flex; gap: 10px; padding: 14px 0 4px; margin-top: 4px;
  background: linear-gradient(180deg, transparent, var(--bg-elevated) 30%);
}
.footer-actions .btn { flex: 1; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.sheet-enter-active, .sheet-leave-active { transition: transform 0.35s cubic-bezier(0.22,1,0.36,1); }
.sheet-enter-from, .sheet-leave-to { transform: translateX(100%); }

@media (max-width: 640px) {
  .backdrop { align-items: flex-end; }
  .drawer { width: 100%; height: 88vh; border-radius: 20px 20px 0 0; border-left: none; }
  .sheet-enter-from, .sheet-leave-to { transform: translateY(100%); }
}
</style>
