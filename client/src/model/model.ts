//user
export interface User{
    _id?:string,
    username?:string,
    slug?:string,
    email?:string,
    password?:string,
    role?:string,
    image?:string
}

//user auth
export interface UseRState{
    loading: boolean,
    user:User | null,
    errors: []
}

//aut
export interface Aut {
    isLoading: boolean,
    token: any,
   // user: User | any ,
   errors: [],
   // success: boolean
}


//reviews
export interface Reviews{
    rating?: number,
    comment?: number,
    user?:any,
    date?: any
}

//post
export interface Post{
    _id?:string,
    title:string,
    slug?:string,
    content: string,
    author?:{
        _id: string,
        username?:string,
        slug?:string
    } | any,
    image?:string,
    category?:[] | any,
    createdAt?: string,
    reviews ?:[Reviews],
    rating?:number
}

//post reducer
export interface PostReducer {
    isLoading: boolean,
    posts: Post [],
    errors: []
}

//category
export interface Category {
    isLoading: boolean,
    categories:any [],
    errors: []
}

//action
export interface action {
    type:string,
    payload?: any
}