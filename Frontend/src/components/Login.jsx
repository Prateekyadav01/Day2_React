import React from 'react'
import Home from './Home'
import ImageBackground from "../assets/images/Background.jpg";



const Login = () => {
  return (
    <div>
      <Home/>
      <img src={ImageBackground} alt="" />
      <h1 className='flex bg-red-900'>Login</h1>
    </div>
  )
}

export default Login
