import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sassDts from 'vite-plugin-sass-dts';
import mdx from '@mdx-js/rollup';
import path from 'path';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeMermaid from 'rehype-mermaid';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sassDts(),
    mdx({
      exclude: './src/stories/**/*.mdx',
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [
        [
          rehypeMermaid,
          {
            // strategy: 'img-svg',
            strategy: 'pre-mermaid',
            colorScheme: 'dark',
          },
        ],
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@theme/commons.scss" as *;',
      },
    },
  },
  build: {
    // lib: {
    //   name: 'vite-web-lib',
    //   entry: path.resolve(__dirname, 'src/index.ts'),
    // },
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@markdown': path.resolve(__dirname, './src/markdown'),
      '@theme': path.resolve(__dirname, './src/theme'),
    },
  },
});
