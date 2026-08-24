import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * The site is served from the root of its own domain, so the base is "/".
 * VITE_BASE_PATH is still honoured for the case of publishing under a
 * sub-path again, which is how this was built while it lived at
 * <user>.github.io/capitolium/.
 */
const base = process.env.VITE_BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  server: {
    port: 5183,
  },
})
