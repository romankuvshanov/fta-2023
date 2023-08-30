import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { freetogameApi } from './services/freetogame'

export const store = configureStore({
    reducer: {
        [freetogameApi?.reducerPath]: freetogameApi?.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(freetogameApi?.middleware),
})

setupListeners(store.dispatch)