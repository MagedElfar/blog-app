import store, { RootState } from "./../store/store";
import axios from "axios";
import SERVER_URL  from "../model/api-url";

//const select = (state:RootState) => state.auth.token

const url = SERVER_URL;

const API = axios.create({baseURL: url});

API.interceptors.request.use((req:any) => {
    const select = (state:RootState) => state.auth.token

    const token:any = select(store.getState())
    if(token){
        req.headers.Authorization = `Bearer ${token}`;
    } else {
        req.headers.Authorization = `Bearer `;
    }
    return req;
});


let config = {
    headers: { "Content-Type": "multipart/form-data" }
};

let authConfig = {
    headers: { crossDomain: true, 'Content-Type': 'application/json' },
    withCredentials: true
}

//auth api
export const signup = (data:any) => API.post('/auth/singup' , data , authConfig);
export const login = (data:any) =>  API.post('/auth/login' , data , authConfig);
export const refreshToken = (data:any = {}) => API.post('/auth/refreshtoken' , data , authConfig);
export const logout = () => API.get("/auth/logout" , authConfig)
export const updateUser = (id:string , data:any) => API.patch(`/user/${id}`, data , config)

//category api
export const getCategories =() => API.get('/category/');
export const addCategory = (data:any) => API.post("/category/add" , data)

//post api
export const getPosts = (query:string= "") => API.get(`/post${query}`)
export const addPost = (data:any) => API.post('/post/add' , data , config)
export const updatePost = (id:string , data:any) => API.patch(`/post/${id}` , data , config)
export const getOnePost = (slug:string) => API.get(`/post/single/${slug}`);
export const deletePost = (id:string) => API.delete(`/post/${id}`);
export const reviewPost = (id:string , data:any) => API.put(`/post/review/${id}` , data);