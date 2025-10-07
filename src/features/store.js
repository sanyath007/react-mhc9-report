import { configureStore } from '@reduxjs/toolkit';
import { checkinApi } from './services/checkinApi';
import { authApi } from './services/authApi';

export default configureStore({
    reducer: {
        [checkinApi.reducerPath]: checkinApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaulMiddleware) => getDefaulMiddleware().concat(
        checkinApi.middleware,
        authApi.middleware,
    ),
});
