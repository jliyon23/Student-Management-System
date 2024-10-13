import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        required: true,
    },
    courseName:{
        type: String,
        required: true,
    },
    departments:[{
        type: String,
        required: false,
    }],
    credits:{
        type: Number,
        required: true,
    },
});

const Course = mongoose.model('course', courseSchema);

export default Course;