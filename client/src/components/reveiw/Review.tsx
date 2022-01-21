import {SFC} from "react";
import { faStar as starSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Review.module.css";

interface Props {
    rate:number , 
    form:boolean , 
    reviews?:number
}

const Review:SFC<Props> = ({rate , form , reviews}) => {
    const list:any = [];

    if(form) {
        for(let i = 1 ; i<= 5 ; i++){
            if(rate >= i){
                list.push(<label className="d-flex align-items-center" key = {i} htmlFor={`star-${i}`}>
                    <FontAwesomeIcon icon = {starSolid} />
                </label>)
            } else{
                list.push(<label className="d-flex align-items-center"  key = {i} htmlFor={`star-${i}`}>
                    <FontAwesomeIcon icon={faStar} />
                </label>)
            }
        }    
    } else {
        for(let i = 1 ; i<= 5 ; i++){
            if(rate >= i){
                list.push(<div className="d-flex align-items-center"  key = {i}>
                    <FontAwesomeIcon icon = {starSolid} />
                </div>)
            } else{
                list.push(<div className="d-flex align-items-center"  key = {i}>
                    <FontAwesomeIcon icon={faStar} />
                </div>)
            }
        }    
    }

    return (
        <div className={`d-flex ${style.review}`}>
            {list} {!form ? <div className="d-flex">
                <span className="px-2 d-flex align-items-center">{rate} of 5</span> 
                <span className="d-flex align-items-center">{
                reviews? 
                `- reviews: ${reviews}`
                : `- reviews: 0`
                }</span> 
            </div>
            :  null}
        </div>
    )
}

export default Review
