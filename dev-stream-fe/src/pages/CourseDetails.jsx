import { useParams } from "react-router-dom";

const CourseDetails = () => {

    const {id} = useParams();
    return (
        <>
            <h1>CourseDetails Page</h1>
            <h2>Course Id: {id}</h2>
        </>
    )
}

export default CourseDetails;