import {configureStore} from "@reduxjs/toolkit";
import { bookApi } from "./feature/book/bookApi";
import { borrowApi } from "./feature/borrow/borrowApi";



export const store = configureStore({
    reducer : {
        [bookApi.reducerPath] : bookApi.reducer,
        [borrowApi.reducerPath] : borrowApi.reducer
    },
    middleware : (GetDefaultMiddleware)=> GetDefaultMiddleware().concat(bookApi.middleware,borrowApi.middleware)
})




// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;