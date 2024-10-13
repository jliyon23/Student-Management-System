import Student from "../models/usermodels/student.model.js";
import Faculty from "../models/usermodels/faculty.model.js";
import Department from "../models/department.model.js";
import Course from "../models/course.model.js";

export const generateStudentId = async () => {
  const currentYear = new Date().getFullYear();
  const lastStudent = await Student.findOne().sort({ studentId: -1 });

  let lastIdNumber = 0;
  if (lastStudent) {
    const lastIdParts = lastStudent.studentId.split("-");
    lastIdNumber = parseInt(lastIdParts[2], 10);
  }

  const newIdNumber = lastIdNumber + 1;
  const studentId = `ST-${currentYear}-${String(newIdNumber).padStart(3, "0")}`;

  return studentId;
};

export const generateFacultyId = async () => {
  const currentYear = new Date().getFullYear();
  const lastFaculty = await Faculty.findOne().sort({ facultyId: -1 });

  let lastIdNumber = 0;
  if (lastFaculty) {
    const lastIdParts = lastFaculty.facultyId.split("-");
    lastIdNumber = parseInt(lastIdParts[2], 10);
  }

  const newIdNumber = lastIdNumber + 1;
  const facultyId = `FA-${currentYear}-${String(newIdNumber).padStart(3, "0")}`;

  return facultyId;
};

export const generateDepartmentId = async () => {
  const lastDpt = await Department.findOne().sort({ departmentNo: -1 });

  let lastDptNo = 0;
  if (lastDpt) {
    const lastIdParts = lastDpt.departmentNo.split("-");
    lastDptNo = parseInt(lastIdParts[1], 10);
  }

  const newDptNo = lastDptNo + 1;
  const dptNo = `D-${String(newDptNo).padStart(3, '0')}`;

  return dptNo;
};

export const generateCourseCode = async () => {
  const lastCourse = await Course.findOne({ courseCode: /^CS/ })
    .sort({ courseCode: -1 });

  let lastCourseNo = 0;
  if (lastCourse) {
    const lastCodeParts = lastCourse.courseCode.slice(2); 
    lastCourseNo = parseInt(lastCodeParts, 10);
  }

  const newCourseNo = lastCourseNo + 1;
  const courseCode = `CS${String(newCourseNo).padStart(3, '0')}`;

  return courseCode;
};

