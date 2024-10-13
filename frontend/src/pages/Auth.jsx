import React from 'react'
import { Link } from 'react-router-dom'

const Auth = () => {
  return (
    <div className='w-full h-screen flex justify-center flex-col md:flex-row gap-5 items-center'>
        <Link  to='/adminlogin'><div className='p-20 rounded-md bg-[#26a4df] hover:bg-blue-600 text-white text-3xl'>Admin</div></Link>
        <Link  to="/studentlogin"><div className='p-20 rounded-md bg-[#26a4df] hover:bg-blue-600 text-white text-3xl'>Student</div></Link>
    </div>
  )
}
export default Auth
