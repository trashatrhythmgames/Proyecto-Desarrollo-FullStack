const Student = require('../models/Student');

const studentController = {
    getAllStudents: async (req, res) => {
        try {
            const students = await Student.find();
            res.json(students);
        } catch (error) {
            console.error('Error getting students:', error);
            res.status(500).json({ message: 'Error getting students', error: error.message });
        }
    },

    createStudent: async (req, res) => {
        try {
            const { name, email } = req.body;

            const existingStudent = await Student.findOne({ email });
            if (existingStudent) {
                return res.status(400).json({ message: 'Student already exists' });
            }

            const newStudent = new Student({ name, email });
            await newStudent.save();
            res.status(201).json({ message: 'Student created successfully', student: newStudent });
        } catch (error) {
            console.error('Error creating student:', error);
            res.status(500).json({ message: 'Error creating student', error: error.message });
        }
    },

    updateStudent: async (req, res) => {
        try {
            const { name, email } = req.body; // Remove 'courses' here
            const studentId = req.params.id;

            const existingStudent = await Student.findOne({ email });
            if (existingStudent && existingStudent._id.toString() !== studentId.toString()) {
                return res.status(400).json({ message: 'Student already exists' });
            }

            const student = await Student.findByIdAndUpdate(
                studentId,
                { name, email }, // Remove 'courses' here
                { new: true }
            );

            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }

            res.status(200).json({ message: 'Student updated successfully', student });
        } catch (error) {
            console.error('Error updating student:', error);
            res.status(500).json({ message: 'Error updating student', error: error.message });
        }
    },

    deleteStudent: async (req, res) => {
        try {
            const studentId = req.params.id;

            const student = await Student.findById(studentId);
            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }

            await Student.findByIdAndDelete(studentId);
            res.status(200).json({ message: 'Student deleted successfully' });
        } catch (error) {
            console.error('Error deleting student:', error);
            res.status(500).json({ message: 'Error deleting student', error: error.message });
        }
    }
};

module.exports = studentController;
