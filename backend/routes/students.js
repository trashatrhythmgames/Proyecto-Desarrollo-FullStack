const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { validateStudent } = require('../middleware/validation');
const authenticateToken = require('../middleware/auth');

router.get('/', studentController.getAllStudents);
router.post('/', authenticateToken, validateStudent, studentController.createStudent);
router.put('/:id', authenticateToken, validateStudent, studentController.updateStudent);
router.delete('/:id', authenticateToken, studentController.deleteStudent);

module.exports = router;