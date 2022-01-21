import { createSlice } from "@reduxjs/toolkit";
import {PostReducer , action } from "../../model/model";
import { addPost, deletePost, getPosts, updatePost } from "../action-creator/post";

const initialState:PostReducer = {
    isLoading: false,
    errors: [],
    posts: [],
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: {
        //get posts
        [getPosts.fulfilled.toString()]: (state:PostReducer , action:action) => {
            state.posts = action.payload.result;
        },
        [getPosts.rejected.toString()]: (state:PostReducer , action:action) => {
            console.log(action.payload)
        },

        //add post
        [addPost.pending.toString()] : (state:PostReducer , action:action) => {
            state.errors = [];
            state.isLoading = true;
        },
        [addPost.fulfilled.toString()] : (state:PostReducer , action:action) => {
            state.isLoading = false;
            state.errors = [];
            state.posts = [action.payload.result , ...state.posts]
        },
        [addPost.rejected.toString()]: (state:any , action:action) => {
            state.isLoading = false
            state.errors = Array.isArray(action.payload)? action.payload :[action.payload]
        },

        //update post
        [updatePost.pending.toString()] : (state:PostReducer , action:action) => {
            state.errors = [];
            state.isLoading = true;
        },
        [updatePost.fulfilled.toString()] : (state:PostReducer , action:action) => {
            state.isLoading = false;
            state.errors = [];
            state.posts = state.posts.map((item:any) => {
                if(item._id === action.payload.result._id){
                    return action.payload.result
                } else {
                    return item
                }
            })
        },
        [updatePost.rejected.toString()]: (state:any , action:action) => {
            state.isLoading = false
            state.errors = Array.isArray(action.payload)? action.payload :[action.payload]
        },

        //delete post
        [deletePost.fulfilled.toString()] : (state:any , action:action) =>  {
            state.posts = state.posts.filter((item:any) => {
                return item._id !== action.payload
            })
        },
        [deletePost.rejected.toString()] : (state:any , action:action) =>  {
            console.log(action.payload)
        }
    }
})

export default postSlice.reducer;