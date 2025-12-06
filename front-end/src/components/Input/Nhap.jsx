import React from 'react'
import clsx from 'clsx'
import { Fragment } from 'react'
import { Button, Input } from '@headlessui/react'
const Nhap = ({setToggleCreate}) => {
  return (
    <div className='flex flex-col absolute gap-3 bg-white p-5 border mx-auto'>
      <div>
        <span className='mr-2'>Field 1</span>
        <Input type="text" name="full_name" as={Fragment}>
          {({ focus, hover }) => <input className={clsx('border', focus && 'bg-blue-100', hover && 'shadow')} placeholder='username' />}
        </Input>
      </div>
      <div>
        <span className='mr-2'>Field 2</span>
        <Input type="text" name="full_name" as={Fragment}>
          {({ focus, hover }) => <input className={clsx('border', focus && 'bg-blue-100', hover && 'shadow')} placeholder='username' />}
        </Input>
      </div>
      <div>
        <span className='mr-2'>Field 2</span>
        <Input type="text" name="full_name" as={Fragment}>
          {({ focus, hover }) => <input className={clsx('border', focus && 'bg-blue-100', hover && 'shadow')} placeholder='username' />}
        </Input>
      </div>

      <button className='border hover:bg-gray-100 hover:cursor-pointer' onClick={()=>setToggleCreate(false)}>OK</button>
      <button className='border hover:bg-red-200 hover cursor-pointer' onClick={()=>setToggleCreate(false)}>Cancel</button>
    </div>
  )
}

export default Nhap