import { Form, useNavigation } from "react-router-dom";

const AddCourseForm = () => {
    
    const navigation = useNavigation();
    console.log('navigation state: ', navigation.state)
    const isSubmitting = navigation.state === "submitting";
    return (
        <>
            <Form action="/courses" method="post">
                <input type="text" placeholder="Add Course" name="course-name"/>
                <div>
                    <textarea name="course-description" placeholder="Course Description"/>
                </div>
                <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Adding...' : 'Add'}</button>
            </Form>
        </>
    )
}

export default AddCourseForm;