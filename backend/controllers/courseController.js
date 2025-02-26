const Course = require('../models/Course');

const courseController = {
    getAllCourses: async (req, res) => {
        try {
            const courses = await Course.find();
            res.json(courses);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createCourse: async (req, res) => {
        try {
            const course = new Course(req.body);
            const newCourse = await course.save();
            res.status(201).json(newCourse);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    updateCourse: async (req, res) => {
        try {
            const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(course);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    deleteCourse: async (req, res) => {
        try {
            await Course.findByIdAndDelete(req.params.id);
            res.json({ message: 'Course deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

exports.createCourse = async (req, res) => {
    try {
      const { name, students, status } = req.body;
      const newCourse = new Course({ name, students, status });
      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  exports.updateCourse = async (req, res) => {
    try {
      const { name, students, status } = req.body;
      const course = await Course.findByIdAndUpdate(
        req.params.id,
        { name, students, status },
        { new: true }
      );
      res.json(course);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  exports.deleteCourse = async (req, res) => {
    try {
      await Course.findByIdAndDelete(req.params.id);
      res.json({ message: 'Course deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
module.exports = courseController;