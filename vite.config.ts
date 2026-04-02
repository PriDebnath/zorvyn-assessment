import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import routerPlugin, { tanstackRouter } from '@tanstack/router-plugin/vite'

 
export default defineConfig(({ mode }) => {
  const isGithub = mode === 'github'

  return {
    // 🔑 BASE URL // GitHub Pages → "/repo-name/"
    base: isGithub ? '/zorvyn-assessment/' : './',
    plugins: [
      react(),
      tailwindcss(),
      routerPlugin(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
