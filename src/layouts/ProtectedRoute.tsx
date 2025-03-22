import { JSX } from 'react';

import { Navigate } from 'react-router';

import { useAppSelector } from '@/store/store';

type ProtectedRouteProps = {
  element: JSX.Element;
  unauthorizedRedirectPath?: string;
};

const ProtectedRoute = ({
  element,
  unauthorizedRedirectPath = '/sign-in',
}: ProtectedRouteProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={unauthorizedRedirectPath} />;
  }
  
  return element;
};

export default ProtectedRoute;
