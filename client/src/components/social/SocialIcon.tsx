import style from "./SocialIcon.module.css";

const SocialIcon = ({children} : {children:any}) => {
    return (
        <div className={`${style['icon-container']} px-1`}>
            {children}
        </div>
    )
}

export default SocialIcon
