import React, { useState } from 'react'
import { NavLink } from 'react-router'
import Nhap from "@components/Input/Nhap";

const Job1 = () => {
  const [toggleCreate, setToggleCreate] = useState(false)
  return (
    <div className='p-5 bg-gray-200 h-screen'>
      <h1 className='text-2xl'>Data Job1</h1>
      <div className='flex mt-5 mb-5 gap-2'>
        <NavLink to="/loggedin" className='border max-w-max p-1'>Back</NavLink>
        <button className='border max-w-max p-1 hover:cursor-pointer' onClick={()=>setToggleCreate(!toggleCreate)}>Create</button>
        <NavLink to="/" className='border max-w-max p-1'>Logout</NavLink>
      </div>
        {
          toggleCreate && <Nhap setToggleCreate={setToggleCreate}/>
        }
      table
      1
      1
      2
      <p>sdf</p>
  
    </div>
  )
}

export default Job1