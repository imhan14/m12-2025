import React from 'react'
import { NavLink, Outlet } from 'react-router'

const LoggedIn = () => {
  
  return (
    <div className='p-5 bg-gray-100 w-full h-screen'>
        <h1 className='text-2xl'>Logged In</h1>
        <div className='flex flex-col mt-5 gap-2'>
            <NavLink to="job1" className='border max-w-max p-1'>Job option 1</NavLink>
            <NavLink to="job2" className='border max-w-max p-1'>Job option 2</NavLink>
            <NavLink to="job3" className='border max-w-max p-1'>Job option 3</NavLink>
        </div>
        <NavLink to="/" className='mt-5'>
            <button className='mt-5 p-1 border bg-gray-300'>Logout</button>
        </NavLink>
    </div>
  )
}

export default LoggedIn