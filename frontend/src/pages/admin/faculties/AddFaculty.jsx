import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../axios/api";

const AddFaculty = () => {
  const navigate = useNavigate();

  const [faculty, setFaculty] = useState({
    name: "",
    email: "",
    gender: "",
    dob: "",
    phone: "",
    address: "",
    department: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/admin/registerFaculty", faculty);
      console.log(response.data);
      setFaculty({
        name: "",
        email: "",
        gender: "",
        dob: "",
        phone: "",
        address: "",
        department: "",
      });
      console.log(response.data);
      alert("Faculty added successfully!");
      navigate("/faculties");
    } catch (error) {
      console.error(error);
      alert("Error adding faculty. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="p-4 md:px-20">
        <h2 className="text-2xl font-semibold text-center text-white">Add Faculty</h2>
        <form
          onSubmit={handleSubmit}
          className="mt-4 p-4 border rounded-md border-teal-500 text-white"
        >
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="text"
                value={faculty.name}
                onChange={(e) =>
                  setFaculty({ ...faculty, name: e.target.value })
                }
                placeholder="Full name"
                className="p-2 bg-zinc-700"
                required
              />
              <input
                type="email"
                value={faculty.email}
                onChange={(e) =>
                  setFaculty({ ...faculty, email: e.target.value })
                }
                placeholder="Email"
                className="p-2 bg-zinc-700"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <select
                name="gender"
                value={faculty.gender}
                onChange={(e) =>
                  setFaculty({ ...faculty, gender: e.target.value })
                }
                className="p-2 bg-zinc-700"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="date"
                value={faculty.dob}
                onChange={(e) =>
                  setFaculty({ ...faculty, dob: e.target.value })
                }
                placeholder="Date of Birth"
                className="p-2 bg-zinc-700"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="text"
                value={faculty.phone}
                onChange={(e) =>
                  setFaculty({ ...faculty, phone: e.target.value })
                }
                placeholder="Phone"
                className="p-2 bg-zinc-700"
                required
              />
              <input
                type="text"
                value={faculty.address}
                onChange={(e) =>
                  setFaculty({ ...faculty, address: e.target.value })
                }
                placeholder="Address"
                className="p-2 bg-zinc-700"
                required
              />
            </div>
            <select
                name="department"
                value={faculty.department}
                onChange={(e) => setFaculty({ ...faculty, department: e.target.value })}
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
            <button type="submit" className="bg-teal-500 p-2 rounded-md">
              Add Faculty
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFaculty;
