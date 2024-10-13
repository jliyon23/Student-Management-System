import express from "express";
import { login, logout, register, verify } from "../controllers/admin/auth.controller.js";
import { addCourse, addDepartment, assignCourseToDepartment, assignFacultyToCourse, assignFacultyToDepartment, assignFacultyToHead, assignStudentToDepartment, registerFaculty, registerStudent } from "../controllers/admin/admin.controller.js";
import { getAllCourses, getAllDepartments, getAllFaculties, getAllStudents, getCounts, getCourseByDepartment, getCourseDetails, getDepartmentDetails, getFacultiesByDepartment, getFacultyDetails, getStudentDetails } from "../controllers/admin/view.controller.js";


const router = express.Router();


router.post('/login', login);
router.post('/register', register);
router.post('/verify', verify);
router.post('/logout', logout);

router.post('/registerFaculty', registerFaculty);
router.post('/registerStudent', registerStudent);
router.post('/addDepartment', addDepartment);
router.post('/addCourse', addCourse);

router.post('/assignFacultyToDepartment', assignFacultyToDepartment);
router.post('/assignCourseToDepartment', assignCourseToDepartment);
router.post('/assignStudentToDepartment', assignStudentToDepartment);
router.post('/assignFacultyToHead', assignFacultyToHead);

router.post('/assignFacultyToCourse', assignFacultyToCourse);

router.get('/getAllStudents', getAllStudents);
router.get('/getAllDepartments', getAllDepartments);
router.get('/getAllCourses', getAllCourses);
router.get('/getAllFaculties', getAllFaculties);

router.get('/getStudentDetails/:studentId', getStudentDetails);
router.get('/getDepartmentDetails/:departmentNo', getDepartmentDetails);
router.get('/getCourseByDepartment/:departmentNo', getCourseByDepartment);
router.get('/getCourseDetails/:courseCode', getCourseDetails);
router.get('/getFacultyDetails/:facultyId', getFacultyDetails);
router.get('/getFacultyByDepartment/:departmentNo', getFacultiesByDepartment);

router.get('/getCounts', getCounts);







export default router;