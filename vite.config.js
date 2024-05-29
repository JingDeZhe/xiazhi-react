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
        },
      ],
      dts: './auto-imports.d.ts',
    }),
  ],
})
