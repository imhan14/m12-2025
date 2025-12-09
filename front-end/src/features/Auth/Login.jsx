import React, { useState } from 'react'
import { Button } from '@headlessui/react'
import { NavLink } from 'react-router'
import bglogin from '@assets/bglogin.jpg'
import googleColor from '@assets/google-color.png'
import Input from '@ui/Input'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [checkValid, setCheckValid] = useState("")

const handleLogin = async () => {
  if(username === "" || password === ""){
    setCheckValid("Username or password must not empty")
    return
  }
    const credentials = { username, password }; 

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        
        const data = await response.json();

        if (response.ok) {
            const token = data.token;
            localStorage.setItem('authToken', token);
            

            window.location.href = '/loggedin'; 
        } else {
            // alert('Đăng nhập thất bại: ' + data.message);
            setCheckValid("Wrong username or password")
        }
    } catch (error) {
        console.error('Lỗi kết nối:', error);
        alert('Không thể kết nối tới server.');
    }
};
  return (
    <div className='h-screen flex'>
      <img className='w-full h-full fixed object-cover object-center' src={bglogin} />
      <form className='sm:w-110 sm:h-110 w-full h-full flex flex-col justify-between mx-auto my-auto relative z-99 p-10 bg-gray-50 rounded-2xl'> 
        <img className='h-10 object-contain' src={googleColor} />
        <h1 className='mx-auto text-5xl font-bold'>Login</h1>
        <div className='flex flex-col gap-5'>
          <Input value={username} onChange={setUsername} label='Username' />
          <Input value={password} onChange={setPassword} label='Password' type='password'/>
          {checkValid && <span className='text-red-500 text-sm -my-5'>{checkValid}</span>}
        </div>
        {/* <NavLink className="w-full" to="/loggedin"> */}
          <Button 
            className="w-full justify-center inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
            onClick={()=>handleLogin() }
          >
            Login
          </Button>
        {/* </NavLink> */}
      </form>
    </div>
  )
}

export default Login