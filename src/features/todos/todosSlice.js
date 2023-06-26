import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

const TODOS_URL = 'http://localhost:3000/todos';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await axios.get(TODOS_URL);
    return response.data;
})

export const addTodos = createAsyncThunk('todos/addTodos', async (initialTodo) => {
    const response = await axios.post(TODOS_URL, initialTodo);
    return response.data;
})

export const doTodos = createAsyncThunk('todos/doTodos', async (initialTodo) => {
    const { _id } = initialTodo;
    const response = await axios.put(`${TODOS_URL}/${_id}`);
    if (response?.status === 200) return initialTodo;
    return `${response?.status}: ${response?.statusText}`;
})

export const deleteTodos = createAsyncThunk('todos/deleteTodos', async (initialTodo) => {
    const { _id } = initialTodo;
    const response = await axios.delete(`${TODOS_URL}/${_id}`);
    if (response?.status === 200) return initialTodo;
    return `${response?.status}: ${response?.statusText}`;
})

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        todos: []
    },
    reducers: {
        // reducers will go here
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTodos.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const loadedTodos = action.payload;
                state.todos = loadedTodos;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addTodos.fulfilled, (state, action) => {
                const loadedTodo = action.payload;
                state.todos.push(loadedTodo);
            })
            .addCase(doTodos.fulfilled, (state, action) => {
                if (!action.payload?._id) {
                    console.log('Status could not be updated')
                    console.log(action.payload)
                    return;
                }
                const { _id } = action.payload;
                // const updatedTodo = { ...action.payload, completed: true };
                // console.log(updatedTodo);
                state.todos = state.todos.map(todo => {
                    if (todo._id === _id) {
                        return { ...todo, completed: true }
                    }
                    return todo;
                })
            })
            .addCase(deleteTodos.fulfilled, (state, action) => {
                if (!action.payload?._id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { _id } = action.payload;
                state.todos = state.todos.filter(todo => todo._id !== _id);
            })
    }
})

export const selectAllTodos = (state) => state.todos.todos
export const selectTodosStatus = (state) => state.todos.status
export const selectTodosError = (state) => state.todos.error
export const selectTodoById = (state, id) => {
    state.todos.todos.find(todo => todo._id === id)
}

export default todosSlice.reducer