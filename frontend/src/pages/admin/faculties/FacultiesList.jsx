import React, { useEffect, useState } from 'react'
import api from '../../../axios/api';
import { Link } from 'react-router-dom';

const FacultiesList = () => {
    const [department, setDepartment] = useState("all");
    const [faculty, setFaculty] = useState([]);
    const [filteredFaculties, setFilteredFaculties] = useState([]);

    useEffect(() => {
        async function getAllFaculties() {
            try {
                const response = await api.get("/admin/getAllFaculties");
                console.log(response.data.data);
                setFaculty(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }
        getAllFaculties();
    }, []);

    useEffect(() => {
        if (department === "all") {
            setFilteredFaculties(faculty); // Show all students if "All" is selected
        } else {
            const filtered = faculty.filter(
                (fac) => fac.department === department
            );
            setFilteredFaculties(filtered);
        }
    }, [department, faculty]);


  return (
    <div>
        <h1 className="text-2xl font-semibold text-white mb-4">Faculty List</h1>
        <select
            name="faculty"
            id="faculty-select"
            className="bg-zinc-700 border-none mb-4 text-white w-36 rounded-md"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
        >
            <option value="all">All</option>
            <option value="D-001">Computer Science</option>
            <option value="D-002">Electrical Engineering</option>
            <option value="D-003">Electronics Engineering</option>
            <option value="D-005">Mechanical Engineering</option>
            <option value="D-004">Civil Engineering</option>
        </select>

        <div className="bg-zinc-950 w-fit rounded-md shadow-lg">
            <table className="w-full">
                <thead>
                    <tr className="border-b-2 border-zinc-700">
                        <th className="text-left p-3 text-sm text-zinc-400">Faculty ID</th>
                        <th className="text-left p-3 text-sm text-zinc-400">Name</th>
                        <th className="text-left p-3 text-sm text-zinc-400">Department</th>
                        <th className="text-left p-3 text-sm text-zinc-400">Email</th>
                        <th className="text-left p-3 text-sm text-zinc-400">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFaculties.map((fac) => (
                        <tr key={fac.facultyId} className="border-b border-zinc-700">
                            <td className="p-3 text-sm text-zinc-400">
                                <Link to={`/faculty/${fac.facultyId}`}>{fac.facultyId}</Link>
                            </td>
                            <td className='p-3 text-sm text-zinc-400'>
                                <Link to={`/faculty/${fac.facultyId}`} className="p-3 text-sm text-zinc-400">{fac.name}</Link>
                            </td>
                            <td className='p-3 text-sm text-zinc-400'>
                                <Link to={`/faculty/${fac.facultyId}`} className="p-3 text-sm text-zinc-400">{fac.department}</Link>
                            </td>
                            <td className='p-3 text-sm text-zinc-400'>
                                <Link to={`/faculty/${fac.facultyId}`} className="p-3 text-sm text-zinc-400">{fac.email}</Link>
                            </td>
                            <td className='p-3 text-sm text-zinc-400'>
                                <Link to={`/faculty/${fac.facultyId}`} className="p-3 text-sm text-zinc-400">{fac.phone}</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
                </div>
    </div>
  )
}

export default FacultiesList
