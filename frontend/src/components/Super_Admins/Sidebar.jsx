import React from 'react';
import { FaUser, FaUserShield,FaCog, FaSignOutAlt } from 'react-icons/fa';
import { TbLayoutDashboardFilled } from "react-icons/tb";

function Sidebar() {
  return (
    <div className='w-[18%] min-h-screen border-r-2 bg-[#003356] text-white'>
      <div className='flex flex-col gap-6 pt-8 pl-8'>
        <h2 className='text-[20px] font-bold mb-4'>Admin Dashboard</h2>
        <ul className='flex flex-col gap-4'>
            <li className='flex items-center gap-2 p-2 cursor-pointer hover:bg-[#00243a] rounded-lg'>
            <TbLayoutDashboardFilled className='text-[18px]'/>
            <span>Dashboard</span>
            </li>
        <li className='flex items-center gap-2 p-2 cursor-pointer hover:bg-[#00243a] rounded-lg'>
            <FaUserShield className='text-[18px]' />
            <span>Admins</span>
          </li>
          <li className='flex items-center gap-2 p-2 cursor-pointer hover:bg-[#00243a] rounded-lg'>
            <FaUser className='text-[18px]' />
            <span>Employees</span>
          </li>
          <li className='flex items-center gap-2 p-2 cursor-pointer hover:bg-[#00243a] rounded-lg'>
          <FaCog className='text-[18px]' />
          <span>Settings</span>
          </li>
          <li className='flex items-center gap-2 p-2 cursor-pointer hover:bg-[#00243a] rounded-lg'>
          <FaSignOutAlt className='text-[18px]' />
          <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
