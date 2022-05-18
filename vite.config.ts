import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import externalGlobals from 'rollup-plugin-external-globals';
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['qc'],
      plugins: [
        externalGlobals({
          qc: 'QC'
        })
      ]
    }
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      {
        find: 'components',
        replacement: resolve(__dirname, 'src/components')
      },
      { find: 'views', replacement: resolve(__dirname, 'src/views') },
      { find: 'assets', replacement: resolve(__dirname, 'src/assets') },
      { find: 'store', replacement: resolve(__dirname, 'src/store') },
      { find: 'library', replacement: resolve(__dirname, 'src/library') }
    ]
  },
  server: {
    host: '0.0.0.0',
    port: 8080
  }
});
