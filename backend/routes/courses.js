const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { validateCourse } = require('../middleware/validation');
const authenticateToken = require('../middleware/auth');

router.get('/', courseController.getAllCourses);
router.post('/', authenticateToken, validateCourse, courseController.createCourse);
router.put('/:id', authenticateToken, validateCourse, courseController.updateCourse);
router.delete('/:id', authenticateToken, courseController.deleteCourse);

router.post('/', authenticateToken, validateCourse, courseController.createCourse);
router.put('/:id', authenticateToken, validateCourse, courseController.updateCourse);
router.delete('/:id', authenticateToken, courseController.deleteCourse);
module.exports = router;