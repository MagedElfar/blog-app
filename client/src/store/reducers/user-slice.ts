import { refreshToken, userAuth , userUpdate } from './../action-creator/auth';
import { createSlice } from "@reduxjs/toolkit";
import {action , UseRState} from "../../model/model";

const initialState:UseRState = {
    loading:false,
    user:null,
    errors: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers:{
        [userAuth.fulfilled.toString()]: (state:UseRState , action:action) => {
            state.user = action.payload.user
        },
        [refreshToken.fulfilled.toString()] : (state:UseRState , action:action) => {
            state.user = action.payload.user
        },
        [refreshToken.rejected.toString()] : (state:UseRState , action:action) => {
            console.log(action.payload)
        },
        [userUpdate.pending.toString()] :  (state:UseRState , action:action) => {
            state.loading = true
        },
        [userUpdate.fulfilled.toString()] :  (state:UseRState , action:action) => {
            state.loading = false;
            state.errors = [];
            state.user = action.payload.result
        },
        [userUpdate.rejected.toString()]: (state:any , action:action) => {
            state.loading = false
            state.errors = Array.isArray(action.payload)? action.payload :[action.payload]
        }
    }
})

export default userSlice.reducer;