import React, { useState } from "react";
import api from "../../../axios/api"; // Assuming you have Axios configured
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  document.title = "Add Student | Admin";

  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    gender: "",
    dob: "",
    department: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/admin/registerStudent", student);
      console.log(response.data);
      setStudent({
        name: "",
        email: "",
        gender: "",
        dob: "",
        department: "",
        phone: "",
        address: "",
      });
      console.log(response.data);
      alert("Student added successfully!");
      navigate("/students");
    } catch (error) {
      console.error(error);
      alert("Error adding student. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="p-5 border rounded-md border-teal-500 text-white mt-5"
        >
          <h2 className="text-2xl font-semibold text-center">Add Student</h2>
          <div className="flex flex-col mt-4 gap-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="text"
                value={student.name}
                onChange={(e) => setStudent({ ...student, name: e.target.value })}
                placeholder="Full name"
                className="p-2 bg-zinc-700"
                required
              />
              <input
                type="email"
                value={student.email}
                onChange={(e) => setStudent({ ...student, email: e.target.value })}
                placeholder="Email"
                className="p-2 bg-zinc-700"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <select
                name="gender"
                value={student.gender}
                onChange={(e) => setStudent({ ...student, gender: e.target.value })}
                className="p-2 bg-zinc-700"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
              <select
                name="department"
                value={student.department}
                onChange={(e) => setStudent({ ...student, department: e.target.value })}
                className="p-2 bg-zinc-700"
                required
              >
                <option value="">Select Department</option>
                <option value="D-001">Computer Science</option>
                <option value="D-002">Electrical Engineering</option>
                <option value="D-003">Electronics Engineering</option>
                <option value="D-005">Mechanical Engineering</option>
                <option value="D-004">Civil Engineering</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="date"
                value={student.dob}
                onChange={(e) => setStudent({ ...student, dob: e.target.value })}
                className="p-2 bg-zinc-700"
                required
              />
              <input
                type="tel"
                value={student.phone}
                onChange={(e) => setStudent({ ...student, phone: e.target.value })}
                placeholder="Phone (include country code)"
                className="p-2 bg-zinc-700"
                required
              />
            </div>
            <textarea
              name="address"
              value={student.address}
              onChange={(e) => setStudent({ ...student, address: e.target.value })}
              placeholder="Permanent address"
              className="p-2 bg-zinc-700"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-teal-500 py-3 rounded-sm hover:bg-teal-600"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
