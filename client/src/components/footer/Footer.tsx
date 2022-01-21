import style from "./Footer.module.css";
import { useLocation } from "react-router-dom";

const Footer = () => {

    const location = useLocation();

    if(location.pathname.toLowerCase() === "/login" || location.pathname.toLowerCase() == "/singup"){
        return null
    }

    return (
        <footer className={`${style.footer} mt-5 py-3`}>
            <div className="text-center">
                Footer
            </div>
        </footer>
    )
}

export default Footer
