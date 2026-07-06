const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Course name is required"],
        trim: true,
        unique: true,
        minlength: [3, "Course name should contain atleast 3 characters"]
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, "Description cannot exceed 500 characters"]
    }
},{timestamps: true})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;