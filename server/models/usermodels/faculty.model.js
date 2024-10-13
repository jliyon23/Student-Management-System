import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  facultyId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  phone: {
    type: Number,
    required: true
  },
  courses: {
    type: [String], // array of course codes
    required: false,
  },
  role: {
    type: String,
    default: "faculty",
  },
  address: {
    type: String,
    required: true,
  },
});

const Faculty = mongoose.model("faculty", facultySchema);

export default Faculty;
