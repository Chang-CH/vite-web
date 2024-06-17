import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/home';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StackSpinner from '@components/stdlib/loader/StackSpinner';
import BlogArticle from '@pages/blog/article';

const SelfHosted = React.lazy(() => import('@pages/selfhosted'));
const Blog = React.lazy(() => import('@pages/blog'));
const About = React.lazy(() => import('@pages/about'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/selfhosted',
    element: <SelfHosted />,
  },
  {
    path: '/blog',
    element: (
      <Suspense fallback={<StackSpinner />}>
        <Blog />
      </Suspense>
    ),
  },
  {
    path: '/blog/:article',
    element: <BlogArticle />,
    loader: ({ params }) =>
      import(`@pages/blog/article/markdown/${params.article}.mdx`).then(
        res => ({
          MDXContent: res.default,
        })
      ),
  },
  {
    path: '/about',
    element: (
      <Suspense fallback={<StackSpinner />}>
        <About />
      </Suspense>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
