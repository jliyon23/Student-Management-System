import React from 'react'
import { FaPlus } from 'react-icons/fa'
import FacultiesList from './FacultiesList'

const Faculties = () => {
  return (
    <div className='min-h-screen w-full'>
        <div className='p-4 md:px-20'>
        <div className="flex justify-end">
          <a
            href="/addfaculty"
            className="bg-[#2dd181] text-white px-3 py-2 rounded-md flex justify-center items-center"
          >
            <FaPlus />
            Add Faculty
          </a>
        </div>
        <FacultiesList />
        </div>
    </div>
  )
}

export default Faculties
