import style from "./Comment.module.css";
import {Reviews} from "./../../model/model"
import Review from "../reveiw/Review";
import moment from "moment";

const Comment = ({data} : {data:Reviews}) => {
    const {user:{username} , comment , date , rating} = data
    if(!comment){
        return null
    }
    return (
        <div className= "mt-2">
            <div className="py-1">
                {username}
            </div>
            <div className="d-flex align-items-center py-1">
                <div className={`${style.rate}`}>
                    <Review rate={rating!} form = {false}/>
                </div>
                <div className="ps-1">
                    - {moment(date).fromNow()}
                </div>
            </div>
            <div className="py-1">
                {comment}
            </div>
        </div>
    )
}

export default Comment
