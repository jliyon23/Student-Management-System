import React from 'react'

const StudentLogin = () => {
  return (
    <div>
      <div className='w-full h-screen flex justify-center items-center'>
        <form className='w-full mx-3 border border-teal-400 md:w-96 px-5 py-5 bg-zinc-800 rounded-sm text-white shadow-lg flex flex-col justify-center items-center'>
            <h1>Student Login</h1>
            <input type='text' placeholder='student-id' className='w-full rounded-sm p-2 my-2 bg-zinc-700 text-white' />
            <input type='password' placeholder='password' className='w-full p-2 rounded-sm my-2 bg-zinc-700 text-white' />
            <button className='w-full p-2 my-2 bg-teal-500 hover:bg-teal-600 text-white'>login</button>
            <a href="">forgot password?</a>
        </form>
      </div>
    </div>
  )
}

export default StudentLogin
