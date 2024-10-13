import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../axios/api";

const DepartmentDetails = () => {
  const departmentNo = useParams().departmentNo;
  const [department, setDepartment] = useState({});
  const [faculties, setFaculties] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await api.get(
          `/admin/getDepartmentDetails/${departmentNo}`
        );
        console.log(response.data.data);
        setDepartment(response.data.data.department);
        setFaculties(response.data.data.faculties);
        setStudents(response.data.data.students);
        setCourses(response.data.data.courses);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDepartment();
  }, [departmentNo]);

  const courseMapping = courses.reduce((acc, course) => {
    acc[course.courseCode] = course.courseName; 
    return acc;
  }, {});

  const removeDepartment = async () => {
  };

  return (
    <div className="min-h-screen w-full">
      <div className="p-4 md:px-20">
        <div className="">
          <h1 className="text-2xl text-center font-semibold text-white mb-4">
            Department Details
          </h1>
          <div className="bg-zinc-950 p-3 rounded-md grid grid-cols-1 md:grid-cols-2 mb-3 gap-4">
            <div className="pb-3 border-b border-zinc-500">
              <h2 className="text-lg font-semibold text-white">
                Department Name
              </h2>
              <p className="text-white">{department.departmentName}</p>
            </div>
            <div className="pb-3 border-b border-zinc-500">
              <h2 className="text-lg font-semibold text-white">
                Department No
              </h2>
              <p className="text-white">{department.departmentNo}</p>
            </div>
            <div className="pb-3 border-b border-zinc-500">
              <h2 className="text-lg font-semibold text-white">
                Department Head
              </h2>
              <p className="text-white">{department.departmentHead}</p>
            </div>
            <div className="pb-3 border-b border-zinc-500">
              <h2 className="text-lg font-semibold text-white">
                Total Students
              </h2>
              <p className="text-white">{students.length}</p>
            </div>
            <div className="pb-3 border-b border-zinc-500">
              <h2 className="text-lg font-semibold text-white">
                Total Faculties
              </h2>
              <p className="text-white">{faculties.length}</p>
            </div>
            <div className="pb-3 border-b border-zinc-500">
              <h2 className="text-lg font-semibold text-white">
                Total Courses
              </h2>
              <p className="text-white">{courses.length}</p>
            </div>
            <button onClick={removeDepartment} className="py-2 px-4 bg-red-500 text-white">Remove Department</button>
          </div>

          <details className="mb-3">
            <summary className="text-lg font-semibold bg-zinc-950 p-2 rounde-sm text-white">
              Faculties
            </summary>
            <div className="bg-zinc-950 p-3 rounded-md flex flex-col mb-3 gap-4">
              {faculties.map((faculty, index) => (
                <div
                  key={index}
                  className="pb-3 border-b flex items-center border-zinc-500"
                >
                  <img
                    width={50}
                    src={`https://robohash.org/${faculty.name}`}
                    alt=""
                  />
                  <Link to={`/faculty/${faculty.facultyId}`}>
                    <p className="text-white font-bold">{faculty.name}</p>
                    <p className="text-white ">
                      course:{" "}
                      {faculty.courses
                        .map(
                          (courseCode) =>
                            courseMapping[courseCode] || courseCode
                        )
                        .join(", ")}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </details>

          <details className="mb-3">
            <summary className="text-lg font-semibold bg-zinc-950 p-2 rounde-sm text-white">
              Students
            </summary>
            <div className="bg-zinc-950 p-3 rounded-md flex flex-col mb-3 gap-4">
              {students.map((student, index) => (
                <div
                  key={index}
                  className="pb-3 border-b flex items-center border-zinc-500"
                >
                  <img
                    width={50}
                    src={`https://robohash.org/${student.name}`}
                    alt=""
                  />
                  <Link to={`/student/${student.studentId}`}>
                    <p className="text-white font-bold">{student.name}</p>
                    <p className="text-white">{student.email}</p>
                  </Link>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;
