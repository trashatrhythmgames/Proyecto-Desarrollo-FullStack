const Student = require('../models/Student');

const studentController = {
    getAllStudents: async (req, res) => {
        try {
            const students = await Student.find();
            res.json(students);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createStudent: async (req, res) => {
        try {
            const student = new Student(req.body);
            const newStudent = await student.save();
            res.status(201).json(newStudent);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateStudent: async (req, res) => {
        try {
            const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(student);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteStudent: async (req, res) => {
        try {
            await Student.findByIdAndDelete(req.params.id);
            res.json({ message: 'Student deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = studentController;