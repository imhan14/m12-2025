import React from 'react'
import { Button, Input } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'
import { NavLink } from 'react-router'
import bglogin from '@assets/bglogin.jpg'
import googleColor from '@assets/google-color.png'

const Login = () => {
  return (
    <div className='h-screen flex'>
      <img className='w-full h-full fixed object-cover object-center' src={bglogin} />
      <form className='sm:w-110 sm:h-110 w-full h-full flex flex-col justify-between mx-auto my-auto relative z-99 p-10 bg-white/70 rounded-2xl'> 
        <img className='h-10 object-contain' src={googleColor} />
        <h1 className='mx-auto text-5xl font-bold'>Login</h1>
        <div className='flex flex-col gap-5'>
          <Input type="text" name="username" as={Fragment}>
              {({ focus, hover }) => <input className={clsx('border rounded-md h-10 pl-3', focus && 'bg-blue-100', hover && 'shadow')} placeholder='username' />}
          </Input>
          <Input type="password" name="password" as={Fragment}>
              {({ focus, hover }) => <input className={clsx('border rounded-md h-10 pl-3', focus && 'bg-blue-100', hover && 'shadow')} placeholder='password' />}
          </Input>
        </div>
        <NavLink className="w-full" to="/loggedin">
          <Button className="w-full justify-center inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700">
            Login
          </Button>
        </NavLink>
      </form>
    </div>
  )
}

export default Login