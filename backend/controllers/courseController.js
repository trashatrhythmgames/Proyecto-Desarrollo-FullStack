const Course = require('../models/Course');

const getAllCourses = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = '' } = req.query;
    let parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    if (parsedPage < 1){
      parsedPage = 1;
    }

    const skip = (parsedPage - 1) * parsedLimit;

    const filter = search ? { name: { $regex: search, $options: 'i' } } : {};

    const courses = await Course.find(filter).skip(skip).limit(parsedLimit);

    const totalCourses = await Course.countDocuments(filter);

    res.json({
      courses: courses,
      total: totalCourses,
      currentPage: parsedPage,
      totalPages: Math.ceil(totalCourses / parsedLimit)
    });
  } catch (error) {
    console.error('Error getting courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(updatedCourse);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
};
