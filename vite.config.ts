import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, './src') },
      {
        find: 'components',
        replacement: resolve(__dirname, './src/components')
      },
      { find: 'views', replacement: resolve(__dirname, './src/views') },
      { find: 'assets', replacement: resolve(__dirname, './src/assets') },
      { find: 'store', replacement: resolve(__dirname, './src/store') },
      { find: 'library', replacement: resolve(__dirname, './src/library') }
    ]
  }
})
