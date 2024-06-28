import { configureStore } from '@reduxjs/toolkit';
import { checkinApi } from './services/checkinApi';

export default configureStore({
    reducer: {
        [checkinApi.reducerPath]: checkinApi.reducer,
    },
    middleware: (getDefaulMiddleware) => getDefaulMiddleware().concat(
        checkinApi.middleware,
    ),
});
