import { React, useEffect, useState } from "react";
import api from "../../../axios/api";
import { Link } from "react-router-dom";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get("/admin/getAllDepartments");
        console.log(response.data.data);
        setDepartments(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-4">
        Departments List
      </h1>
      <div className="bg-zinc-950 w-fit  rounded-md shadow-lg">
        <table className="w-full">
          <thead className="w-full">
            <tr className="border-b-2 border-zinc-700">
              <th className="text-left p-3 text-sm text-zinc-400">
                Department no
              </th>
              <th className="text-left p-3 text-sm text-zinc-400">
                Department Name
              </th>
              <th className="text-left p-3 text-sm text-zinc-400">
                Total Faculties
              </th>
              <th className="text-left p-3 text-sm text-zinc-400">
                Total Students
              </th>
              <th className="text-left p-3 text-sm text-zinc-400">HOD</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department, index) => (
              <tr key={index} className="bg-zinc-800 hover:bg-zinc-700">
                <td className="p-3 text-white">
                 
                  <Link to={`/department/${department.departmentNo}`}>
                    {department.departmentNo}
                  </Link>
                </td>
                <td className="p-3 text-zinc-300">
                  <Link to={`/department/${department.departmentNo}`}>
                    {department.departmentName}
                  </Link>
                </td>
                <td className="p-3 text-zinc-300">{department.faculties}</td>
                <td className="p-3 text-zinc-300">{department.students}</td>
                <td className="p-3 text-zinc-300">{department.departmentHead}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentList;
