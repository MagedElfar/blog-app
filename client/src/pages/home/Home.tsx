import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts";
import {motion} from "framer-motion";
import { RootState } from "../../store/store";

const containerVariant = {
    start: {
       // x: "100vw"
    },
    end: {
        // x: 0,
        // transition:{
        //     delay:0.8,
        //     duration: 0.8,
        // }
    },

    out: {
        // x: "-100vw",
        // transition:{
        //     duration: 0.8,
        // }
    }
}

const postVariant = {
    start: {
        opacity: 0
    },
    end: {
        y: 0,
        opacity: 1,
        transition: {
            opacity: {
                // delay:1.8,
                when: "beforeChildren",
                duration:1
            }
        }
    }
}



const buttonVariant = {
    hover:{
        scale: 1.2,
        transition: {
            duration: 0.8,
            yoyo: 10
        }
    }
}

const Home = () => {
    const {posts} = useSelector((state:RootState) => state.post)
    return (
        <motion.div variants={containerVariant} initial = "start" animate = "end" className="home-page" exit= "out">
            <Header />
            <motion.div variants={postVariant} initial = "start" whileInView = "end" className="mt-5">
                <Posts posts={posts} />
            </motion.div>
            <motion.div variants={buttonVariant} whileHover= "hover"  className="d-flex justify-content-center mt-3">
                <Link className="btn-info p-3 go-post-btn" to = "/posts/?page=1">
                    GO TO POST PAGE
                </Link>
            </motion.div>
        </motion.div>
    )
}

export default Home
