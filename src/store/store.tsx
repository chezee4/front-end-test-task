import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { errorMiddleware } from '@/store/middlewares/errorMiddleware';
import { catsApi } from '@/store/services/catsApi';
import authReducer from '@/store/slices/authSlice';
import filterReducer from '@/store/slices/filterSlice';

const store = configureStore({
  reducer: {
    cats: catsApi.reducer,
    filters: filterReducer,
    auth: authReducer,
    [catsApi.reducerPath]: catsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([catsApi.middleware, errorMiddleware])
      .concat(catsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T,>(selector: (state: RootState) => T) =>
  useSelector(selector);

export { store };
