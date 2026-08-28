<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { business } from '../data/business.js';

const heroImage = 'https://picsum.photos/seed/hero-seblak/1600/1000';
const offset = ref(0);

function handleScroll() {
  // very light parallax, capped so it never feels heavy
  offset.value = Math.min(window.scrollY * 0.25, 120);
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<template>
  <section id="hero" class="hero">
    <div class="bg-wrap">
      <img :src="heroImage" alt="" class="bg-image" :style="{ transform: `translateY(${offset}px) scale(1.08)` }" />
      <div class="overlay"></div>
      <div class="particles" aria-hidden="true">
        <span v-for="n in 14" :key="n" class="p" :style="{ '--i': n }"></span>
      </div>
    </div>

    <div class="container hero-outer">
      <div class="hero-content">
        <span class="section-label reveal-tag">{{ business.name }}</span>
        <h1 class="title">{{ business.tagline }}</h1>
        <p class="subtitle">{{ business.subtitle }}</p>
        <div class="cta-row">
          <a href="#kontak" class="btn btn-primary">Pesan Sekarang</a>
          <a href="#menu" class="btn btn-ghost">Lihat Menu</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
}
.bg-wrap {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: kenburns 22s ease-in-out infinite alternate;
  will-change: transform;
}
@keyframes kenburns {
  0% {
    transform: scale(1.08) translate(0, 0);
  }
  100% {
    transform: scale(1.16) translate(-1.5%, -1.5%);
  }
}
.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(11, 9, 8, 0.35) 0%, rgba(11, 9, 8, 0.55) 55%, rgba(11, 9, 8, 0.96) 100%), linear-gradient(90deg, rgba(11, 9, 8, 0.75) 0%, rgba(11, 9, 8, 0.15) 55%);
}
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.particles .p {
  position: absolute;
  bottom: -10px;
  left: calc(var(--i) * 7%);
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.35;
  animation: float 9s ease-in-out infinite;
  animation-delay: calc(var(--i) * -0.6s);
}
@keyframes float {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  15% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(-70vh);
    opacity: 0;
  }
}

.hero-outer {
  position: relative;
  z-index: 2;
}
.hero-content {
  max-width: 640px;
  margin: 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.reveal-tag {
  opacity: 0;
  animation: reveal-in 0.7s 0.1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(34px, 6vw, 62px);
  line-height: 1.06;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
  opacity: 0;
  animation: reveal-in 0.8s 0.22s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.subtitle {
  color: var(--text-muted);
  font-size: 16px;
  max-width: 460px;
  margin-bottom: 30px;
  opacity: 0;
  animation: reveal-in 0.8s 0.36s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.cta-row {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  opacity: 0;
  animation: reveal-in 0.8s 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
@keyframes reveal-in {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bg-image {
    animation: none;
  }
  .particles {
    display: none;
  }
  .reveal-tag,
  .title,
  .subtitle,
  .cta-row {
    opacity: 1;
    animation: none;
    transform: none;
  }
}

@media (max-width: 600px) {
  .hero {
    align-items: center;
    padding-bottom: 40px;
    text-align: left;
  }
  .cta-row .btn {
    flex: 1;
  }
}
</style>
