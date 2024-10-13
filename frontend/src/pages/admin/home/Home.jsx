import React, { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaBook,
  FaChalkboardTeacher,
  FaBuilding,
} from "react-icons/fa";
import api from "../../../axios/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [counts, setCounts] = useState({
    studentsCount: 0,
    facultiesCount: 0,
    departmentsCount: 0,
    coursesCount: 0,
  });
  const [students, setStudents] = useState([]);

  useEffect(() => {
    document.title = "Admin Dashboard - Home";
    async function getCounts() {
      try {
        const response = await api.get("/admin/getCounts");
        setCounts(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    async function getAllStudents() {
      try {
        const response = await api.get("/admin/getAllStudents");
        console.log(response.data);
        setStudents(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getCounts();
    getAllStudents();
  }, []);

  return (
    <div className="w-full min-h-screen">
      {/* Students, Courses, Staff count cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3  md:px-20">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 rounded-md shadow-md text-white flex items-center">
          <FaUserGraduate className="text-4xl mr-4" />
          <div>
            <h1 className="text-xl font-semibold">Students</h1>
            <h2 className="text-2xl font-bold">{counts.studentsCount}</h2>
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-400 to-red-500 p-6 rounded-md shadow-md text-white flex items-center">
          <FaBuilding className="text-4xl mr-4" />
          <div>
            <h1 className="text-xl font-semibold">Departments</h1>
            <h2 className="text-2xl font-bold">{counts.departmentsCount}</h2>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-md shadow-md text-white flex items-center">
          <FaBook className="text-4xl mr-4" />
          <div>
            <h1 className="text-xl font-semibold">Courses</h1>
            <h2 className="text-2xl font-bold">{counts.coursesCount}</h2>
          </div>
        </div>
        <div className="bg-gradient-to-r from-pink-500 to-red-500 p-6 rounded-md shadow-md text-white flex items-center">
          <FaChalkboardTeacher className="text-4xl mr-4" />
          <div>
            <h1 className="text-xl font-semibold">Faculties</h1>
            <h2 className="text-2xl font-bold">{counts.facultiesCount}</h2>
          </div>
        </div>
      </div>

      {/* Recent activities */}
      <div className="p-4 md:px-20">
        <h1 className="text-2xl text-white font-semibold">Recent Activities</h1>
        <div className="bg-zinc-800 p-4 rounded-md shadow-md mt-4">
          <ul className="space-y-2">
            <li className="bg-zinc-700 p-3 font-bold text-green-400 rounded-md">
              <span className="font-semibold text-zinc-200">John Doe</span>{" "}
              added a new course on{" "}
              <span className="text-zinc-400">12th July, 2021</span>.
            </li>
            <li className="bg-zinc-700 p-3 font-bold text-green-400 rounded-md">
              <span className="font-semibold text-zinc-200">Jane Doe</span>{" "}
              added a new student on{" "}
              <span className="text-zinc-400">12th July, 2021</span>.
            </li>
            <li className="bg-zinc-700 p-3 font-bold text-green-400 rounded-md">
              <span className="font-semibold text-zinc-200">John Doe</span>{" "}
              added a new staff member on{" "}
              <span className="text-zinc-400">12th July, 2021</span>.
            </li>
          </ul>
          <button className="mt-4 border border-teal-400 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded">
            View All Activities
          </button>
        </div>
      </div>

      {/* Students list */}
      <div className="p-4 md:px-20">
        <h1 className="text-2xl font-semibold text-white mb-4">
          Students List
        </h1>
        <div className="bg-zinc-950 rounded-md shadow-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-zinc-700">
                <th className="text-left p-3 text-sm text-zinc-400">
                  Student ID
                </th>
                <th className="text-left p-3 text-sm text-zinc-400">Name</th>
                <th className="text-left p-3 text-sm text-zinc-400">Email</th>
                <th className="text-left p-3 text-sm text-zinc-400">
                  Department
                </th>
                <th className="text-left p-3 text-sm text-zinc-400">Gender</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="bg-zinc-800 hover:bg-zinc-700">
                  <td className="p-3 text-white">
                    <Link to={`/student/${student.studentId}`}>
                      {student.studentId}
                    </Link>
                  </td>
                  <td className="p-3 text-zinc-300">
                    <Link to={`/student/${student.studentId}`}>
                      {student.name}
                    </Link>
                  </td>
                  <td className="p-3 text-zinc-300">
                    <Link to={`/student/${student.studentId}`}>
                      {student.email}
                    </Link>
                  </td>
                  <td className="p-3 text-zinc-300">
                    <Link to={`/student/${student.studentId}`}>
                      {student.department}
                    </Link>
                  </td>
                  <td className="p-3 text-zinc-300">
                    <Link to={`/student/${student.studentId}`}>
                      {student.gender}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
