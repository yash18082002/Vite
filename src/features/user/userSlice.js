import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'http://localhost:3000';

const initialState = { username: localStorage.getItem('username'), token: localStorage.getItem(token) } || {};

export const login = createAsyncThunk('user/login', async (initialUser) => {
    const response = await axios.post(`${USERS_URL}/login`, initialUser);
    localStorage.setItem('token', response.data.user.token);
    if (response?.status === 200) return initialUser;
    return `${response?.status}: ${response?.statusText}`;
})

export const signup = createAsyncThunk('user/signup', async (initialUser) => {
    const response = await axios.post(`${USERS_URL}/signup`, initialUser);
    if (response?.status === 200) return initialUser;
    return `${response?.status}: ${response?.statusText}`;
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        user: { username: localStorage.getItem('username'), token: localStorage.getItem(token) } || {}
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
    }
})