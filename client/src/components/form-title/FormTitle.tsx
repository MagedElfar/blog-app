import style from "./FormTitle.module.css"

const FormTitle = ({title} : {title:string}) => {
    return (
        <div>
            <h1 className={`${style.title} text-capitalize mb-4`}>{title}</h1>
        </div>
    )
}

export default FormTitle
