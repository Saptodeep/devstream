const express = require('express');
const { getCourses, addCourse, getCourseById, updateCourse, deleteCourse } = require('../controllers/courseController');
const validateObjectId = require('../middlewares/validateObjectId');
const validateCoursePayload = require('../middlewares/validateCoursePayload');

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', validateObjectId, getCourseById);
router.post('/', validateCoursePayload, addCourse);
router.patch('/:id', validateObjectId, validateCoursePayload, updateCourse);
router.delete('/:id', validateObjectId, deleteCourse);

module.exports = router;