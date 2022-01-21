import React from "react";
import style from './SideBar.module.css';
import { useSelector } from 'react-redux';
import img from "./../../assets/images/blog-img.jpg";
import {Link} from "react-router-dom"
import SERVER_URL from '../../model/api-url';
import { Post } from '../../model/model';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookSquare , faTwitterSquare , faInstagramSquare} from "@fortawesome/free-brands-svg-icons";
import SocialIcon from '../social/SocialIcon';
import { RootState } from "../../store/store";

const SideBar = () => {

const {posts}  = useSelector((state:RootState) => state.post);

   const last = [];
    
    if(posts && posts.length > 0){
        for(let i = 0 ; i <=1 ; i++){
            last.push(
                <div key={posts[i]._id} className={`${style.post}`}>
                    <Link to={`/post/${posts[i].slug}`}>
                        <img alt = "..." src={`${SERVER_URL}/uploads/posts/${posts[i]?.image!}`} />
                    </Link>
                </div>
            )
        }
    }

    return (
        <div className={`${style['side-bar']} py-3 px-2`}>
            <div>
                <h5 className={style.heading}>ABOUT</h5>
                <div className={`${style.img}`}>
                    <img alt='...' src={img} />
                </div>
                <p className='mb-0 pt-3'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                </p>
            </div>
            <div className='pt-3'>
                <h5 className={style.heading}>LAST POSTS</h5>
                <div className={`d-flex pt-3`}>
                    {last.length > 0 ? last : "Loading..."}
                </div>
            </div>
            <div className='pt-3'>
                <h5 className={style.heading}>FOLLOW US</h5>
                <div className={`d-flex pt-3 justify-content-center align-items-center`}>
                    <SocialIcon>
                        <FontAwesomeIcon icon={faFacebookSquare}/>
                    </SocialIcon>
                    <SocialIcon>
                        <FontAwesomeIcon icon={faTwitterSquare}/>
                    </SocialIcon>
                    <SocialIcon>
                        <FontAwesomeIcon icon={faInstagramSquare}/>
                    </SocialIcon>
                </div>
            </div>
        </div>
    )
}

export default React.memo(SideBar)
