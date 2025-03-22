import { createBrowserRouter } from 'react-router';

import HomePage from '@/app/home';
import SignInPage from '@/app/signIn';
import PageWrapper from '@/layouts/PageWrapper';
import ProtectedRoute from '@/layouts/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute
        element={
          <PageWrapper>
            <HomePage />
          </PageWrapper>
        }
      />
    ),
  },
  {
    path: '/sign-in',
    element: (
      <PageWrapper>
        <SignInPage />
      </PageWrapper>
    ),
  },
]);

export default router;
