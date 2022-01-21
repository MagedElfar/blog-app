import Errors from "../errors/Errors";
import style from "./auth.module.css";

const Auth = ({children , bg , title , errors} : {children:any , bg:string , title:string , errors:[]}) => {
    return (
        <div className={`${style["auth-componnet"]} d-flex justify-content-center align-items-center`} style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)) , url(${bg})`}}>
            <div className={`${style["auth-form"]} flex-column d-flex justify-content-center align-items-center`}>
                <div className={style["auth-title"]}>
                    <h1 className="text-center text-capitalize">{title}</h1>
                </div>
                <Errors errors={errors} />
                <div className={style.form}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Auth
