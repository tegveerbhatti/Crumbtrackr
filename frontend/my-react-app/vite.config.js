import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist', // Define the output directory for the build
  },
  plugins: [
    react(), // Add the React plugin first
    {
      name: 'copy-redirects', // Custom plugin to copy the _redirects file
      buildEnd() {
        // Use the 'buildEnd' hook to ensure compatibility
        this.emitFile({
          type: 'asset',
          fileName: '_redirects',
          source: '/*    /index.html   200',
        });
      },
    },
  ],
});
