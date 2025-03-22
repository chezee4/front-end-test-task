import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  BaseQueryFn,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API_URL,
});

const baseQueryWithRetry: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    result = await baseQuery(args, api, extraOptions);
  }
  return result;
};

export const catsApi = createApi({
  reducerPath: 'catsApi',
  baseQuery: baseQueryWithRetry,
  endpoints: () => ({}),
});
