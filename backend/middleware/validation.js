const validateCourse = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Course name is required' });
    }
    next();
};

const validateStudent = (req, res, next) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }
    next();
};

module.exports = {
    validateCourse,
    validateStudent
};