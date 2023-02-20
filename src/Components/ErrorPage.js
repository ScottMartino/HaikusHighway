import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <h2>404! Page not found</h2>
            <Link to={'/'}>get back to main</Link>
        </div>
    )
}

export default ErrorPage;