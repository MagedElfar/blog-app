import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './../../api/api'

//get categories
export const getCategories = createAsyncThunk("category/get" , async( _ , thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
        const {data} = await api.getCategories();
        return data
    } catch (error:any) {
        return rejectWithValue(error)
    }
})

//add category 
export const addCategory = createAsyncThunk("category/add" , async({cat} : {cat:any} , thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
        console.log(cat)
        const {data} = await api.addCategory(cat);
        return data;
    } catch (error:any) {
        return rejectWithValue(error?.response?.data?.message || error.message);
    }
})
