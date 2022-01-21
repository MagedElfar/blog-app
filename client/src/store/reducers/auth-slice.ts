import {userAuth , refreshToken , logout} from "./../action-creator/auth"
import { createSlice } from "@reduxjs/toolkit";
import {Aut , action} from "../../model/model";

const initialState:Aut = {
    token: null,
    isLoading: false,
    errors: []
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        // auth opration
        [userAuth.pending.toString()]: (state:any , action:action) => {
            state.isLoading = true
        },
        [userAuth.fulfilled.toString()]: (state:any , action:action) => {
            state.isLoading = false;
            state.token = action.payload.token;
        },
        [userAuth.rejected.toString()]: (state:any , action:action) => {
            state.isLoading = false
            state.errors = Array.isArray(action.payload)? action.payload :[action.payload]
        },

        // refreshToken
        [refreshToken.fulfilled.toString()] : (state:any , action:action) => {
            state.token = action.payload.token;
        },
        [refreshToken.rejected.toString()] : (state:any , action:action) => {
            console.log(action.payload);
        },

        //logout
        [logout.fulfilled.toString()] : (state:any , action:action) => {
            state.token = null;
        },
        [logout.rejected.toString()] : (state:any , action:action) => {
            console.log(action.payload);
        },
    }
    
})

export default authSlice.reducer;