import React from 'react'
import { NavLink } from 'react-router'

const Job1 = () => {
  return (
    <div>
      <h1>Data Job1</h1>
      <NavLink to="/loggedin">Back</NavLink>
      <NavLink to="inp">Create</NavLink>
      table
      <NavLink to="/">Logout</NavLink>
    </div>
    
  )
}

export default Job1