import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../axios/api";

const FacultyDetails = () => {
  const facultyId = useParams().facultyId;
  const [faculty, setFaculty] = useState({
    facultyId: "",
    name: "",
    department: "",
    email: "",
    courses: [],
  });

  const [courseNames, setCourseNames] = useState([]); // State for course names
  const [editing, setEditing] = useState(false);
  const [newCourseCode, setNewCourseCode] = useState(""); // State for new course code

  useEffect(() => {
    async function getFaculty() {
      try {
        const response = await api.get(`/admin/getFacultyDetails/${facultyId}`);
        setFaculty(response.data.data.faculty);
        // Fetch course names after setting faculty details
        const names = await getCourseNames(response.data.data.faculty.courses);
        setCourseNames(names); // Update the course names state
      } catch (error) {
        console.error(error);
      }
    }
    getFaculty();
  }, [facultyId]);

  async function getCourseNames(courses) {
    try {
      const names = await Promise.all(
        courses.map(async (courseCode) => {
          const response = await api.get(`/admin/getCourseDetails/${courseCode}`);
          return response.data.data.course.courseName;
        })
      );
      return names;
    } catch (error) {
      console.error("Error fetching course names:", error);
      return []; // Return an empty array on error
    }
  }

  // Handle adding a new course
  const addCourse = () => {
    if (newCourseCode) {
      setFaculty((prev) => ({
        ...prev,
        courses: [...prev.courses, newCourseCode],
      }));
      setNewCourseCode("");
    }
  };

  // Handle removing a course
  const removeCourse = (courseCode) => {
    setFaculty((prev) => ({
      ...prev,
      courses: prev.courses.filter((course) => course !== courseCode),
    }));
  };

  // Handle saving the edited faculty information (you might want to implement an API call here)
  const saveChanges = () => {
    // Make an API call to save changes if needed
    console.log("Saving changes", faculty);
    setEditing(false);
  };

  document.title = `Faculty - ${faculty.name}`;

  return (
    <div className="min-h-screen w-full">
      <div className="p-4 md:px-20">
        <h1 className="text-2xl font-semibold text-white mb-4">Faculty Details</h1>
        <div className="bg-zinc-950 border border-teal-500 rounded-md shadow-lg p-4">
          <div className="flex justify-between pb-2 border-b border-zinc-700 w-full items-center pr-3">
            <div>
              {editing ? (
                <>
                  <input
                    type="text"
                    value={faculty.name}
                    onChange={(e) => setFaculty({ ...faculty, name: e.target.value })}
                    className="text-xl font-semibold text-white bg-zinc-700 border-none rounded-md mb-2"
                  />
                  <input
                    type="text"
                    value={faculty.department}
                    onChange={(e) => setFaculty({ ...faculty, department: e.target.value })}
                    className="text-lg text-zinc-400 bg-zinc-700 border-none rounded-md mb-2"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-white">{faculty.name}</h2>
                  <p className="text-lg text-zinc-400">{faculty.department}</p>
                </>
              )}
            </div>
            <img className="w-32 h-28" src={`https://robohash.org/${faculty.name}`} alt="" />
          </div>

          <div className="pb-2 border-b border-zinc-700 w-full mt-4">
            <h3 className="text-lg font-semibold text-white">Courses</h3>
            <ul className="list-disc list-inside">
              {editing ? (
                <>
                  {faculty.courses.length > 0 ? (
                    faculty.courses.map((courseCode, index) => (
                      <li key={index} className="text-zinc-400 flex justify-between items-center">
                        {courseNames[index]}
                        <button
                          onClick={() => removeCourse(courseCode)}
                          className="text-red-500 ml-2"
                        >
                          Remove
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="text-zinc-400">No courses assigned.</li>
                  )}
                  <div className="flex items-center mt-2">
                    <input
                      type="text"
                      placeholder="Add new course code"
                      value={newCourseCode}
                      onChange={(e) => setNewCourseCode(e.target.value)}
                      className="bg-zinc-700 text-white p-2 rounded-md mr-2"
                    />
                    <button
                      onClick={addCourse}
                      className="bg-teal-500 text-white p-2 px-4 rounded-md"
                    >
                      +
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {courseNames.length > 0 ? (
                    courseNames.map((courseName, index) => (
                      <li key={index} className="text-zinc-400">{courseName}</li>
                    ))
                  ) : (
                    <li className="text-zinc-400">No courses assigned.</li>
                  )}
                </>
              )}
            </ul>
          </div>

          <div className="pb-2 mt-4 border-b border-zinc-700 w-full">
            <h3 className="text-lg font-semibold text-white">Email</h3>
            {editing ? (
              <input
                type="email"
                value={faculty.email}
                onChange={(e) => setFaculty({ ...faculty, email: e.target.value })}
                className="text-zinc-400 bg-zinc-700 border-none rounded-md p-2"
              />
            ) : (
              <p className="text-zinc-400">{faculty.email}</p>
            )}
          </div>

          <div className="flex md:flex-row flex-col gap-2 w-full mt-4">
            <button
              onClick={editing ? saveChanges : () => setEditing(true)}
              className="bg-[#2dd181] text-white md:w-1/2 w-full py-2 rounded-md flex justify-center items-center"
            >
              {editing ? "Save" : "Edit"}
            </button>
            <button 
            onClick={editing ? () => setEditing(false) : () => console.log("Remove faculty")}
            className="bg-[#ee564b] text-white md:w-1/2 w-full px-3 py-2 rounded-md flex justify-center items-center">
              {editing ? "Cancel" : "Remove"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDetails;
