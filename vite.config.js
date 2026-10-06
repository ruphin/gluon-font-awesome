import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // Emit the published entry point (font-awesome.js) to the package root
    outDir: '.',
    emptyOutDir: false,
    copyPublicDir: false,
    minify: false,
    lib: {
      entry: 'src/font-awesome.js',
      formats: ['es'],
      fileName: () => 'font-awesome.js'
    },
    rolldownOptions: {
      external: [/^@gluon\/gluon/]
    }
  }
});
