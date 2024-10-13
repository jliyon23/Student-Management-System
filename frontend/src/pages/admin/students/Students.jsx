import React from "react";
// plus icons
import { FaPlus } from "react-icons/fa";
import StudentsList from "./StudentsList";

const Students = () => {
  document.title = "Students | Admin";

  return (
    <div className="w-full min-h-screen">
      <div className="p-4 md:px-20">
        <div className="flex justify-end">
          <a href="/addstudent" className="bg-[#2dd181] text-white px-3 py-2 rounded-md flex justify-center items-center">
            <FaPlus />
            Add Student
          </a>
        </div>
        <StudentsList />
      </div>
    </div>
  );
};

export default Students;
