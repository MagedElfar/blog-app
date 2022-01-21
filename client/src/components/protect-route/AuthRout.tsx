import {User} from "./../../model/model";
import { Navigate } from "react-router-dom";

const AuthRout = ({children } : {children :any}) => {
    const user:User = JSON.parse(localStorage.getItem("user")!);
    return user? <Navigate replace to="/" /> : children;
}

export default AuthRout
