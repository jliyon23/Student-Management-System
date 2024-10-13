import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../axios/api";

const AddDepartment = () => {
  const navigate = useNavigate();
  const [departmentName, setDepartmentName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/admin/addDepartment", { departmentName });
      console.log(response.data);
      setDepartmentName(""); 
      alert("Department added successfully!");
      navigate("/departments"); 
    } catch (error) {
      console.error(error);
      alert("Error adding department. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="p-4 md:px-20">
        <h2 className="text-2xl font-semibold text-center text-white">Add Department</h2>
        <form
          onSubmit={handleSubmit}
          className="mt-4 p-4 border rounded-md border-teal-500 text-white"
        >
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              placeholder="Department Name"
              className="p-2 bg-zinc-700"
              required
            />
            <button type="submit" className="bg-teal-500 p-2 rounded-md">
              Add Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
