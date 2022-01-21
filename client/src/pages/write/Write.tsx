import PostForm from "../../components/post-form/PostForm"
import { Container } from "react-bootstrap"
import CategoryFrom from "../../components/category-form/CategoryFrom";
import { motion , AnimatePresence } from "framer-motion";

const componnetMotion = {
    start: {
        x: "100vw"
    },
    end: {
        x: 0,
        transition:{
            delay:0.8,
            duration: 0.8,
        }
    },

    out: {
        x: "-100vw",
        transition:{
            duration: 0.8,
        }
    }
}

const nextVariants = {
    start: {
        y: "200vh"
    },
    end: {
        y: 0,
        transition:{
            delay: 1,
            type: "spring", 
            stiffness :50
        }
    }
}

const Write = () => {
    return (
        <motion.div variants={componnetMotion} initial = "start" animate = "end" exit= "out" className="write-componnet py-5">
            <Container>
                <PostForm title="add post:" />
                <CategoryFrom  />
            </Container>
        </motion.div>
    )
}

export default Write
