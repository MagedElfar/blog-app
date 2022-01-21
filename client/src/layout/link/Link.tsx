import { Link as RoutLink } from 'react-router-dom';

const MenuList = ({children , route} : {children:any , route:string}) => {
    return (
        <RoutLink to ={route} className='text-center text-uppercase text-decoration-none px-2 josefin-font'>
            {children}
        </RoutLink>
    )
}

export default MenuList
