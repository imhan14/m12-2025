import React, { useRef } from 'react'
const baseStyles = ""

const variantStyles ={
    primary:"block w-full border rounded-md h-10 pl-3 hover:shadow"
}
const sizeStyles ={

}

const Input = ({
    label = "Label",
    type = "text", 
    variant = "primary",
    size = "md", 
    className = "",
    onChange,
    placeholder = " ",
    value,
    errorMessage="",
    ...props
}) => {
    const inputClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} peer ${errorMessage && "border-red-400"}`
    const handleChange = (e)=>{
        if(onChange){
            onChange(e.target.value)
        }
    }
    const inputRef = useRef(null)
    const handleClick = ()=>{
        if(inputRef && inputRef.current) inputRef.current.focus();
    }
    return (
    <div>
        <div className='relative'>
        <input 
            className={`${inputClasses}`} 
            type={type} 
            placeholder={placeholder} 
            value={value} 
            onChange={handleChange} 
            ref={inputRef}
            {...props} 
        />
        <label 
            className="absolute bg-gray-50 text-sm text-body duration-100 transform 
            -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-primary px-2 
            peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 
            peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 
            peer-focus:scale-75 peer-focus:-translate-y-4 
            rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3 cursor-text" 
            onClick={handleClick}
        >
            {label}
        </label>
    </div>
    <label className='text-red-500 text-sm'>{errorMessage && "* " + errorMessage}</label>
    </div>
  )
}

export default Input
          {/* <div className='relative'>
            <input className='block peer w-full border rounded-md h-10 pl-3 hover:shadow' id="username" placeholder=' ' value={username} onChange={(e)=>setUsername(e.target.value)} />
            <label className="absolute bg-gray-50  text-sm text-body duration-100 transform 
            -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-primary px-2 
            peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 
            peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 
            peer-focus:scale-75 peer-focus:-translate-y-4 
            rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3" for="username">Username</label>
          </div> */}
