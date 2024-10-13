import React from 'react'
import { FaPlus } from 'react-icons/fa'
import DepartmentList from './DepartmentList'

const Department = () => {
  return (
    <div className='w-full min-h-screen'>
      <div className='p-4 md:px-20'>
        <div className='flex justify-end'>
            <a href='/adddepartment' className='bg-[#2dd181] text-white px-3 py-2 rounded-md flex justify-center items-center'>
                <FaPlus />
                Add Department
            </a>
        </div>

        <DepartmentList />

      </div>
    </div>
  )
}

export default Department
