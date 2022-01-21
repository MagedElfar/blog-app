import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './../../api/api';
import { User } from '../../model/model';


//signup and login
export const userAuth = createAsyncThunk("auth/login" , async ({user , navigate , isNew}:{user:User , navigate:any , isNew:boolean}, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
        if(isNew){
            const {data} = await api.signup(user);
            navigate('/', {replace: true});
            return data
        } else {
            const {data} = await api.login(user);
            navigate('/', {replace: true});
            return data
        }
    } catch (error:any) {
        return rejectWithValue(error?.response?.data?.message || error.message)
    }
} )


//refreshToken requst
export const refreshToken = createAsyncThunk("auth/refreshToken" , async ( _ , thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
        const {data} = await api.refreshToken();
        return data
    } catch (error:any) {
        return rejectWithValue(error?.response?.data?.message || error.message)
    }
} )

//logout
export const logout = createAsyncThunk("auth/logout" , async(_ , thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
        await api.logout();
        return;
    } catch (error:any) {
        return rejectWithValue(error?.response?.data?.message || error.message)
    }
})

//account update
export const userUpdate = createAsyncThunk ("user/update" , async({formDate} : {formDate:FormData} , thunkAPI) => {
    const {rejectWithValue , getState} : {rejectWithValue:any , getState:any}= thunkAPI;
    try {
        const id = getState().user.user._id;
        const {data} = await api.updateUser( id  , formDate)
        return data
    } catch (error:any) {
        return rejectWithValue(error?.response?.data?.message || error.message)
    }
})