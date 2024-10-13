import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/admin/auth/AdminLogin";
import Auth from "./pages/Auth";
import StudentLogin from "./pages/student/Auth/StudentLogin";
import Home from "./pages/admin/home/Home";
import Sidebar from "./components/Sidebar";
import Students from "./pages/admin/students/Students";
import AddStudent from "./pages/admin/students/AddStudent";
import Department from "./pages/admin/department/Department";
import { UserContext, UserProvider } from "./context/UserContext"; // Import UserProvider here
import VerifyToken from "./components/verify/VerifyToken";
import StudentDetails from "./pages/admin/students/StudentDetails";
import DepartmentDetails from "./pages/admin/department/DepartmentDetails";
import Courses from "./pages/admin/courses/Courses";
import CourseDetails from "./pages/admin/courses/CourseDetails";
import Faculties from "./pages/admin/faculties/Faculties";
import FacultyDetails from "./pages/admin/faculties/FacultyDetails";
import AddFaculty from "./pages/admin/faculties/AddFaculty";
import AddDepartment from "./pages/admin/department/AddDepartment";
import AddCourse from "./pages/admin/courses/AddCourse";

const App = () => {
  return (
    <UserProvider>
      <UserContext.Consumer>
        {({ nav }) => (
          <div className={`bg-zinc-900 min-h-screen ${nav && "flex"}`}>
            {nav && <Sidebar />}
            <div className="max-h-screen w-full overflow-scroll hide-scrollbar">
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/adminlogin" element={<AdminLogin />} />
              <Route path="/studentlogin" element={<StudentLogin />} />
              <Route element={<VerifyToken />}>
                <Route path="/dashboard" element={<Home />} />
                <Route path="/students" element={<Students />} />
                <Route path="/student/:studentId" element={<StudentDetails />} />
                <Route path="/addstudent" element={<AddStudent />} />
                <Route path="/departments" element={<Department />} />
                <Route path="/department/:departmentNo" element={<DepartmentDetails />} />
                <Route path="/adddepartment" element={<AddDepartment />} />
                <Route path="/courses" element={<Courses/>} />
                <Route path="/course/:courseCode" element={<CourseDetails />} />
                <Route path="/addcourse" element={<AddCourse />} />
                <Route path="/faculties" element={<Faculties />} />
                <Route path="/faculty/:facultyId" element={<FacultyDetails />} />
                <Route path="/addfaculty" element={<AddFaculty />} />
              </Route>
            </Routes>
            </div>
            
          </div>
        )}
      </UserContext.Consumer>
    </UserProvider>
  );
};

export default App;
