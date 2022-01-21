import { Link } from 'react-router-dom';
import style from './NotFoundPage.module.css'

const NotFoundPage = () => {
    return (
        <div className={`not-found-page py-5 ${style.page}`}>
            <div className={`${style.container} p-5`}>
                <h2>Page Not Found</h2>
                <p>
                    Looks like you’ve followed a broken link or entered a URL that doesn’t exist on this site
                </p>
                <Link to = "/">Back to our site</Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
