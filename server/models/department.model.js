import mongoose from "mongoose";

const department = new mongoose.Schema({
  departmentName: {
    type: String,
    required: true,
  },
  departmentNo: {
    type: String,
    required: true,
  },
  departmentHead: {
    type: String, // facultyId of the department head
    required: false,
  },
  courses: {
    type: [String], // array of course codes
    required: false,
  },
  faculties: {
    type: [String], // array of facultyIds
    required: false,
  },
  students: {
    type: [String], // array of studentIds
    required: false,
  },
});

const Department = mongoose.model("department", department);

export default Department;
