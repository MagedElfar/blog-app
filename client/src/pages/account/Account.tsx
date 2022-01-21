import { faSpinner , faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button , Container } from "react-bootstrap";
import {useDispatch , useSelector } from "react-redux";
import SERVER_URL from "../../model/api-url";
import {Aut, User} from "./../../model/model";
import style from "./Account.module.css";
import Errors from "./../../components/errors/Errors";
import Success from "./../../components/success/Success";
import { userUpdate } from "./../../store/action-creator/auth";
import { AppDispatch, RootState } from "../../store/store";

const Account = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {user , errors , loading} = useSelector((state:RootState) => state.user)

    const [file , setFile] = useState<any>(null);
    const [data , setData] = useState<User>(user!)
    const [success , setSuccess] =useState<boolean>(false)


    const formDate = new FormData()

    const handelFile = (e:any) => {
        if(e.target!.files[0]!){
            setFile(e.target!.files[0]!)
        }
    }

    const handleInput = (e:any) => {
        setData((s) => {return {...data , [e.target.name]:e.target.value}})
    }

    const submit = (e:any) => {
        e.preventDefault();

        formDate.append("username" , data.username!);
        formDate.append("email" , data.email!);
        formDate.append("password" , data.password!);

        if(file) {
            formDate.append("image" , file!)
        }

        dispatch(userUpdate({formDate})).then(() => {
            setSuccess(true)
        })
    

    }

    const close = () => {
        setSuccess(false)
    }

    if(!user){
        return null
    }

    return (
        <div className={`${style.account} mt-5`}>
            <Container>
                <div className={`${style.title} mb-5`}>
                    <h1>Update Your Account</h1>
                </div>
                <Errors errors={errors} />
                {success ? <Success msg="Account has updated successfully" onClick={close} /> : null}
                <div className={`${style.from}`}>
                    <form onSubmit={submit}>
                        <div className="mb-5">
                            <h4 className={`${style.label}`}>Profile Picture</h4>
                            <label className="d-flex align-items-center" htmlFor="profile-picture">
                                <img alt="..." src = {file? URL.createObjectURL(file) :`${SERVER_URL}/uploads/users/${user?.image}`} className={`${style.img}`} />
                                <div className={`${style["file-label"]} me-2 d-flex justify-content-center align-items-center`}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            </label>
                            <input className="d-none" type="file" id="profile-picture" name="image" onChange={handelFile} />
                        </div>
                        <div  className="mb-5">
                            <label className={`${style.label}`}>Username</label>
                            <input onChange={handleInput} name = "username" type="text" className={style.input} value = {data.username} />
                        </div>
                        <div  className="mb-5">
                            <label className={`${style.label}`}>Email</label>
                            <input onChange={handleInput} name = "email" type="email" className={style.input} value = {data.email} />
                        </div>
                        <div className='text-center mt-3'>
                            <Button variant="success" type="submit">
                                {loading? <FontAwesomeIcon className="loading" icon={faSpinner} /> : null}
                                Update
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    )
}

export default Account
