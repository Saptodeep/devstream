import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import AddCourseForm from "../components/AddCourseForm";

const Courses = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const coursesData = useLoaderData();
    console.log('coursesData: ', coursesData);

    const selectedCategory = searchParams.get("category");

    console.log('Courses component rendered')
    return (
        <>
            <h1>Courses Page</h1>
            <ul>
                {coursesData.map((course) => {
                    const courseNameForUrl = course.name.toLowerCase();
                    console.log("courseNameForUrl: ", typeof courseNameForUrl);
                    return (
                    <li key={course._id}>
                        <Link to={`/courses/${courseNameForUrl}`}>{course.name}</Link>
                        <p>{course.description}</p>
                    </li>
                    )
                })}
            </ul>
            <h2>Selected category: {selectedCategory}</h2>
            <div>
                <button onClick={() => setSearchParams({ category: "backend" })}>Backend</button>
                <button onClick={() => setSearchParams({ category: "frontend" })}>Frontend</button>
                <button onClick={() => setSearchParams({ category: "database" })}>Database</button>
            </div>
            <div>
                <AddCourseForm />
            </div>
        </>
    )
}

export default Courses;