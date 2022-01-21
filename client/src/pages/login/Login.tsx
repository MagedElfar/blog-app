import { useState} from "react";
import {useNavigate} from "react-router-dom"
import { useSelector , useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import BG from "./../../assets/images/Beach-sea-background-HD-resolution-palm-orange-clouds-1920x1200.jpg"
import Auth from "../../components/auth/Auth";
import Link from "./../../layout/link/Link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye , faEyeSlash , faSpinner} from "@fortawesome/free-solid-svg-icons";
import { userAuth } from "../../store/action-creator/auth";
import { User } from "../../model/model";
import { RootState } from "../../store/store";

const Login = () => {
    const {isLoading , errors} = useSelector((state:RootState) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPass , setShowPss] = useState(false);
    const [user , setCredential] = useState<User>({
        email: "",
        password:""
    })

    const toggelPass = () => {
        setShowPss((s) => !s)
    }

    const handelCred = (e:any) => {
        setCredential({...user , [e.target.name]: e.target.value})
    }

    const login = (e:any) => {
        e.preventDefault();
        const isNew = false;
        dispatch(userAuth({user , navigate , isNew}))
        
    }

    return (
        <div>
            <Auth bg = {BG} title="login" errors={errors}>
                <form onSubmit={(e) => login(e)}>
                    <div>
                        <label>email</label>
                        <input value={user.email} type="text" name="email" placeholder="Enter your Email..." onChange={(e) => handelCred(e) }/>
                    </div>
                    <div>
                        <label>password</label>
                        <div className="show-hide-password">
                            <FontAwesomeIcon onClick={toggelPass} icon={showPass ? faEyeSlash :faEye} />
                            {showPass ? 
                            <input value={user.password} type="text" name="password" placeholder="Enter your Password..." onChange={(e) => handelCred(e) } />
                            :<input value={user.password} type="password" name="password" placeholder="Enter your Password..." onChange={(e) => handelCred(e) } />}
                        </div>
                    </div>
                    <Button variant="danger" type="submit" className="w-100">
                        {isLoading? <FontAwesomeIcon className="loading" icon={faSpinner} /> : null}
                        Login
                    </Button>
                </form>
                <div className="text-capitalize text-right">
                    for creat new account <Link route="/singup">click here</Link>
                </div>
            </Auth>
        </div>
    )
}

export default Login
