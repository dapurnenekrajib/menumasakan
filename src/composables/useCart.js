import { reactive, computed } from 'vue'

// Module-level reactive state so every component shares the same cart instance.
const state = reactive({
  items: [], // { id, name, price, qty, note }
  note: '',
  orderType: 'now', // 'now' | 'preorder'
  preorder: { date: '', time: '', notes: '' },
  customer: { name: '', address: '' }
})

function addItem(dish, qty = 1, note = '') {
  const existing = state.items.find((i) => i.id === dish.id && i.note === note)
  if (existing) {
    existing.qty += qty
  } else {
    state.items.push({ id: dish.id, name: dish.name, price: dish.price, qty, note })
  }
}

function removeItem(id, note = '') {
  const idx = state.items.findIndex((i) => i.id === id && i.note === note)
  if (idx !== -1) state.items.splice(idx, 1)
}

function updateQty(id, note, qty) {
  const item = state.items.find((i) => i.id === id && i.note === note)
  if (!item) return
  if (qty <= 0) {
    removeItem(id, note)
  } else {
    item.qty = qty
  }
}

function clearCart() {
  state.items = []
  state.note = ''
}

export function useCart() {
  const itemCount = computed(() => state.items.reduce((sum, i) => sum + i.qty, 0))
  const subtotal = computed(() => state.items.reduce((sum, i) => sum + i.qty * i.price, 0))
  const total = computed(() => subtotal.value) // no fees/tax modeled — DP is calculated separately at checkout
  const dpAmount = (percent) => Math.round((total.value * percent) / 100)

  return {
    state,
    itemCount,
    subtotal,
    total,
    dpAmount,
    addItem,
    removeItem,
    updateQty,
    clearCart
  }
}
