import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import cdn from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/xiazhi-react/',
  server: { port: 5182 },
  plugins: [
    react(),
    UnoCSS(),
    AutoImport({
      imports: [
        'react',
        {
          classnames: [['default', 'cls']],
          'overlayscrollbars-react': [
            ['OverlayScrollbarsComponent', 'Scrollbar'],
          ],
        },
      ],
      dts: './auto-imports.d.ts',
    }),
    cdn({
      modules: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
