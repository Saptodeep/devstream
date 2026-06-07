const Course = require("../models/Course");

const getCourses = async (req, res) => {
    // const coursesData = [
    //     { id: 1, name: "NodeJS" },
    //     { id: 2, name: "Java" },
    //     { id: 3, name: "React" },
    //     { id: 4, name: "MongoDB" }
    // ]
    // res.json(coursesData);
    try {
        const courses = await Course.find();
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

const getCourseById = async (req, res) => {
    console.log('Req params: ', req.params);
    const id = req.params?.id;
    try {
        const course = await Course.findById(id);
        if (!course) return res.status(404).json({ error: "Course not found" });
        return res.status(200).json({ course })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

const addCourse = async (req, res) => {
    console.log("Course added req: ", req.body);
    const name = req.body?.name;
    try {
        //Save the added course to MongoDB
        const course = await Course.create({
            name
        })
        return res.status(201).json({ message: "Course created successfully", course })
    } catch (error) {
        if(error.code === 11000){ //MongoDB duplicate-key error code is: 11000
            return res.status(409).json({error: "Course already exists"})
        }
        return res.status(500).json({ error: "Internal Server error" })
    }
}

const updateCourse = async (req, res) => {
    const courseId = req.params?.id;
    const name = req.body?.name;
    try {
        const course = await Course.findByIdAndUpdate(
            courseId,
            { name },
            { new: true } //this returns document after update
        );
        if (!course) return res.status(404).json({ error: "No course found" })
        return res.status(200).json({ message: `Course with id:${courseId} updated`, course })

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

const deleteCourse = async (req, res) => {
    const courseId = req.params?.id;
    try {
        const course = await Course.findByIdAndDelete(courseId);
        if (!course) return res.status(404).json({ error: "No course found" });
        return res.status(200).json({ message: `Course with id:${courseId} deleted successfully` })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {
    getCourses,
    getCourseById,
    addCourse,
    updateCourse,
    deleteCourse
}