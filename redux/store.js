import { configureStore } from "@reduxjs/toolkit"
import dataReducer from "./slice"
import { getDefaultMiddleware } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {
        data: dataReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
})