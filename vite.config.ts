import { defineConfig } from 'vite';

const banner = `/*!
 * Rejseplanen Timetable Card
 * https://github.com/FHallengreen/rejseplanen-timetable-card
 *
 * Copyright (c) 2025-2026 Mattias Sjödin
 * Copyright (c) 2026 Frederik Hansen
 * Released under the MIT License.
 *
 * Derived from HomeAssistant_Trafiklab_Timetable_Card by Mattias Sjödin (MIT).
 */`;

export default defineConfig({
  build: {
    target: 'es2020',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: 'src/rejseplanen-timetable-card.ts',
      output: {
        banner,
        // Keep `/*!` and `@license` comments through minification: our MIT
        // banner and lit's BSD-3 notice must survive, since HACS ships only
        // the bundled .js.
        comments: { legal: true },
        entryFileNames: 'rejseplanen-timetable-card.js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
});
