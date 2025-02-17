import { defineConfig, Plugin, ResolvedConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sassDts from 'vite-plugin-sass-dts';
import mdx from '@mdx-js/rollup';
import path from 'path';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeMermaid from 'rehype-mermaid';
import chokidar from 'chokidar';
import { generatePagesTs } from './tools/toc';
import { Stats } from 'fs';
import remarkGfm from 'remark-gfm';
import wasm from 'vite-plugin-wasm';

function generateMdxDirectory(): Plugin[] {
  let config: ResolvedConfig;

  return [
    {
      name: 'generate-mdx-directory:serve',
      apply: 'serve',
      async configResolved(_config: ResolvedConfig) {
        config = _config;
      },
      configureServer(server: any) {
        function reloadPage() {
          // Function that sends a signal to reload the server.
          console.log('reload page run');
          server.ws.send({ type: 'full-reload', path: '*' });
        }
        const watcher = chokidar.watch('src/markdown', {
          ignored: (val: string, stats?: Stats) => {
            if (!stats?.isFile()) {
              return false;
            }
            return !val.endsWith('.mdx');
          }, // only watch js files
          persistent: true,
          cwd: config.root, // Define project root path
          ignoreInitial: true, // Don't trigger chokidar on instantiation.
        });
        const onChange = (path: string) => {
          const directory = path.split('\\').slice(0, -1).join('\\');
          console.log(`${path} changes detected in ${directory}`);
          if (directory === '') {
            return;
          }
          generatePagesTs(directory, directory);
          reloadPage();
        };
        watcher
          .on('add', onChange) // Add listeners to add, modify, delete.
          .on('change', onChange);
      },
    },
  ];
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sassDts(),
    mdx({
      exclude: './src/stories/**/*.mdx',
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
      rehypePlugins: [
        [
          rehypeMermaid,
          {
            strategy: 'pre-mermaid',
            colorScheme: 'dark',
          },
        ],
      ],
    }),
    generateMdxDirectory(),
    wasm(),
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
    sourcemap: true,
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
