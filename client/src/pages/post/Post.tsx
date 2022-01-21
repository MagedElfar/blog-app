import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOnePost } from "../../api/api";
import style from "./Post.module.css";
import { Link, useParams } from "react-router-dom";
import {Post as PostInterface , User} from "../../model/model";
import SERVER_URL from "../../model/api-url";
import { Container , Row , Col } from "react-bootstrap";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faComment, faEdit , faTrash} from "@fortawesome/free-solid-svg-icons";
import SideBar from "../../components/side-bar/SideBar";
import Review from "../../components/reveiw/Review";
import ReviewForm from "../../components/review-form/ReviewForm";
import Comment from "../../components/comments/Comment";
import { deletePost } from "../../store/action-creator/post";
import { AppDispatch } from "../../store/store";

const Post = () => {
    const {slug} = useParams();
    const [post , setPost] = useState<PostInterface | null>(null);
    const ele:any = useRef()


    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const removePost = (id:string) => {
        dispatch(deletePost(id)).unwrap().then(() => {
            navigate("/" , {replace:true})
        }).catch((err) => {
            alert(err?.response?.data?.message || err.message)
        })
    }

    useEffect(() => {
        const get_post = async () => {
            try {
                const {data:{result}} = await getOnePost(slug!);
                setPost(result)
                ele.current.innerHTML = result.content
            } catch (error) {
                console.log(error)
            }
        }
        get_post()
    } , [slug])


    const updatePost = (post:PostInterface) => {
        setPost(post)
    }

    if(post) {
        const {_id , author : {username , slug:autSlug}, createdAt:data , category , image , title , content , reviews , rating}= post;
        return(
            <div className={`${style["single-post-componnet"]} py-5 single-post-page`} >
                <Container>
                    <Row>
                        <Col lg = {9} >
                            <div className={`${style["post-img"]}`}>
                                <div className={style.overlay}></div>
                                <img alt="..." src={`${SERVER_URL}/uploads/posts/${image}`} />
                            </div>
                            <div className={`${style["post-setting"]} d-flex justify-content-between py-3`}>
                                <div>
                                    <Review rate={rating!} form ={false} reviews={reviews?.length!} />
                                </div>
                                <div className="d-flex">
                                    <div title="edite" className={`${style.edit} pe-2`}>
                                        <Link to = {`/write/${slug}`}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Link>
                                    </div>
                                    <div onClick={() => removePost(_id!)} title="delete" className={style.delete}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </div>
                                </div>
                            </div>
                            <div className={`${style.title}`}>
                                <h1 className="text-center text-capitalize">{title}</h1>
                            </div>
                            <div className={`${style["post-info"]} d-flex justify-content-between`}>
                                <div className={style.author}>
                                    Author:<Link className="text-decoration-none" to = {`/posts/?page=1&author=${autSlug}`}> {username}</Link>
                                </div>
                                <div className={style.data}>
                                    {moment(data).fromNow()}
                                </div>
                            </div>
                            <div ref={ele}  className={`${style.contnet} pt-3`}>
                                {content}
                            </div>
                            <div className={`${style.category} d-flex pt-3`}>
                                <div>Categories:</div>
                                <div className={`d-flex`}>
                                    {
                                        category.map((item:any) => {
                                            return(
                                                <Link className="text-decoration-none px-2" key={item._id} to = {`/posts/?page=1&cat=${item.slug}`}>{item.name}</Link>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </Col>
                        <Col lg = {3}>
                            <div className={style["side-bar"]}>
                                <SideBar />
                            </div>
                        </Col>
                    </Row>
                    <div className={`${style.review} mt-5`}>
                        <div className="d-flex align-items-center">
                            <FontAwesomeIcon icon = {faComment} />
                            <h4 className="ps-2">Review</h4>
                        </div>
                        <ReviewForm id={_id!} upadatePost = {updatePost}/>
                        <div className="mt-5">
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon = {faComment} />
                                <h4 className="ps-2">Comments</h4>
                            </div>
                            {
                                post.reviews?.map((item , index) => {
                                    return(
                                        <div key = {index}> 
                                            <Comment data = {item} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div>
            Loading...        
        </div>
    )
}

export default Post
