import { useRouteError } from "react-router-dom";

const ErrorPage = () => {

    const error = useRouteError();
    console.log("Error: ", error);

    return (
        <>
            <h2>Error : {error.message}</h2>
        </>
    )
}

export default ErrorPage;