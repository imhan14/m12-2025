import React from 'react'
import clsx from 'clsx'
import { Fragment } from 'react'
import { Button, Input } from '@headlessui/react'
const Nhap = () => {
  return (
    <div>
      <label>Field 1</label> <Input type="text" name="full_name" as={Fragment}>
            {({ focus, hover }) => <input className={clsx('border', focus && 'bg-blue-100', hover && 'shadow')} placeholder='username' />}
          </Input>
      <label>filed 2</label> <Input type="text" name="full_name" as={Fragment}>
            {({ focus, hover }) => <input className={clsx('border', focus && 'bg-blue-100', hover && 'shadow')} placeholder='username' />}
          </Input>
    </div>
  )
}

export default Nhap