import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../axios/api";

const CourseDetails = () => {
  const courseCode = useParams().courseCode;
  const [editing, setEditing] = useState(false);
  const [course, setCourse] = useState({});

  useEffect(() => {
    async function getCourseDetails() {
      try {
        const response = await api.get(`/admin/getCourseDetails/${courseCode}`);
        console.log(response.data.data);
        setCourse(response.data.data.course);
      } catch (error) {
        console.error(error);
      }
    }
    getCourseDetails();
  }, [courseCode]);

  return (
    <div className="min-h-screen w-full">
      <div className="p-4 md:px-20">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl text-center font-semibold text-white mb-4">
            Course Details
          </h1>
          <div className="bg-zinc-950 border border-teal-500 rounded-md shadow-lg p-4">
            <div>
              {editing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="courseCode" className="text-white">
                      Course Code
                    </label>
                    <input
                      type="text"
                      id="courseCode"
                      value={course.courseCode}
                      className="w-full bg-zinc-700 border-none text-white p-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="courseName" className="text-white">
                      Course Name
                    </label>
                    <input
                      type="text"
                      id="courseName"
                      value={course.courseName}
                      className="w-full bg-zinc-700 border-none text-white p-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="creditHours" className="text-white">
                      Credit Hours
                    </label>
                    <input
                      type="number"
                      id="creditHours"
                      value={course.credits}
                      className="w-full bg-zinc-700 border-none text-white p-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="department" className="text-white">
                      Department
                    </label>
                    <select
                      name="department"
                      id="department"
                      value={
                        course.departments.length > 0
                          ? course.departments[0]
                          : "D-001"
                      }
                      className="w-full bg-zinc-700 border-none text-white p-2 rounded-md"
                    >
                      <option value="D-001">Computer Science</option>
                      <option value="D-002">Electrical Engineering</option>
                      <option value="D-003">Electronics Engineering</option>
                      <option value="D-004">Civil Engineering</option>
                      <option value="D-005">Mechanical Engineering</option>
                    </select>
                  </div>
                  <div className="flex gap-2 col-span-1 md:col-span-2">
                    <button className="w-full md:w-auto bg-teal-500 text-white px-4 py-2 rounded-md">
                      Save
                    </button>
                    <button className="w-full md:w-auto bg-red-500 text-white px-4 py-2 rounded-md">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div className="">
                    <h2 htmlFor="courseCode" className="text-white font-semibold">
                      Course Code
                    </h2>
                    <p id="courseCode" className="text-white p-2 rounded-md">
                      {course.courseCode}
                    </p>
                  </div>
                  <div className="">
                    <h2 htmlFor="courseName" className="text-white font-semibold">
                      Course Name
                    </h2>
                    <p id="courseName" className="text-white p-2 rounded-md">
                      {course.courseName}
                    </p>
                  </div>
                  <div className="">
                    <h2 htmlFor="creditHours" className="text-white font-semibold">
                      Credit Hours
                    </h2>
                    <p id="creditHours" className="text-white p-2 rounded-md">
                      {course.credits}
                    </p>
                  </div>
                  <div className="">
                    <h2 htmlFor="department" className="text-white font-semibold">
                      Department
                    </h2>
                    <p id="department" className="text-white p-2 rounded-md">
                      {course.departments}
                    </p>
                  </div>
                  <div className="flex gap-2 col-span-1 md:col-span-2">
                    <button
                      className="w-full md:w-auto bg-teal-500 text-white px-4 py-2 rounded-md"
                      onClick={() => setEditing(true)}
                    >
                      Edit
                    </button>
                    <button className="w-full md:w-auto bg-red-500 text-white px-4 py-2 rounded-md">
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
