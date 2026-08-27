import { business } from '../data/business.js'

function formatRupiah(n) {
  return 'Rp' + n.toLocaleString('id-ID')
}

/**
 * Builds a wa.me link with a pre-filled order message.
 * @param {object} cartState - the `state` object from useCart()
 * @param {number} total - computed total
 * @param {number} dpAmount - computed 50% DP amount
 */
export function buildOrderMessage(cartState, total, dpAmount) {
  const lines = []
  lines.push(`Halo ${business.name}, saya ingin memesan:`)
  lines.push('')
  cartState.items.forEach((item, idx) => {
    const noteSuffix = item.note ? ` (${item.note})` : ''
    lines.push(`${idx + 1}. ${item.name} x${item.qty}${noteSuffix}`)
  })
  lines.push('')
  lines.push(`Total: ${formatRupiah(total)}`)
  lines.push('')

  if (cartState.orderType === 'preorder') {
    lines.push('Jenis Pesanan: Pre-Order (PO)')
    if (cartState.preorder.date) lines.push(`Tanggal Ambil/Kirim: ${cartState.preorder.date}`)
    if (cartState.preorder.time) lines.push(`Jam: ${cartState.preorder.time}`)
    if (cartState.preorder.notes) lines.push(`Catatan PO: ${cartState.preorder.notes}`)
    lines.push('')
  }

  lines.push(`Nama: ${cartState.customer.name || '-'}`)
  lines.push(`Alamat: ${cartState.customer.address || '-'}`)
  lines.push(`Catatan: ${cartState.note || '-'}`)
  lines.push('')
  lines.push(`Saya siap melakukan DP 50% (${formatRupiah(dpAmount)}) melalui DANA.`)

  return lines.join('\n')
}

export function buildSingleItemMessage(dish, qty, note) {
  const noteSuffix = note ? ` (${note})` : ''
  return [
    `Halo ${business.name}, saya mau pesan:`,
    '',
    `${dish.name} x${qty}${noteSuffix}`,
    `Harga: ${formatRupiah(dish.price * qty)}`
  ].join('\n')
}

export function buildPaymentConfirmMessage() {
  return `Halo ${business.name}, saya sudah melakukan pembayaran DP 50% melalui DANA. Berikut bukti pembayarannya.`
}

export function waLink(message) {
  return `https://wa.me/${business.waNumber}?text=${encodeURIComponent(message)}`
}

export function useWhatsApp() {
  return { buildOrderMessage, buildSingleItemMessage, buildPaymentConfirmMessage, waLink, formatRupiah }
}
