const Student = require('../models/Student');

const getAllStudents = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = '' } = req.query;
    let parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);

    // Ensure that the parsedPage is not less than 1
    if (parsedPage < 1){
      parsedPage = 1;
    }
    
    const skip = (parsedPage - 1) * parsedLimit;

    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } }, // Case-insensitive search
            { email: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const students = await Student.find(filter).skip(skip).limit(parsedLimit);

    // Calculate the total number of students that match the filter
    const totalStudents = await Student.countDocuments(filter);

    res.json({
      students: students,
      total: totalStudents,
      currentPage: parsedPage,
      totalPages: Math.ceil(totalStudents / parsedLimit)
    });
  } catch (error) {
    console.error('Error getting students:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(updatedStudent);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};
