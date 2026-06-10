const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Course name is required"],
        trim: true,
        unique: true,
        minLength: [3, "Course name should contain atleast 3 characters"]
    }
},{timestamps: true})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;