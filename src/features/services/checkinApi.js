import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const checkinApi = createApi({
    reducerPath: 'checkinApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('access_token');

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);

                return headers;
            }
        },
    }),
    endpoints: (builder) => ({
        getInitialFormData: builder.query({
            query: () => ({ url: '/api/checkins/init/form' }),
        }),
    }),
});

export const { useGetInitialFormDataQuery } = checkinApi;
