import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/home';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StackSpinner from '@components/stdlib/loader/StackSpinner';

const SelfHosted = React.lazy(() => import('@pages/selfhosted'));
const Blog = React.lazy(() => import('@pages/blog'));
const About = React.lazy(() => import('@pages/about'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: 'selfhosted',
        element: (
          <Suspense fallback={<StackSpinner />}>
            <SelfHosted />
          </Suspense>
        ),
      },
      {
        path: 'blog',
        element: (
          <Suspense fallback={<StackSpinner />}>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<StackSpinner />}>
            <About />
          </Suspense>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
