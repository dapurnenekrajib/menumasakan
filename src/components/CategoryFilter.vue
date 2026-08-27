<script setup>
defineProps({ categories: { type: Array, required: true }, active: { type: String, required: true } })
const emit = defineEmits(['select'])
</script>

<template>
  <div class="filter-row" role="tablist" aria-label="Filter kategori menu">
    <button
      v-for="cat in categories"
      :key="cat"
      class="chip"
      :class="{ active: cat === active }"
      role="tab"
      :aria-selected="cat === active"
      @click="emit('select', cat)"
    >
      {{ cat }}
    </button>
  </div>
</template>

<style scoped>
.filter-row {
  display: flex; gap: 10px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 34px;
  scrollbar-width: none;
}
.filter-row::-webkit-scrollbar { display: none; }
.chip {
  flex-shrink: 0;
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--glass);
  color: var(--text-muted);
  font-size: 13.5px;
  font-weight: 500;
  transition: all 0.25s ease;
}
.chip:hover { color: var(--text); border-color: rgba(245,239,230,0.25); }
.chip.active {
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: #1a1208;
  border-color: transparent;
  font-weight: 700;
}
</style>
