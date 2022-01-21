import { Navigate , useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

const PraivetRout = ({children } : {children :any}) => {
    const navigate = useNavigate();
    const token = useSelector((state:RootState) => state.auth.token)

    return !token? <Navigate replace to="/login" /> : children;
}

export default PraivetRout;