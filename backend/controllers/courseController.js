//c:\Users\Home\proyecto\backend\controllers\courseController.js
const Course = require('../models/Course');

const courseController = {
    getAllCourses: async (req, res) => {
        try {
            const courses = await Course.find();
            res.json(courses);
        } catch (error) {
            console.error('Error getting courses:', error);
            res.status(500).json({ message: 'Error getting courses', error: error.message });
        }
    },

    createCourse: async (req, res) => {
        try {
            const { name, students, status } = req.body; //added students and status

            const existingCourse = await Course.findOne({ name });
            if (existingCourse) {
                return res.status(400).json({ message: 'Course already exists' });
            }

            const newCourse = new Course({ name, students, status });//added students and status

            await newCourse.save();
            res.status(201).json({ message: 'Course created successfully', course: newCourse });
        } catch (error) {
            console.error('Error creating course:', error);
            res.status(500).json({ message: 'Error creating course', error: error.message });
        }
    },

    updateCourse: async (req, res) => {
        try {
            const { name, students, status } = req.body;
            const courseId = req.params.id;

            const existingCourse = await Course.findOne({ name });
            if (existingCourse && existingCourse._id.toString() !== courseId.toString()) {
                return res.status(400).json({ message: 'Course already exists' });
            }

            const course = await Course.findByIdAndUpdate(
                courseId,
                { name, students, status },
                { new: true }
            );

            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }

            res.status(200).json({ message: 'Course updated successfully', course });
        } catch (error) {
            console.error('Error updating course:', error);
            res.status(500).json({ message: 'Error updating course', error: error.message });
        }
    },

    deleteCourse: async (req, res) => {
        try {
            const courseId = req.params.id;

            const course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json({ message: 'Course not found' });
            }

            await Course.findByIdAndDelete(courseId);
            res.status(200).json({ message: 'Course deleted successfully' });
        } catch (error) {
            console.error('Error deleting course:', error);
            res.status(500).json({ message: 'Error deleting course', error: error.message });
        }
    }
};

module.exports = courseController;
