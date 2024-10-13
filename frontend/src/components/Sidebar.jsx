import React, { useContext, useState } from 'react';
import { HiMenuAlt2 } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { AiFillDashboard } from "react-icons/ai";
import { PiStudent } from "react-icons/pi";
import { FaChalkboardTeacher, FaBuilding } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import { UserContext } from '../context/UserContext';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { role } = useContext(UserContext);

  const adminMenus = [
    {
      name: 'Dashboard',
      link: '/dashboard',
      icon: AiFillDashboard,
    },
    {
      name: 'Students',
      link: '/students',
      icon: PiStudent,
    },
    {
      name: 'Department',
      link: '/departments',
      icon: FaBuilding,
    },
    {
      name: 'Courses',
      link: '/courses',
      icon: FaChalkboardTeacher,
    },
    {
      name: 'Faculties',
      link: '/faculties',
      icon: FaChalkboardTeacher,
    },
    {
      name: 'Contact',
      link: '/contact',
      icon: MdContactMail,
    },
    {
      name: 'Logout',
      link: '/logout',
      icon: AiFillDashboard,
    }
  ];

  const studentMenus = [
    {
      name: 'Profile',
      link: '/profile',
      icon: AiFillDashboard,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: MdContactMail
    },
    {
      name: 'Logout',
      link: '/logout',
      icon: AiFillDashboard,
    }
  ];

  const facultyMenus = [
    {
      name: 'Profile',
      link: '/profile',
      icon: AiFillDashboard,
    },
    {
      name: 'Department',
      link: '/departments',
      icon: FaBuilding,
    },
    {
      name: 'Courses',
      link: '/courses',
      icon: FaChalkboardTeacher,
    },
    {
      name: 'Contact',
      link: '/contact',
      icon: MdContactMail,
    },
    {
      name: 'Logout',
      link: '/logout',
      icon: AiFillDashboard,
    }
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`bg-black max-h-screen ${isOpen ? "w-72" : "w-16"} text-gray-100 px-4 duration-300`}>
      <div className='py-3 flex justify-end'>
        <HiMenuAlt2 size={26} className='cursor-pointer' onClick={toggleSidebar} />
      </div>
      <div className='mt-4 flex flex-col gap-4 relative'>
        {role === 'admin' && adminMenus.map((menu, index) => (
          <Link to={menu.link} key={index} className='flex items-center hover:bg-zinc-600 rounded-md text-sm gap-3.5 font-medium p-2'>
            <div>{React.createElement(menu.icon, { size: "20" })}</div>
            <h2 className={`whitespace-pre duration-300 ${!isOpen && 'opacity-0 translate-x-28 overflow-hidden'}`}>{menu.name}</h2>
          </Link>
        ))}
        {role === 'student' && studentMenus.map((menu, index) => (
          <Link to={menu.link} key={index} className='flex items-center hover:bg-zinc-600 rounded-md text-sm gap-3.5 font-medium p-2'>
            <div>{React.createElement(menu.icon, { size: "20" })}</div>
            <h2 className={`whitespace-pre duration-300 ${!isOpen && 'opacity-0 translate-x-28 overflow-hidden'}`}>{menu.name}</h2>
          </Link>
        ))}
        {role === 'faculty' && facultyMenus.map((menu, index) => (
          <Link to={menu.link} key={index} className='flex items-center hover:bg-zinc-600 rounded-md text-sm gap-3.5 font-medium p-2'>
            <div>{React.createElement(menu.icon, { size: "20" })}</div>
            <h2 className={`whitespace-pre duration-300 ${!isOpen && 'opacity-0 translate-x-28 overflow-hidden'}`}>{menu.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
