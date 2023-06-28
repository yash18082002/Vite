import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'http://localhost:3000';

// const initialState = { username: localStorage.getItem('username'), token: localStorage.getItem('token') } || {};

export const login = createAsyncThunk('user/login', async (initialUser) => {
    const response = await axios.post(`${USERS_URL}/api/login`, initialUser);
    localStorage.setItem('token', response.data.user.token);
    localStorage.setItem('username', response.data.user.username);
    console.log(response.data);
    console.log(response);
    if (response?.status === 200) return response.data.user;
    return `${response?.status}: ${response?.statusText}`;
})

export const signup = createAsyncThunk('user/signup', async (initialUser, { dispatch }) => {
    const response = await axios.post(`${USERS_URL}/api/signup`, initialUser);
    console.log(response.data);
    console.log(response);
    if (response?.status === 200) {
        dispatch(login(initialUser));
        return initialUser;
    }
    return `${response?.status}: ${response?.statusText}`;
})

export const logout = createAsyncThunk('user/logout', async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
});


const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        user: { username: localStorage.getItem('username'), token: localStorage.getItem('token') } || {}
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.status = 'idle';
                state.user = {};
            })
    }
})

export const selectToken = (state) => state.user.user.token;
export const selectUsername = (state) => state.user.user.username;

export default userSlice.reducer