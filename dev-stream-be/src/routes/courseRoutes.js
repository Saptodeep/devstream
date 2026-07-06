const express = require('express');
const { getCourses, addCourse, getCourseById, updateCourse, deleteCourse } = require('../controllers/courseController');
const validateObjectId = require('../middlewares/validateObjectId');
const validateCoursePayload = require('../middlewares/validateCoursePayload');
const authenticateUser = require('../middlewares/authenticateUser');
const authorizeRole = require('../middlewares/authorizeRole');

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', validateObjectId, getCourseById);
router.post('/', authenticateUser, authorizeRole("admin"), validateCoursePayload, addCourse);
router.patch('/:id', authenticateUser, authorizeRole("admin"), validateObjectId, validateCoursePayload, updateCourse);
router.delete('/:id', authenticateUser, authorizeRole("admin"), validateObjectId, deleteCourse);

module.exports = router;