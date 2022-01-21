import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/auth-slice";
import user from "./reducers/user-slice";
import category from "./reducers/category-slice";
import post from "./reducers/post-slice";


const store = configureStore({
    reducer:{
        auth,
        user,
        category,
        post
    }
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

export default store;