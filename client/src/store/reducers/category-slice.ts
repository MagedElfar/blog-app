import { addCategory, getCategories } from './../action-creator/category';
import { createSlice } from "@reduxjs/toolkit";
import {Category , action } from "../../model/model";

const initialState:Category = {
    isLoading: false,
    categories: [],
    errors: []
}

const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers: {},
    extraReducers: {
        [getCategories.fulfilled.toString()] : (state:Category , action:action) => {
            state.categories = action.payload.result
        },
        [getCategories.rejected.toString()] : (state:any , action:action) =>  {
            console.log(action.payload)
        },
        [addCategory.pending.toString()] : (state:Category , action:action) => {
            state.isLoading = true;
        },
        [addCategory.fulfilled.toString()] : (state:Category , action:action) => {
            state.isLoading = false;
            state.errors = [];
            state.categories = [action.payload.result , ...state.categories]
        },
        [addCategory.rejected.toString()]: (state:any , action:action) => {
            state.isLoading = false
            state.errors = Array.isArray(action.payload)? action.payload :[action.payload]
        },
    }
});

export default categorySlice.reducer;