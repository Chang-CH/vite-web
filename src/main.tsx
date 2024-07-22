import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/home';
import '@theme/_global.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StackSpinner from '@components/stdlib/loader/StackSpinner';
import MarkdownArticle from '@components/markdown/MarkdownPage';
import CleanBlog from './layouts/CleanBlog';

const SelfHosted = React.lazy(() => import('@pages/selfhosted'));
const Projects = React.lazy(() => import('@pages/projects'));

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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
