import style from "./NavMenu.module.css";
import MenuList from "../menu-list/MenuList";


const NavMenu = ({children} : {children:any}) => {
    return (
        <div className={`${style['nav-menu']}`}>
            <ul className="d-flex justify-content-center align-items-center m-0 p-0">
                {children}
            </ul>
        </div>
    )
}

NavMenu.MenuList = MenuList;

export default NavMenu
