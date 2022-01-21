import { useState } from 'react';
import Review from '../reveiw/Review';
import style from "./ReviewForm.module.css";
import { reviewPost } from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ReviewForm = ({id , upadatePost}:{id:string , upadatePost:any}) => {
    const input = [];

    for(let i=1 ; i <= 5 ; i++) {
        input.push(
        <input className={style.input} onChange={(e) => handelChange(e)} key={i} id={`star-${i}`}  type="radio" name="rating" value={i}  />)
    }

    const [isLoading , setLoading] = useState(false)

    const [body , setRate] = useState({
        rating:1 ,
        comment: ""
    });


    const handelChange = (e:any) => {
        setRate({...body , [e.target.name] : e.target.value })
    }

    const handelSubmit = async(e:any) => {
        e.preventDefault();
        setLoading(true)
        const {data:{result}} = await reviewPost(id! , body);
        setRate({
            rating:1 ,
            comment: ""
        });
        setLoading(false)
        upadatePost(result);
    }

    return(
        <div className='mt-3'>
            <form className = "rating-from component" onSubmit={(e) => handelSubmit(e)}>
                <div className="lable-rating mb-3">
                    <Review rate={body.rating} form = {true} />
                </div>
                <div className="input-rating">
                    {input}
                </div>
                <div className="mb-3">
                    <textarea onChange={(e) => handelChange(e)}  name="comment" className="form-control" rows= {3}placeholder="Your Comment" defaultValue={body.comment}></textarea>
                </div>
                <div className="form-submite">
                        <button type="submit" className="p-1 btn btn-primary">
                            {isLoading? <FontAwesomeIcon className="loading" icon={faSpinner} /> : null}
                            Post
                        </button>
                </div>
            </form>
        </div>
    )
}

export default ReviewForm;