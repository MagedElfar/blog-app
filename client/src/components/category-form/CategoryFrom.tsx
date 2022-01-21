import { useState } from 'react';
import FormTitle from '../form-title/FormTitle'
import { useSelector , useDispatch } from 'react-redux';
import style from './CategoryFom.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import { Button } from 'react-bootstrap';
import Errors from '../errors/Errors';
import Success from '../success/Success';
import { AppDispatch, RootState } from '../../store/store';
import { addCategory } from '../../store/action-creator/category';

const CategoryFrom = () => {

    const {isLoading , errors} = useSelector((state:RootState) => state.category)

    const [name , setName] = useState<string>("");
    const [success , setSuccess] =useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>();

    const close = () => {
        setSuccess(false)
    }

    const addCat = (e:any) => {
        e.preventDefault();
        const cat = {name}
        dispatch(addCategory({cat})).unwrap().then(() => {
            setSuccess(true);
            setName("")
        })
    }

    return (
        <div>
            <FormTitle title='add category:' />
            <Errors errors={errors} />
            {success ? <Success msg='Category has added successfully' onClick={close} /> : null}
            <form onSubmit={(e) => addCat(e)}>
                <div className="d-flex align-items-center mb-3">
                    <input value={name} type="text" name="name" placeholder="Category" className={`${style['text-input']}`} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='text-end'>
                    <Button variant="success" type="submit">
                        {isLoading? <FontAwesomeIcon className="loading" icon={faSpinner} /> : null}
                        Add
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default CategoryFrom
