import React from 'react'
import { Button, Input } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'
import { NavLink } from 'react-router'

const Login = () => {
  return (
    <div>
      <form > 
        <h1>Login</h1>
        <div className='flex flex-col'>
          <label>Username</label> <Input type="text" name="full_name" as={Fragment}>
      {({ focus, hover }) => <input className={clsx('border', focus && 'bg-blue-100', hover && 'shadow')} placeholder='username' />}
    </Input>
          <label>Password</label> <Input type="text" name="full_name" as={Fragment}>
      {({ focus, hover }) => <input className={clsx('border', focus && 'bg-blue-100', hover && 'shadow')} placeholder='password' />}
    </Input>
        </div>
          <NavLink to="/loggedin">
            <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700">
              Save changes
            </Button>
          </NavLink>
      </form>
    </div>
  )
}

export default Login