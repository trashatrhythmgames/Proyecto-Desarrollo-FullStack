const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    courses: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);