import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  // 'dapurnenekrajib.github.io' is a GitHub *user* page repo, served at the
  // domain root — so base stays '/'. Only project-page repos (any other
  // repo name) need a base matching '/repo-name/'.
  base: '/',
  server: {
    port: 5173,
    open: true,
  },
});
