<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Menu, X, ShoppingBag } from 'lucide-vue-next';
import { business } from '../data/business.js';
import { useCart } from '../composables/useCart.js';

const props = defineProps({ modelOpenCart: Boolean });
const emit = defineEmits(['open-cart']);

const scrolled = ref(false);
const mobileOpen = ref(false);
const { itemCount } = useCart();

const links = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Menu', href: '#menu' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Cara Order', href: '#cara-order' },
  { label: 'Kontak', href: '#kontak' },
];

function handleScroll() {
  scrolled.value = window.scrollY > 24;
}

function closeMobile() {
  mobileOpen.value = false;
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<template>
  <header class="navbar" :class="{ scrolled }">
    <div class="container bar">
      <a href="#hero" class="logo">
        <img src="/logo.png" alt="Logo Dapur Nenek Rajib" class="logo-img" />
        {{ business.name }}
      </a>

      <nav class="links">
        <a v-for="l in links" :key="l.href" :href="l.href">{{ l.label }}</a>
      </nav>

      <div class="actions">
        <button class="cart-btn" aria-label="Buka keranjang" @click="emit('open-cart')">
          <ShoppingBag :size="19" />
          <span v-if="itemCount > 0" class="badge">{{ itemCount }}</span>
        </button>
        <button class="hamburger" aria-label="Buka menu" @click="mobileOpen = true">
          <Menu :size="22" />
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="mobileOpen" class="mobile-overlay" @click.self="closeMobile">
          <Transition name="slide-in">
            <div v-if="mobileOpen" class="mobile-panel">
              <div class="mobile-head">
                <span class="logo">
                  <img src="/logo.png" alt="Logo Dapur Nenek Rajib" class="logo-img" />
                  {{ business.name }}
                </span>
                <button aria-label="Tutup menu" @click="closeMobile"><X :size="22" /></button>
              </div>
              <nav class="mobile-links">
                <a v-for="l in links" :key="l.href" :href="l.href" @click="closeMobile">{{ l.label }}</a>
              </nav>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  background: transparent;
  transition:
    background 0.35s ease,
    backdrop-filter 0.35s ease,
    box-shadow 0.35s ease,
    border-color 0.35s ease;
  border-bottom: 1px solid transparent;
}
.navbar.scrolled {
  background: var(--glass-strong);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
}
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 19px;
  letter-spacing: -0.01em;
}
.logo-img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
.links {
  display: flex;
  gap: 30px;
}
.links a {
  font-size: 13.5px;
  color: var(--text-muted);
  transition: color 0.2s ease;
}
.links a:hover {
  color: var(--text);
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.cart-btn,
.hamburger {
  position: relative;
  background: rgba(11, 9, 8, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(245, 239, 230, 0.18);
  color: var(--text);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cart-btn .badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--accent-2);
  color: #1a1208;
  font-size: 10px;
  font-weight: 700;
  font-family: var(--font-mono);
  min-width: 17px;
  height: 17px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
}
.hamburger {
  display: none;
}

.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 70;
}
.mobile-panel {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: min(78vw, 320px);
  background: var(--bg-elevated);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.mobile-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.mobile-head button {
  background: transparent;
  border: none;
  color: var(--text);
}
.mobile-links {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.mobile-links a {
  padding: 14px 6px;
  font-size: 16px;
  border-bottom: 1px solid var(--border);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(100%);
}

@media (max-width: 860px) {
  .links {
    display: none;
  }
  .hamburger {
    display: flex;
  }
}
</style>
