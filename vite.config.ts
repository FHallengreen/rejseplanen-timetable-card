import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2020',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: 'src/trafiklab-timetable-card.ts',
      output: {
        entryFileNames: 'rejseplanen-timetable-card.js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
});
