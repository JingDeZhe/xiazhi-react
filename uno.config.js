import transformerCompileClass from '@unocss/transformer-compile-class'
import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerCompileClass()],
  theme: {
    colors: {},
  },
  safelist: getSafeList(),
})

function getSafeList() {
  return []
}
