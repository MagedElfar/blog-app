import { Link , useLocation } from 'react-router-dom';

const Pagination = ({count }: {count:number}) => {
    const {pathname , search} = useLocation();

    let query;

    const page = +search.split("&")[0].split("=")[1]

    if(search.includes("&")){
        query = search.split("&")[1];
    }

    const li = [];
    for(let i = 1 ; i <= count ; i++){
        li.push(
            <li key={i} className="page-item">
                <Link className="page-link" to={`${pathname}?page=${i}${query? `&${query}` : ""}`}>{i}</Link>
            </li>
        )
    }
    return(
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {page > 1 ? <li className="page-item"><Link className="page-link" to={`${pathname}?page=${page-1}${query? `&${query}` : ""}`}>Previous</Link></li> : null}
                {li}
                {page < count || !page ? <li className="page-item"><Link className="page-link" to={`${pathname}?page=${page+1}${query? `&${query}` : ""}`}>Next</Link></li> : null}
            </ul> 
        </nav>
    )
}

export default Pagination;