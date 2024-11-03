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
          generatePagesTs('src/markdown', 'src/markdown');
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
        console.log(config.root);

        watcher
          .on('add', reloadPage) // Add listeners to add, modify, delete.
          .on('change', reloadPage)
          .on('unlink', reloadPage);

        return () => {
          server.middlewares.use(async (req: any, res: any, next: any) => {
            return next();
          });
        };
      },
    },
    // {
    //   name: 'generate-mdx-directory:build',
    //   apply: 'build',
    //   async configResolved(_config: ResolvedConfig) {
    //     config = _config;
    //   },
    //   writeBundle() {
    //     const sprite = getSpriteContent({ pattern: 'src/icons/*.svg' });
    //     const filePath = path.resolve(
    //       config.root,
    //       config.build.outDir,
    //       'sprite.svg'
    //     );
    //     fs.ensureFileSync(filePath);
    //     fs.writeFileSync(filePath, sprite);
    //   },
    // },
  ];
}

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
    generateMdxDirectory(),
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
