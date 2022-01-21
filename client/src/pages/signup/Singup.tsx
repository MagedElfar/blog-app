import { useState} from "react";
import {useNavigate} from "react-router-dom"
import { useSelector , useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import BG from "./../../assets/images/1124103.webp";
import Auth from "../../components/auth/Auth";
import Link from "../../layout/link/Link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye , faEyeSlash , faSpinner} from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../store/store";
import { userAuth } from "../../store/action-creator/auth";

const Singup = () => {
    const {isLoading , errors} = useSelector((state:RootState) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPass , setShowPss] = useState(false);
    const [user , setUser] = useState({
        email: "",
        password:"",
        username:""
    })

    const toggelPass = () => {
        setShowPss((s) => !s)
    }

    const handelCred = (e:any) => {
        setUser({...user , [e.target.name]: e.target.value})
    }

    const singup = (e:any) => {
        e.preventDefault();
        const isNew = true;
        dispatch(userAuth({user , navigate , isNew}))
    }

    return (
        <div className="sinup-componnet">
            <Auth bg = {BG} title="singup" errors={errors}>
                <form onSubmit={(e) => singup(e)}>
                    <div>
                        <label>username</label>
                        <input value={user.username} type="text" name="username" placeholder="Enter your username..." onChange={(e) => handelCred(e) }/>
                    </div>
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
                        Singup
                    </Button>
                </form>
                <div className="text-capitalize text-right">
                    for login <Link route="/login">click here</Link>
                </div>
            </Auth>
        </div>
    )
}

export default Singup;
