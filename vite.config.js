import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * GitHub Pages serves a project site from a sub-path (/capitolium/), while
 * local dev and host-based deploys like Vercel serve from the root. The
 * Pages workflow sets VITE_BASE_PATH, so nothing else has to change.
 */
const base = process.env.VITE_BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  server: {
    port: 5183,
  },
})
