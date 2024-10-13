import React from "react";
import { FaPlus } from "react-icons/fa";
import DepartmentList from "../department/DepartmentList";
import CoursesList from "./CoursesList";

const Courses = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="p-4 md:px-20">
        <div className="flex justify-end">
          <a
            href="/addcourse"
            className="bg-[#2dd181] text-white px-3 py-2 rounded-md flex justify-center items-center"
          >
            <FaPlus />
            Add Course
          </a>
        </div>
        <CoursesList />
      </div>
    </div>
  );
};

export default Courses;
