import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import compress from 'astro-compress'
import icon from 'astro-icon'
import node from '@astrojs/node'

export default defineConfig({
  output: 'server',
  site: 'https://bvff.albarinolab.pt',
  adapter: node({ mode: 'standalone' }),
  compressHTML: true,
  middleware: true,
  integrations: [
    mdx(),
    icon(),
    tailwind({ applyBaseStyles: false }),
    compress(),
  ],
  vite: {
    server: {
      allowedHosts: ['bvff.albarinolab.pt', '.albarinolab.pt'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          logger: { warn: () => {} },
        },
      },
    },
  },
})