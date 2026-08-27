<script setup>
import { Plus } from 'lucide-vue-next'
import { useWhatsApp } from '../composables/useWhatsApp.js'

const props = defineProps({ dish: { type: Object, required: true } })
const emit = defineEmits(['open', 'quick-add'])
const { formatRupiah } = useWhatsApp()
</script>

<template>
  <article class="card" @click="emit('open', dish)">
    <div class="media">
      <img :src="dish.image" :alt="dish.name" loading="lazy" />
      <span v-if="dish.badge" class="badge">{{ dish.badge }}</span>
      <div class="media-overlay"></div>
    </div>
    <div class="body">
      <h3>{{ dish.name }}</h3>
      <p class="desc">{{ dish.description }}</p>
      <div class="row">
        <span class="price">{{ formatRupiah(dish.price) }}</span>
        <button class="add-btn" aria-label="`Tambah ${dish.name} ke keranjang`" @click.stop="emit('quick-add', dish)">
          <Plus :size="16" /> Pesan
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease;
}
.card:hover { transform: translateY(-6px); box-shadow: var(--shadow); border-color: rgba(232,161,60,0.35); }

.media { position: relative; aspect-ratio: 4 / 3; overflow: hidden; }
.media img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
}
.card:hover .media img { transform: scale(1.08); }
.media-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55) 100%);
  opacity: 0; transition: opacity 0.35s ease;
}
.card:hover .media-overlay { opacity: 1; }

.badge {
  position: absolute; top: 12px; left: 12px;
  background: rgba(232,161,60,0.95); color: #1a1208;
  font-family: var(--font-mono); font-size: 10px; font-weight: 700;
  letter-spacing: 0.5px; text-transform: uppercase;
  padding: 5px 10px; border-radius: 999px;
}

.body { padding: 18px; }
h3 { font-family: var(--font-display); font-weight: 600; font-size: 18px; margin-bottom: 6px; }
.desc {
  color: var(--text-muted); font-size: 13px; line-height: 1.5;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  margin-bottom: 16px; min-height: 39px;
}
.row { display: flex; align-items: center; justify-content: space-between; }
.price { font-family: var(--font-mono); font-weight: 700; color: var(--accent); font-size: 15px; }
.add-btn {
  display: flex; align-items: center; gap: 5px;
  background: var(--glass); border: 1px solid var(--border); color: var(--text);
  padding: 8px 14px; border-radius: 999px; font-size: 12.5px; font-weight: 600;
  transition: background 0.2s ease, transform 0.15s ease;
}
.add-btn:hover { background: var(--accent); color: #1a1208; border-color: transparent; }
.add-btn:active { transform: scale(0.95); }

/* Touch devices: no hover, keep it feeling interactive via active state */
@media (hover: none) {
  .card:active { transform: scale(0.98); }
  .media-overlay { opacity: 1; background: linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.4) 100%); }
}
</style>
