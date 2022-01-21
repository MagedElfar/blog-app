import { useState , useEffect , useMemo } from "react";
import { getOnePost } from "../../api/api";
import { useNavigate, useParams , useLocation } from "react-router-dom";
import { useSelector , useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import style from "./PostForm.module.css";
import Select from "react-select";
import FormTitle from "../form-title/FormTitle";
import { User , Post } from "../../model/model";
import { Button } from "react-bootstrap";
import Errors from "../errors/Errors";
import Success from "../success/Success";
import SERVER_URL from "../../model/api-url";
import { getCategories } from "../../store/action-creator/category";
import { AppDispatch, RootState } from "../../store/store";
import { addPost, updatePost } from "../../store/action-creator/post";

const PostForm = ({title} : {title:string}) => {

    const data = new FormData();
    const {slug} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    // get categories for select
    const {category:{categories} , post:{errors , isLoading}} = useSelector((state:RootState) => state);

    const options = useMemo(() => {
        if(categories){
            return categories.map((item:any) => {
                return { value: item?._id , label: item?.name }
            })
        }
    } , [categories])
    
    const [success , setSuccess] =useState<boolean>(false)
    const [photo , setPhoto] = useState<string | null>(null);
    const [id , setId] = useState(null)
    const [file , setFile] = useState<any>(null)
    const [post, setPost] = useState<Post>({
        title: "",
        content:"",
        category: []
    })

    const handelFile = (e:any) => {
        if(e.target!.files[0]!){
            setPhoto(null)
            setFile(e.target!.files[0]!)
        }
    }

    const handelCats = (op:any) => {
        console.log(op)
        setPost((s) => {return {...post , category:op}})
    }

    const handleInput = (e:any) => {
        setPost((s) => {return {...post , [e.target.name]:e.target.value}})
    }

    const submitPost = (e:any) => {
        e.preventDefault();
        let key: keyof Post;
        for(key in post) {
            let value = post[key]
            if(key == "category" ){
                let cat;
                value.length > 0 ? cat = value.map((item:any) => {return item.value}) : cat= []
                data.append(key , JSON.stringify(cat))
            } else {
                data.append(key , value)
            }
        }

        if(file) {
            data.append("image" , file!)
        }

        if(slug){
            dispatch(updatePost({id , data})).unwrap().then((data) => {
                console.log(data);
                navigate(`/post/${data.result.slug}`, {replace: true});
            })
        } else {
            dispatch(addPost(data)).unwrap().then(() => {
                setSuccess(true);
                setPost({
                    title: "",
                    content:"",
                    category: []
                });
                setFile(null)
            })
        }
    }

    const close = () => {
        setSuccess(false)
    }

    useEffect(() => {
        if(slug){
            const get_post = async () => {
                try {
                    const {data:{result}} = await getOnePost(slug);
                    const category = result.category.map((item:any) => {
                        return { value: item?._id , label: item?.name }
                    })
                    setId(result._id)
                    setPost({...post , category , title: result.title , content:result.content})
                    setPhoto(`${SERVER_URL}/uploads/posts/${result?.image}`)
                } catch (error) {
                    console.log(error)
                }
            }
            get_post()
        }
    } , [location])

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])


    return (
        <>
            <FormTitle title={slug ? "Update Post" :title} />
            {photo ? <div className="mb-3"><img className={style["post-image"]} src={photo}/></div> 
            : file && <div className="mb-3"><img className={style["post-image"]} src={URL.createObjectURL(file)} /></div>}
            <Errors errors={errors} />
            {success ? <Success msg="post heas added successfully" onClick={close} /> : null}
            <form onSubmit={(e) => submitPost(e)}>
                <div className="d-flex align-items-center mb-3">
                    <label htmlFor="form-file" className={`${style["file-label"]} me-2 d-flex justify-content-center align-items-center`}>
                        <FontAwesomeIcon icon={faPlus} />
                    </label>
                    <input type="file" id="form-file" name="image" onChange={(e) => handelFile(e)}  />
                    <input value={post.title} type="text" name="title" placeholder="Title" className={`${style['text-input']}`} onChange = {(e) => handleInput(e)} />
                </div>
                <div className="mb-3">
                    <Select 
                        onChange={handelCats}
                        name = "category"
                        closeMenuOnSelect={false}
                        isMulti
                        options={options}
                        value={post.category}
                        //defaultValue={options[0]!}
                        placeholder = "Select category..."
                    />
                </div>
                <div>
                    <textarea name="content" onChange = {(e) => handleInput(e)} value={post.content} placeholder="Tell your story..." className={`${style['text-input']}`}></textarea>
                </div>
                <div className='text-end mt-3'>
                    <Button variant="success" type="submit">
                        {isLoading? <FontAwesomeIcon className="loading" icon={faSpinner} /> : null}
                        {slug ? "Update" : "Publish"}
                    </Button>
                </div>
            </form>
        </>
    )
}

export default PostForm
