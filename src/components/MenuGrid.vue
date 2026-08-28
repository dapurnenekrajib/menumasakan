<script setup>
import { ref, computed } from 'vue';
import CategoryFilter from './CategoryFilter.vue';
import FoodCard from './FoodCard.vue';
import { menu, categories } from '../data/menu.js';
import { useCart } from '../composables/useCart.js';

const emit = defineEmits(['open-detail', 'toast']);
const activeCategory = ref('Semua');
const { addItem } = useCart();

const filtered = computed(() => (activeCategory.value === 'Semua' ? menu : menu.filter((m) => m.category === activeCategory.value)));

function quickAdd(dish) {
  addItem(dish, 1, '');
  emit('toast', `${dish.name} ditambahkan ke keranjang`);
}
</script>

<template>
  <section id="menu" class="menu-section">
    <div class="container">
      <div v-reveal="'up'">
        <span class="section-label">Menu Favorit</span>
        <h2 class="section-title">Pilih yang bikin kangen</h2>
        <p class="section-sub">Semua dimasak fresh setiap hari. Sentuh menu untuk lihat detail dan atur pesananmu.</p>
      </div>

      <CategoryFilter :categories="categories" :active="activeCategory" @select="activeCategory = $event" />

      <TransitionGroup name="grid-fade" tag="div" class="grid">
        <FoodCard v-for="dish in filtered" :key="dish.id" :dish="dish" v-reveal="'scale'" @open="emit('open-detail', $event)" @quick-add="quickAdd" />
      </TransitionGroup>

      <p v-if="filtered.length === 0" class="empty">Belum ada menu di kategori ini.</p>
    </div>
  </section>
</template>

<style scoped>
.menu-section {
  padding: 90px 0;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
}
.empty {
  color: var(--text-muted);
  padding: 40px 0;
  text-align: center;
}

.grid-fade-enter-active {
  transition:
    opacity 0.28s ease,
    transform 0.28s ease;
}
.grid-fade-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}
.grid-fade-enter-from {
  opacity: 0;
  transform: scale(0.96);
}
.grid-fade-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
.grid-fade-move {
  transition: transform 0.3s ease;
}

@media (max-width: 1080px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
  .menu-section {
    padding: 60px 0;
  }
}
@media (max-width: 460px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
