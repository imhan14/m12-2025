import React, { useState } from 'react'
import { NavLink } from 'react-router'
import Nhap from "@components/Input/Nhap";

const Job1 = () => {
  const [toggleCreate, setToggleCreate] = useState(false)
  return (
    <div>
      <h1>Data Job1</h1>
      <NavLink to="/loggedin">Back</NavLink>
      <button onClick={()=>setToggleCreate(!toggleCreate)}>Create</button>
      table
      <NavLink to="/">Logout</NavLink>
      {
        toggleCreate && <Nhap/>
      }
    </div>
  )
}

export default Job1