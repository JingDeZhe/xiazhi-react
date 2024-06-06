import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import cdn from 'vite-plugin-cdn-import'

// https://vitejs.dev/config/
export default defineConfig({
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
      modules: [
        {
          name: 'react',
          var: 'React',
          path: `https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/cjs/react.production.min.js`,
        },
        {
          name: 'react-dom',
          var: 'ReactDOM',
          path: `https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/cjs/react-dom.production.min.js`,
        },
        {
          name: 'react-router-dom',
          var: 'ReactRouterDOM',
          path: `https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/6.23.1/react-router-dom.production.min.js`,
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
