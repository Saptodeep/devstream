const Course = require("../models/Course");

const getCourses = async (req, res) => {
    // const coursesData = [
    //     { id: 1, name: "NodeJS" },
    //     { id: 2, name: "Java" },
    //     { id: 3, name: "React" },
    //     { id: 4, name: "MongoDB" }
    // ]
    // res.json(coursesData);

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search?.trim();
    const category = req.query.category?.trim();

    const filter = {};

    if(search){
        filter.name = {
            $regex: search,
            $options: "i"  //case-insensitive
        }
    }

    if(category){
        filter.category = category.toLowerCase();
    }

    console.log("Page, limit, skip: ", page, limit, skip);
    try {
        
        const [totalCourses, courses] = await Promise.all([
            Course.countDocuments(filter),
            Course.find(filter)
                .sort({createdAt: -1})
                .skip(skip)
                .limit(limit)
        ]);

        const totalPages = Math.ceil(totalCourses / limit);

        const response = {
            courses,
            pagination: {
                currentPage: page,
                limit,
                totalCourses,
                totalPages
            }
        }
        return res.status(200).json(response);
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
    const { name, description, category } = req.body;
    try {
        //Save the added course to MongoDB
        const course = await Course.create({
            name,
            description,
            category
        })
        return res.status(201).json({ message: "Course created successfully", course })
    } catch (error) {
        if (error.code === 11000) { //MongoDB duplicate-key error code is: 11000
            return res.status(409).json({ error: "Course already exists" })
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message })
        }
        console.log("add course error: ", {
            errorName: error.name,
            errorMessage: error.message
        }
        );
        return res.status(500).json({ error: "Internal Server error" })
    }
}

const updateCourse = async (req, res) => {
    const courseId = req.params?.id;
    const { name, description, category } = req.body;
    try {
        const course = await Course.findByIdAndUpdate(
            courseId,
            { name, description, category },
            {
                new: true,
                runValidators: true
            } //new: true - this returns document after update //runValidators: true - this runs the schema validations
        );
        if (!course) return res.status(404).json({ error: "No course found" })
        return res.status(200).json({ message: `Course with id:${courseId} updated`, course })

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message })
        }
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