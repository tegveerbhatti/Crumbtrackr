import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
  },
  plugins: [
    {
      name: 'copy-redirects',
      buildStart() {
        this.emitFile({
          type: 'asset',
          fileName: '_redirects',
          source: '/*    /index.html   200',
        });
      },
    },
  ],
});
