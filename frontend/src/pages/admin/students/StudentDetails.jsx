import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../axios/api";

const StudentDetails = () => {
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Return in yyyy-mm-dd format
  };
  const studentId = useParams().studentId;
  const [student, setStudent] = useState({
    name: "",
    email: "",
    gender: "",
    dob: "",
    department: "",
    phone: "",
    address: "",
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    async function getStudentDetails() {
      try {
        const response = await api.get(`/admin/getStudentDetails/${studentId}`);
        console.log(response.data);
        setStudent(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getStudentDetails();
  }, [studentId]);

  document.title = `${student.name} | Admin`;
  return (
    <div className="w-full min-h-screen">
      <div className="p-4 md:px-40">
        <div className="flex flex-col">
          <h1 className="text-2xl text-center font-semibold text-white mb-4">
            Student Details
          </h1>
          <div className="bg-zinc-950 border border-teal-500 rounded-md shadow-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 mb-3 gap-4">
              <div className=" flex justify-center  border border-white">
                <img
                  className="w-44"
                  src={`https://robohash.org/${student.name}`}
                  alt="Profile picture"
                />
              </div>
              <div className="flex flex-col justify-center gap-2">
                {editing ? (
                  <>
                    <button className="py-2 px-5 bg-green-500 rounded-sm text-white">
                      Save
                    </button>
                    <button onClick={() => setEditing(false)} className="py-2 px-5 bg-red-500 rounded-sm text-white">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditing(true)}
                      className="py-2 px-5 bg-yellow-500 rounded-sm text-white"
                    >
                      Edit Details
                    </button>
                    <button className="py-2 px-5 bg-red-500 rounded-sm text-white">
                      Delete Student
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              {editing ? (
                <>
                  <div className="pb-3 border-b border-zinc-500">
                    <h2 className="text-lg font-semibold text-white">Name</h2>
                    <input
                      type="text"
                      onChange={(e) =>
                        setStudent({ ...student, name: e.target.value })
                      }
                      value={student.name}
                      className="text-white bg-zinc-900 rounded-md"
                    />
                  </div>
                  <div className="pb-3 border-b border-zinc-500">
                    <h2 className="text-lg font-semibold text-white">Email</h2>
                    <input
                      type="text"
                      onChange={(e) =>
                        setStudent({ ...student, email: e.target.value })
                      }
                      value={student.email}
                      className="text-white bg-zinc-900 rounded-md"
                    />{" "}
                  </div>
                  <div className="pb-3 border-b border-zinc-500">
                    <h2 className="text-lg font-semibold text-white">Gender</h2>
                    <select
                      onChange={(e) =>
                        setStudent({ ...student, gender: e.target.value })
                      }
                      value={student.gender}
                      className="text-white bg-zinc-900 rounded-md"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>{" "}
                  </div>
                  <div className="pb-3 border-b border-zinc-500">
                    <h2 className="text-lg font-semibold text-white">
                      Date of Birth
                    </h2>
                    <input
                      type="date"
                      onChange={(e) =>
                        setStudent({ ...student, dob: e.target.value })
                      }
                      value={formatDateForInput(student.dob)}
                      className="text-white bg-zinc-900 rounded-md"
                    />{" "}
                  </div>
                  <div className="pb-3 border-b border-zinc-500">
                    <h2 className="text-lg font-semibold text-white">
                      Department
                    </h2>
                    <select
                      name="department"
                      value={student.department}
                      onChange={(e) =>
                        setStudent({ ...student, department: e.target.value })
                      }
                      className="text-white bg-zinc-900 rounded-md"
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
                  <div className="pb-3 border-b border-zinc-500">
                    <h2 className="text-lg font-semibold text-white">Phone</h2>
                    <input
                      type="text"
                      onChange={(e) => setStudent({ ...student, phone: e.target.value })}
                      value={student.phone}
                      className="text-white bg-zinc-900 rounded-md"
                    />{" "}
                  </div>
                  <div className="pb-3 border-b border-zinc-500">
                    <h2 className="text-lg font-semibold text-white">
                      Address
                    </h2>
                    <input
                      type="text"
                        onChange={(e) => setStudent({ ...student, address: e.target.value }) }
                      value={student.address}
                      className="text-white bg-zinc-900 rounded-md"
                    />{" "}
                  </div>
                </>
              ) : (
                <>
                  <div className="pb-3 border-b border-zinc-500">
                    <h2 className="text-lg font-semibold text-white">Name</h2>
                    <p className="text-white">{student.name}</p>
                  </div>
                  <div className="pb-3 border-b border-zinc-500">
                    <h2 className="text-lg font-semibold text-white">Email</h2>
                    <p className="text-white">{student.email}</p>
                  </div>
                  <div className="pb-3 border-b border-zinc-500">
                    <h2 className="text-lg font-semibold text-white">Gender</h2>
                    <p className="text-white">{student.gender}</p>
                  </div>
                  <div className="pb-3 border-b border-zinc-500">
                    <h2 className="text-lg font-semibold text-white">
                      Date of Birth
                    </h2>
                    <p className="text-white">
                      {formatDateForInput(student.dob)}
                    </p>
                  </div>
                  <div className="pb-3 border-b border-zinc-500">
                    <h2 className="text-lg font-semibold text-white">
                      Department
                    </h2>
                    <p className="text-white">
                      {student.department === "D-001" && "Computer Science"}
                      {student.department === "D-002" &&
                        "Electrical Engineering"}
                      {student.department === "D-003" &&
                        "Electronics Engineering"}
                      {student.department === "D-004" && "Civil Engineering"}
                      {student.department === "D-005" &&
                        "Mechanical Engineering"}
                    </p>
                  </div>
                  <div className="pb-3 border-b border-zinc-500">
                    <h2 className="text-lg font-semibold text-white">Phone</h2>
                    <p className="text-white">{student.phone}</p>
                  </div>
                  <div className="pb-3 border-b border-zinc-500">
                    <h2 className="text-lg font-semibold text-white">
                      Address
                    </h2>
                    <p className="text-white">{student.address}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
