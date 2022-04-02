import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

import postcss from './postcss.config.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  css: { postcss },

  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
