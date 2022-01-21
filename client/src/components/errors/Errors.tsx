import style from "./Errors.module.css";
import { Alert } from "react-bootstrap";

const Errors = ({errors} : {errors:[]}) => {
    return (
        <div className={style.errors}>
            {errors.map((e , i) => {
                return(
                    <Alert key={i} variant="danger" className="p-2">
                        {e}
                    </Alert>
                )
            })}
        </div>
    )
}

export default Errors
