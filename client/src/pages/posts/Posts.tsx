import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPosts } from "../../api/api";
import Pagination from "../../components/pagination/Pagination";
import ShpwPosts from "../../components/posts/Posts";
import { motion } from "framer-motion";

const Posts = () => {
    const location = useLocation()
    const [posts , setPosts] = useState(null);
    const [count , setCount] = useState(0)
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const {data:{result , count}} = await getPosts(location.search)
                setPosts(result)
                setCount(count)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPosts()
    } , [location])
    return (
        <div>
            <motion.div animate={{ x: 100 }}/>
            {posts ? 
                <div>
                    <div className="mt-5">
                    <ShpwPosts posts={posts} />
                    </div>
                    <div className="d-flex justify-content-center">
                        <Pagination count={count} />
                    </div>
                </div>
            :
                "Loading..."
            }
        </div>
    )
}

export default Posts
