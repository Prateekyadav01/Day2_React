import React, { useState } from 'react'
import Home from './Home'
import ImageBackground from "../assets/images/Background.jpg";



const Login = () => {

  const [isLogin , setIsLogin] =useState(true);
  const handleSignup =()=>{
    setIsLogin(!isLogin);
  }


  return (
    <div className=''>
      <Home/>
     <div className='absolute'>
     <img src={ImageBackground} alt="" className='relative' />
     </div>
      <form className='absolute bg-black w-3/12 p-12 mx-auto right-0 left-0 top-44 text-black rounded' >
        <h1 className='text-white font-bold flex justify-center items-center'>
          {!isLogin?'SignUp' : "SignIn"}
        </h1>
        <input type="text" name="firstName" className='p-4 my-4 w-full bg-gray-700' placeholder='firstName' />
        <input type="password" name="password" className='p-4 my-4 w-full bg-gray-700' placeholder='password' />
        {
          !isLogin &&(
           <div>
             <input type="text" name="email" placeholder='Email' className='p-4 my-4 w-full bg-gray-700'/>
            <input type="password" name="ConfirmPassword" className='p-4 my-4 w-full bg-gray-700' placeholder='ConfirmPassword' />
          
           </div>
          )
        }

      <button type="submit" className='text-white flex items-center justify-center bg-red-800 p-2 w-full'>
        {
          !isLogin ? "Signup" :"Signin"
        }
      </button>
        <p className='text-white cursor-pointer' onClick={handleSignup}>Don't have an account? Sign up</p>
      </form>
    </div>
  )
}

export default Login
