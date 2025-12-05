import React from 'react'
import { NavLink, Outlet } from 'react-router'

const LoggedIn = () => {
  return (
    <div>
        <h1>Logged In</h1>
        <div className='flex flex-col'>
            <NavLink to="job1">Job option 1</NavLink>
            <NavLink to="#">Job option 2</NavLink>
            <NavLink to="#">Job option 3</NavLink>
        </div>
        <NavLink to="/">
            <button>Logout</button>
        </NavLink>
    </div>
  )
}

export default LoggedIn