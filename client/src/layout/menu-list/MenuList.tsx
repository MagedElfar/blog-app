import { Link } from 'react-router-dom';
import style from './MenuList.module.css';

const MenuList = ({children} : {children:any}) => {
    return (
        <li className={style['menu-list']}>
            {children}
        </li>
    )
}

export default MenuList
