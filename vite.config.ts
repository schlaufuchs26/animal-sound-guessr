import { defineConfig } from 'vite'

export default defineConfig({
  // Base path: use "/" for Cloudflare Pages (root domain)
  // Use "/animal-sound-guessr/" for GitHub Pages (subdirectory)
  base: process.env.CF_PAGES ? '/' : '/animal-sound-guessr/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    open: true
  }
})
