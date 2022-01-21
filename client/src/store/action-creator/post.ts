import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './../../api/api'

//get posts
export const getPosts = createAsyncThunk("post/get" , async(_ , thunkAPI) => {
    try {
        const {data} = await api.getPosts();
        return data
    } catch (error:any) {
        console.log(error?.response?.data?.message || error.message);
    }
});

//add post
export const addPost = createAsyncThunk("post/add" , async(args:FormData , thunkAPI) => {
    const {rejectWithValue}  = thunkAPI;
    try {
        const {data} = await api.addPost(args);
        return data;
    } catch (error:any) {
        return rejectWithValue(error?.response?.data?.message || error.message)
    }
});

//update post
export const updatePost = createAsyncThunk("post/update" , async(args:any , thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
        const {data} = await api.updatePost(args.id , args.data)
        return data;
    } catch (error:any) {
        return rejectWithValue(error?.response?.data?.message || error.message);
    }
});

//delete post
export const deletePost = createAsyncThunk("post/delete" , async(args:any , thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
        const {data} = await api.deletePost(args);
        return data
    } catch (error:any) {
        return rejectWithValue(error)
    }
});