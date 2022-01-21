import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "react-bootstrap"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

const Success = ({msg , onClick} : {msg:string , onClick:any}) => {
    return (
        <div>
            <Alert variant="success" className="d-flex justify-content-between align-items-center">
                <div>
                    {msg}
                </div>
                <FontAwesomeIcon icon={faTimes} style={{cursor:"pointer"}} onClick={onClick}/>
            </Alert>
        </div>
    )
}

export default Success
