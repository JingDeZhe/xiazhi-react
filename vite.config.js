import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'

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
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
