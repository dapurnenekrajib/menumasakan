<script setup>
import { ref } from 'vue'
import AnnouncementBar from './components/AnnouncementBar.vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import MenuGrid from './components/MenuGrid.vue'
import FoodDetailModal from './components/FoodDetailModal.vue'
import CartDrawer from './components/CartDrawer.vue'
import PaymentInfo from './components/PaymentInfo.vue'
import HowToOrder from './components/HowToOrder.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'
import Footer from './components/Footer.vue'
import { business } from './data/business.js'

const activeDish = ref(null)
const cartOpen = ref(false)
const toastMsg = ref('')
let toastTimer = null

function openDetail(dish) {
  activeDish.value = dish
}
function closeDetail() {
  activeDish.value = null
}
function showToast(msg) {
  toastMsg.value = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toastMsg.value = ''), 2400)
}
</script>

<template>
  <AnnouncementBar />
  <Navbar @open-cart="cartOpen = true" />

  <main>
    <Hero />

    <section id="tentang" class="about">
      <div class="container about-inner">
        <div v-reveal="'left'" class="about-media">
          <img src="https://picsum.photos/seed/dapur-tentang/700/560" alt="Suasana dapur" loading="lazy" />
        </div>
        <div v-reveal="'right'" class="about-copy">
          <span class="section-label">Tentang Kami</span>
          <h2 class="section-title">Dimasak seperti di rumah sendiri</h2>
          <p>
            {{ business.name }} lahir dari resep keluarga yang diwariskan turun-temurun. Setiap porsi seblak dan
            masakan rumahan kami dibuat dari bahan segar pilihan, tanpa buru-buru, supaya rasanya benar-benar
            terasa seperti masakan rumah.
          </p>
          <p>Buka {{ business.hours }} — pesan kapan saja lewat WhatsApp, kami siap layani.</p>
        </div>
      </div>
    </section>

    <MenuGrid @open-detail="openDetail" @toast="showToast" />
    <HowToOrder />
    <PaymentInfo />
  </main>

  <Footer />

  <WhatsAppButton />
  <FoodDetailModal :dish="activeDish" @close="closeDetail" @toast="showToast" />
  <CartDrawer :open="cartOpen" @close="cartOpen = false" />

  <Transition name="toast">
    <div v-if="toastMsg" class="toast" role="status">{{ toastMsg }}</div>
  </Transition>
</template>

<style scoped>
main { padding-top: 0; }

.about { padding: 90px 0; }
.about-inner {
  display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center;
}
.about-media img { border-radius: var(--radius); box-shadow: var(--shadow); aspect-ratio: 5/4; object-fit: cover; }
.about-copy p { color: var(--text-muted); font-size: 14.5px; line-height: 1.65; margin-bottom: 14px; max-width: 460px; }

.toast {
  position: fixed; left: 50%; bottom: 28px; transform: translateX(-50%);
  z-index: 120;
  background: var(--bg-elevated); border: 1px solid var(--border);
  color: var(--text); padding: 12px 22px; border-radius: 999px;
  font-size: 13.5px; box-shadow: var(--shadow);
}
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from { opacity: 0; transform: translateX(-50%) translateY(10px); }
.toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(10px); }

@media (max-width: 800px) {
  .about-inner { grid-template-columns: 1fr; gap: 26px; }
  .about { padding: 60px 0; }
}
</style>
