import style from "./Card.module.css"
import { Post } from "./../../model/model";
import SERVER_URL from "./../../model/api-url";
import moment from "moment";
import { Link } from "react-router-dom";

const Card = ({post} : {post:Post}) => {
    const {image , createdAt:date , title , slug , content} = post;

    return (
        <article className = {`${style["post-card-componnet"]} p-3`} >
            <div className={`${style["card-image"]}`} style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)) , url(${SERVER_URL}/uploads/posts/${image})`}}>
            </div>
            <div className={`${style["card-content"]}`}>
                <div className={`${style["title"]} pt-3`}>
                    <Link to={`/post/${slug}`} className="text-capitalize text-decoration-none fw-bold" >{title}</Link>
                </div>
                <div className={`${style["date"]} text-center py-2`}>{moment(date).format('LL')}</div>
                <div className={`${style["content"]}`}>
                    <p className="mb-0">
                        {content}
                    </p>
                </div>
            </div>
        </article>
    )
}

export default Card
