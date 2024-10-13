import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../axios/api";

const AddCourse = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    courseName: "",
    departments: "",
    credits: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/admin/addCourse", course);
      console.log(response.data);
      setCourse({
        courseName: "",
        departments: "",
        credits: "",
      });
      alert("Course added successfully!");
      navigate("/courses");
    } catch (error) {
      console.error(error);
      alert("Error adding course. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="p-4 md:px-20">
        <h2 className="text-2xl font-semibold text-center text-white">Add Course</h2>
        <form
          onSubmit={handleSubmit}
          className="mt-4 p-4 border rounded-md border-teal-500 text-white"
        >
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={course.courseName}
              onChange={(e) => setCourse({ ...course, courseName: e.target.value })}
              placeholder="Course Name"
              className="p-2 bg-zinc-700"
              required
            />
            <input
              type="text"
              value={course.departments}
              onChange={(e) => setCourse({ ...course, departments: e.target.value })}
              placeholder="Departments"
              className="p-2 bg-zinc-700"
              required
            />
            <input
              type="number"
              value={course.credits}
              onChange={(e) => setCourse({ ...course, credits: e.target.value })}
              placeholder="Credits"
              className="p-2 bg-zinc-700"
              required
            />
            <button type="submit" className="bg-teal-500 p-2 rounded-md">
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
