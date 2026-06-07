import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    const handleRedirectToHomepage = () => {
        navigate('/');
    }

    return (
        <>
            <h1>Page Not Found</h1>
            <h2>404</h2>
            <Link to={"/"}>Go To Home</Link>
            {/* <button onClick={handleRedirectToHomepage}>Go Home</button> */}
        </>
    )
}

export default NotFound;