import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { LoginFailureResponse } from '@/store/types/auth';

export const errorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const message =
      (action.payload as LoginFailureResponse)?.message || 'An error occurred';
    toast.error(message);
  }

  return next(action);
};
