<script setup>
import { ref, watch } from 'vue'
import { X, Minus, Plus, MessageCircle } from 'lucide-vue-next'
import { useCart } from '../composables/useCart.js'
import { useWhatsApp, buildSingleItemMessage, waLink } from '../composables/useWhatsApp.js'

const props = defineProps({ dish: { type: Object, default: null } })
const emit = defineEmits(['close', 'toast'])

const { addItem } = useCart()
const { formatRupiah } = useWhatsApp()

const qty = ref(1)
const note = ref('')

watch(
  () => props.dish,
  () => { qty.value = 1; note.value = '' }
)

function addToCart() {
  if (!props.dish) return
  addItem(props.dish, qty.value, note.value.trim())
  emit('toast', `${props.dish.name} ditambahkan ke keranjang`)
  emit('close')
}

function orderDirectly() {
  if (!props.dish) return
  const msg = buildSingleItemMessage(props.dish, qty.value, note.value.trim())
  window.open(waLink(msg), '_blank', 'noopener')
}
</script>

<template>
  <Transition name="fade">
    <div v-if="dish" class="backdrop" @click.self="emit('close')">
      <Transition name="sheet" appear>
        <div class="modal" role="dialog" aria-modal="true" :aria-label="dish.name">
          <button class="close-btn" aria-label="Tutup" @click="emit('close')"><X :size="18" /></button>

          <div class="media">
            <img :src="dish.image" :alt="dish.name" />
            <span v-if="dish.badge" class="badge">{{ dish.badge }}</span>
          </div>

          <div class="content">
            <h2>{{ dish.name }}</h2>
            <p class="desc">{{ dish.description }}</p>
            <div class="price">{{ formatRupiah(dish.price) }}</div>

            <div class="field">
              <label>Jumlah</label>
              <div class="qty-control">
                <button aria-label="Kurangi jumlah" @click="qty = Math.max(1, qty - 1)"><Minus :size="16" /></button>
                <span>{{ qty }}</span>
                <button aria-label="Tambah jumlah" @click="qty++"><Plus :size="16" /></button>
              </div>
            </div>

            <div class="field">
              <label for="note">Catatan pesanan</label>
              <textarea id="note" v-model="note" rows="2" placeholder="Contoh: pedas level 3, tanpa kerupuk"></textarea>
            </div>

            <div class="actions">
              <button class="btn btn-ghost" @click="addToCart">Tambah ke Keranjang</button>
              <button class="btn btn-primary" @click="orderDirectly">
                <MessageCircle :size="16" /> Pesan via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.backdrop {
  position: fixed; inset: 0; z-index: 90;
  background: rgba(0,0,0,0.6);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.modal {
  position: relative;
  width: 100%; max-width: 460px;
  max-height: 88vh; overflow-y: auto;
  background: var(--bg-elevated);
  border-radius: var(--radius);
  border: 1px solid var(--border);
}
.close-btn {
  position: absolute; top: 14px; right: 14px; z-index: 2;
  background: rgba(11,9,8,0.6); backdrop-filter: blur(6px);
  border: none; color: var(--text);
  width: 34px; height: 34px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.media { position: relative; aspect-ratio: 16/10; }
.media img { width: 100%; height: 100%; object-fit: cover; }
.badge {
  position: absolute; top: 14px; left: 14px;
  background: var(--accent); color: #1a1208;
  font-family: var(--font-mono); font-size: 10px; font-weight: 700;
  padding: 5px 10px; border-radius: 999px; text-transform: uppercase;
}
.content { padding: 22px; }
h2 { font-family: var(--font-display); font-size: 22px; margin-bottom: 8px; }
.desc { color: var(--text-muted); font-size: 14px; line-height: 1.55; margin-bottom: 14px; }
.price { font-family: var(--font-mono); color: var(--accent); font-weight: 700; font-size: 17px; margin-bottom: 22px; }

.field { margin-bottom: 18px; }
.field label { display: block; font-size: 12.5px; color: var(--text-muted); margin-bottom: 8px; font-weight: 500; }
.qty-control { display: flex; align-items: center; gap: 16px; }
.qty-control button {
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--glass); border: 1px solid var(--border); color: var(--text);
  display: flex; align-items: center; justify-content: center;
}
.qty-control span { font-family: var(--font-mono); font-weight: 700; min-width: 20px; text-align: center; }
textarea {
  width: 100%; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm);
  color: var(--text); padding: 12px; font-family: inherit; font-size: 13.5px; resize: vertical;
}
textarea:focus-visible { outline: 2px solid var(--accent); }

.actions { display: flex; flex-direction: column; gap: 10px; }
.actions .btn { width: 100%; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.sheet-enter-active { transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease; }
.sheet-leave-active { transition: transform 0.25s ease, opacity 0.2s ease; }
.sheet-enter-from { transform: scale(0.95); opacity: 0; }
.sheet-leave-to { transform: scale(0.97); opacity: 0; }

@media (max-width: 640px) {
  .backdrop { align-items: flex-end; padding: 0; }
  .modal { max-width: 100%; max-height: 92vh; border-radius: 20px 20px 0 0; }
  .sheet-enter-from { transform: translateY(100%); opacity: 1; }
  .sheet-leave-to { transform: translateY(100%); opacity: 1; }
}
</style>
