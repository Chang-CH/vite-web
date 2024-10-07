import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/home';
import '@theme/_global.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StackSpinner from '@components/stdlib/loader/StackSpinner';
import MarkdownArticle from '@components/markdown/MarkdownPage';
import CleanBlog from './layouts/CleanBlog';
import TestDirectory from '@pages/experimental/mdx-directory';

const SelfHosted = React.lazy(() => import('@pages/selfhosted'));
const Projects = React.lazy(() => import('@pages/projects'));
const ExpSubModule = React.lazy(
  () => import('@pages/experimental/mdx-submodule')
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/selfhosted',
    element: (
      <Suspense fallback={<StackSpinner />}>
        <SelfHosted />
      </Suspense>
    ),
  },
  {
    path: '/selfhosted/:article',
    element: <MarkdownArticle Layout={CleanBlog} />,
    loader: ({ params }) => {
      return Promise.all([
        import(`@markdown/selfhosted/${params.article}/index.mdx`),
        import(`@markdown/selfhosted/${params.article}/components.ts`).catch(
          () => ({})
        ),
      ]).then(res => {
        return {
          MDXContent: res[0].default,
          CustomComponents: res[1].default,
        };
      });
    },
  },
  {
    path: '/projects',
    element: (
      <Suspense fallback={<StackSpinner />}>
        <Projects />
      </Suspense>
    ),
  },
  {
    path: '/projects/:project',
    element: <MarkdownArticle Layout={CleanBlog} />,
    loader: ({ params }) => {
      return Promise.all([
        import(`@markdown/projects/${params.project}/index.mdx`),
        import(`@markdown/projects/${params.project}/components.ts`).catch(
          () => ({})
        ),
      ]).then(res => {
        return {
          MDXContent: res[0].default,
          CustomComponents: res[1].default,
        };
      });
    },
  },
  {
    path: '/projects/:projectName/:article',
    element: <MarkdownArticle Layout={CleanBlog} />,
    loader: ({ params }) => {
      return Promise.all([
        import(
          `@markdown/projects/${params.projectName}/${params.article}/index.mdx`
        ),
        import(
          `@markdown/projects/${params.projectName}/${params.article}/components.ts`
        ).catch(() => ({})),
      ]).then(res => {
        return {
          MDXContent: res[0].default,
          CustomComponents: res[1].default,
        };
      });
    },
  },
  {
    path: '/tech/:article',
    element: <MarkdownArticle Layout={CleanBlog} />,
    loader: ({ params }) => {
      return Promise.all([
        import(`@markdown/tech/${params.article}.mdx`),
        import(`@markdown/projects/${params.article}.ts`).catch(() => ({})),
      ]).then(res => {
        return {
          MDXContent: res[0].default,
          CustomComponents: res[1].default,
        };
      });
    },
  },
  {
    // Rollup dynamic imports only go 1 level deep: i.e. import(`path/${param}.mdx`), only path/file works, path/file/file does not
    path: '/leetcode/*',
    element: <MarkdownArticle Layout={CleanBlog} />,
    loader: ({ params }) => {
      console.log(`@markdown/leetcode/${params['*']}.mdx`);
      return Promise.all([import(`@markdown/leetcode/${params['*']}.mdx`)])
        .then(res => {
          console.log(res);
          return {
            MDXContent: res[0].default,
          };
        })
        .catch(e => {
          console.log('ASDAS');
          console.error(e);
        });
    },
  },
  {
    path: '/experimental/mdx-submodule',
    element: (
      <Suspense fallback={<StackSpinner />}>
        <ExpSubModule />
      </Suspense>
    ),
  },
  {
    path: '/experimental/mdx-directory',
    element: (
      <Suspense fallback={<StackSpinner />}>
        <TestDirectory />
      </Suspense>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
