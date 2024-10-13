import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../axios/api";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [department, setDepartment] = useState("all");

  useEffect(() => {
    async function getAllStudents() {
      try {
        const response = await api.get("/admin/getAllStudents");
        setStudents(response.data.data);
        setFilteredStudents(response.data.data); 
      } catch (error) {
        console.error(error);
      }
    }
    getAllStudents();
  }, []);

  useEffect(() => {
    if (department === "all") {
      setFilteredStudents(students); // Show all students if "All" is selected
    } else {
      const filtered = students.filter(
        (student) => student.department === department
      );
      setFilteredStudents(filtered);
    }
  }, [department, students]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-4">Students List</h1>
      <select
        name="department"
        id="department-select"
        className="bg-zinc-700 border-none mb-4 text-white w-36 rounded-md"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="all">All</option>
        <option value="D-001">Computer Science</option>
        <option value="D-002">Electrical Engineering</option>
        <option value="D-003">Electronics Engineering</option>
        <option value="D-005">Mechanical Engineering</option>
        <option value="D-004">Civil Engineering</option>
      </select>
      <div className="bg-zinc-950 w-fit rounded-md shadow-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-zinc-700">
              <th className="text-left p-3 text-sm text-zinc-400">Student ID</th>
              <th className="text-left p-3 text-sm text-zinc-400">Name</th>
              <th className="text-left p-3 text-sm text-zinc-400">Email</th>
              <th className="text-left p-3 text-sm text-zinc-400">Department</th>
              <th className="text-left p-3 text-sm text-zinc-400">Gender</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index} className="bg-zinc-800 hover:bg-zinc-700">
                <td className="p-3 text-white">
                  <Link to={`/student/${student.studentId}`}>
                    {student.studentId}
                  </Link>
                </td>
                <td className="p-3 text-zinc-300">
                  <Link to={`/student/${student.studentId}`}>{student.name}</Link>
                </td>
                <td className="p-3 text-zinc-300">
                  <Link to={`/student/${student.studentId}`}>{student.email}</Link>
                </td>
                <td className="p-3 text-zinc-300">
                  <Link to={`/student/${student.studentId}`}>{student.department}</Link>
                </td>
                <td className="p-3 text-zinc-300">
                  <Link to={`/student/${student.studentId}`}>{student.gender}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsList;
