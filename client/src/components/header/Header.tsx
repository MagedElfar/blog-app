import style from "./Header.module.css";
import BG from "./../../assets/images/wp2833451.jpg";
import { motion } from "framer-motion";

const containerVariant = {
    start: {
        y: "-100vh"
    },
    end: {
        y: 0,
        transition: {
           // delay:1.8,
            when: "beforeChildren",
            type: "spring",
            stiffness: 100
        }
    }
}

const titleVariant = {
    start: {
        fontSize: "0px"
    },
    end: {
        fontSize: "100px",
        transition: {
            duration: 0.6 , 
            type: "tween"
        }
    }
}

const Header = () => {
    return (
        <motion.header variants={containerVariant} initial = "start" animate = "end" style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)) , url(${BG})`}} className = {style.header}
        >
            <div className={style["header-title"]}>
                <motion.h1 drag variants={titleVariant} className="text-capitalize d-flex align-items-center justify-content-center lora-font fw-normal">
                    blog
                </motion.h1>
            </div>
        </motion.header>
    )
}

export default Header
