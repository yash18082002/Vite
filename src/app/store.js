import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../features/todos/todosSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
    reducer: {
        todos: todoReducer,
        user: userReducer
    }
})