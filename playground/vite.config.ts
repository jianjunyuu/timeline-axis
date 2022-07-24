import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      'timeline-axis': path.resolve(__dirname, '../src/index.ts'),
    },
  },
  plugins: [vue()],
})
