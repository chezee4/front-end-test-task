import { catsApi } from '@/store/services/catsApi';
import type { CatModel } from '@/types/cat';

const breedApi = catsApi.injectEndpoints({
  endpoints: (builder) => ({
    getBreedById: builder.query<CatModel, string>({
      query: (id) => `/breeds/${id}`,
    }),
    getBreeds: builder.query<CatModel[], void>({
      query: () => '/breeds',
    }),
  }),
});

export const { useGetBreedsQuery, useGetBreedByIdQuery } = breedApi;
