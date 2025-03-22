import { FC } from 'react';

import { Navigate } from 'react-router';

import SignInForm from '@/feature/SignInForm';
import { useAppSelector } from '@/store/store';

const SignInPage: FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Sign In
          </h1>
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
