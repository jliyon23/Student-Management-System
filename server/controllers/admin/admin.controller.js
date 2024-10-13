import Faculty from "../../models/usermodels/faculty.model.js";
import Student from "../../models/usermodels/student.model.js";
import Department from "../../models/department.model.js";
import bcrypt from "bcrypt";
import {
  generateStudentId,
  generateFacultyId,
  generateCourseCode,
} from "../../utils/generate.id.js";
import { generateDepartmentId } from "../../utils/generate.id.js";
import Course from "../../models/course.model.js";

export const registerFaculty = async (req, res) => {
  const faculty = req.body; 

  try {
    const { name, email, gender, dob, phone, address, department } = faculty;

    const facultyId = await generateFacultyId();
    const password = facultyId; 

    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      return res.status(400).json({
        status: "error",
        message: "Email is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newFaculty = await Faculty.create({
      facultyId,
      name,
      email,
      password: hashedPassword,
      gender,
      dob,
      phone,
      address,
      department,
    });

    return res.status(201).json({
      status: "success",
      message: "Faculty registered successfully",
      data: {
        name: newFaculty.name,
        email: newFaculty.email,
        facultyId: newFaculty.facultyId,
        department: newFaculty.department,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const registerStudent = async (req, res) => {
  try {
    const { name, email, gender, dob, department, phone, address } = req.body;

    const studentId = await generateStudentId();
    const password = studentId;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .json({ status: "error", message: "Student already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = await Student.create({
      studentId,
      name,
      email,
      password: hashedPassword,
      gender,
      dob,
      department,
      phone,
      address,
    });

    return res.status(201).json({
      status: "success",
      message: "Registration successful",
      data: { name: newStudent.name, email: newStudent.email },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const addDepartment = async (req, res) => {
  const { departmentName } = req.body;
  const departmentNo = await generateDepartmentId();

  try {
    const existingDpt = await Department.findOne({ departmentName });
    if (existingDpt) {
      return res
        .status(400)
        .json({ status: "error", message: "Department already exists" });
    }

    const newDepartment = await Department.create({
      departmentNo,
      departmentName,
    });

    return res.status(201).json({
      status: "success",
      message: "Department created successfully",
      data: { departmentName: newDepartment.departmentName },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const addCourse = async (req, res) => {
  const { courseName, departments, credits } = req.body;

  try {
    const courseCode = await generateCourseCode();
    const newCourse = await Course.create({
      courseCode,
      courseName,
      departments,
      credits,
    });

    return res.status(201).json({
      status: "success",
      message: "Course created successfully",
      data: { courseName: newCourse.courseName },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const assignFacultyToDepartment = async (req, res) => {
  const { departmentNo, facultyId } = req.body;

  try {
    const faculty = await Faculty.findOne({ facultyId });
    if (!faculty) {
      return res
        .status(404)
        .json({ status: "error", message: "Faculty not found" });
    }

    faculty.department = departmentNo;
    await faculty.save();

    const department = await Department.findOne({ departmentNo });
    department.faculties.push(facultyId);
    await department.save();

    return res.status(200).json({
      status: "success",
      message: "Department assigned successfully",
      data: { facultyId, department },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const assignCourseToDepartment = async (req, res) => {
  const { courseCode, departmentNo } = req.body;

  try {
    const course = await Course.findOne({ courseCode });
    if (!course) {
      return res
        .status(404)
        .json({ status: "error", message: "Course not found" });
    }

    course.departments.push(departmentNo);
    await course.save();

    const department = await Department.findOne({ departmentNo });
    department.courses.push(courseCode);
    await department.save();

    return res.status(200).json({
      status: "success",
      message: "Course assigned successfully",
      data: { courseCode, department },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const assignStudentToDepartment = async (req, res) => {
  const { studentId, departmentNo } = req.body;

  try {
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res
        .status(404)
        .json({ status: "error", message: "Student not found" });
    }

    student.department = departmentNo;
    await student.save();

    const department = await Department.findOne({ departmentNo });
    department.students.push(studentId);
    await department.save();

    return res.status(200).json({
      status: "success",
      message: "Student assigned successfully",
      data: { studentId, department },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const assignFacultyToHead = async (req, res) => {
  const { departmentNo, facultyId } = req.body;

  try {
    const faculty = await Faculty.findOne({ facultyId });
    if (!faculty) {
      return res
        .status(404)
        .json({ status: "error", message: "Faculty not found" });
    }

    faculty.department = departmentNo;
    await faculty.save();

    const department = await Department.findOne({ departmentNo });
    department.departmentHead = facultyId;
    await department.save();

    return res.status(200).json({
      status: "success",
      message: "Department head assigned successfully",
      data: { facultyId, department },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const assignFacultyToCourse = async (req, res) => {
  const { facultyId, courseCode } = req.body;

  try {
    const faculty = await Faculty.findOne({
      facultyId,
    });

    if (!faculty) {
      return res
        .status(404)
        .json({ status: "error", message: "Faculty not found" });
    }

    faculty.courses.push(courseCode);
    await faculty.save();

    const course = await Course.findOne({ courseCode });

    course.faculties.push(facultyId);
    await course.save();

    return res.status(200).json({
      status: "success",
      message: "Faculty assigned to course successfully",
      data: { facultyId, courseCode },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};


