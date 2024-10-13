import Course from "../../models/course.model.js";
import Department from "../../models/department.model.js";
import Faculty from "../../models/usermodels/faculty.model.js";
import Student from "../../models/usermodels/student.model.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    return res.status(200).json({
      status: "success",
      message: "Students fetched successfully",
      data: students,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const getStudentDetails = async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res
        .status(404)
        .json({ status: "error", message: "Student not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Student fetched successfully",
      data: student,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    // departments with number of students and faculties
    const departmentsWithStudents = await Promise.all(
      departments.map(async (department) => {
        const students = await Student.find({
          department: department.departmentNo,
        });
        const faculties = await Faculty.find({
          department: department.departmentNo,
        });
        return {
          ...department._doc,
          students: students.length,
          faculties: faculties.length,
        };
      })
    );
    //fetch name of department head
    const departmentsWithHead = await Promise.all(
      departmentsWithStudents.map(async (department) => {
        if (department.departmentHead) {
          const head = await Faculty.findOne({
            facultyId: department.departmentHead,
          });
          return { ...department, departmentHead: head.name };
        }
        return department;
      })
    );

    return res.status(200).json({
      status: "success",
      message: "Departments fetched successfully",
      data: departmentsWithHead,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const getDepartmentDetails = async (req, res) => {
  const { departmentNo } = req.params;

  try {
    const department = await Department.findOne({ departmentNo });
    if (!department) {
      return res
        .status(404)
        .json({ status: "error", message: "Department not found" });
    }
    // add students, courses and faculties to department
    const students = await Student.find({ department: departmentNo });
    const faculties = await Faculty.find({ department: departmentNo });
    const courses = await Course.find({ departments: departmentNo });

    return res.status(200).json({
      status: "success",
      message: "Students fetched successfully",
      data: { department, students, faculties, courses },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    return res.status(200).json({
      status: "success",
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const getCourseByDepartment = async (req, res) => {
  const { departmentNo } = req.params;

  try {
    const courses = await Course.find({ departments: departmentNo });
    //courseId only needed
    const coursesByDepartment = courses.map((course) => course.courseCode);

    return res.status(200).json({
      status: "success",
      message: "Courses fetched successfully",
      data: coursesByDepartment,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const getCourseDetails = async (req, res) => {
  const { courseCode } = req.params;

  try {
    const course = await Course.findOne({ courseCode });

    if (!course) {
      return res
        .status(404)
        .json({ status: "error", message: "Course not found" });
    }

    const faculty = await Faculty.find({ courses: courseCode });

    return res.status(200).json({
      status: "success",
      message: "Departments fetched successfully",
      data: { course, faculty },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    return res.status(200).json({
      status: "success",
      message: "Faculties fetched successfully",
      data: faculties,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const getFacultiesByDepartment = async (req, res) => {
  const { departmentNo } = req.params;

  try {
    const faculties = await Faculty.find({ department: departmentNo });
    //facultyId only needed
    const facultiesByDepartment = faculties.map((faculty) => faculty.facultyId);

    return res.status(200).json({
      status: "success",
      message: "Faculties fetched successfully",
      data: facultiesByDepartment,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const getFacultyDetails = async (req, res) => {
  const { facultyId } = req.params;

  try {
    const faculty = await Faculty.findOne({ facultyId });

    if (!faculty) {
      return res
        .status(404)
        .json({ status: "error", message: "Faculty not found" });
    }

    let coursesByFaculty = [];
    if (faculty.courses.length > 0) {
      coursesByFaculty = await Course.find({
        courseCode: { $in: faculty.courses },
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Departments fetched successfully",
      data: { faculty, coursesByFaculty },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const getCounts = async (req, res) => {
  try {
    const studentsCount = await Student.countDocuments();
    const facultiesCount = await Faculty.countDocuments();
    const departmentsCount = await Department.countDocuments();
    const coursesCount = await Course.countDocuments();

    return res.status(200).json({
      status: "success",
      message: "Counts fetched successfully",
      data: { studentsCount, facultiesCount, departmentsCount, coursesCount },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};
