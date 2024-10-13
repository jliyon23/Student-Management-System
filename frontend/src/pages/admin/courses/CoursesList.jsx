import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../axios/api";

const CoursesList = () => {
  const [department, setDepartment] = useState("all");
  const [course, setCourse] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    async function getAllCourses() {
      try {
        const response = await api.get("/admin/getAllCourses");
        console.log(response.data.data);
        setCourse(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getAllCourses();
  }, []);

  useEffect(() => {
    if (department === "all") {
        setFilteredCourses(course); // Show all students if "All" is selected
    } else {
      const filtered = course.filter(
        (cour) => cour.departments[0] === department
      );
      setFilteredCourses(filtered);
    }
  }, [department, course]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-4">Courses List</h1>
      <select
        name="course"
        id="course-select"
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
              <th className="text-left p-3 text-sm text-zinc-400">Course ID</th>
              <th className="text-left p-3 text-sm text-zinc-400">Name</th>
              <th className="text-left p-3 text-sm text-zinc-400">
                Department
              </th>
              <th className="text-left p-3 text-sm text-zinc-400">
                Credit Hours
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course.courseId} className="border-b border-zinc-700">
                <td className="p-3 text-sm text-white">
                  <Link to={`/course/${course.courseCode}`}>
                    {course.courseCode}
                  </Link>
                </td>
                <td className="p-3 text-sm text-white">
                  <Link to={`/course/${course.courseCode}`}>
                    {course.courseName}
                  </Link>
                </td>
                <td className="p-3 text-sm text-white">
                  <Link to={`/course/${course.courseCode}`}>
                    {course.departments}
                  </Link>
                </td>
                <td className="p-3 text-sm text-white">
                  <Link to={`/course/${course.courseCode}`}>
                    {course.credits}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesList;
