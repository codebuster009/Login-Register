import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';
import loginSliceReducer from "../features/users/loginSlice";


export const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer,
        login: loginSliceReducer,
    }
})