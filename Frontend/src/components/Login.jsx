import React, { useRef, useState } from 'react'
import Home from './Home'
import ImageBackground from "../assets/images/Background.jpg";
// import { useReducer } from 'react';
import { validateData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import {useDispatch} from 'react-redux'
import { addUser } from '../utils/userSlice';
import {useNavigate} from 'react-router-dom'


const Login = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const disPatch = useDispatch();
  const navigate = useNavigate();
  const handleSignup = () => {
    setIsLogin(!isLogin);
  }


  const email = useRef();
  const password = useRef();

  const handleValidate = () => {

    // console.log(email.current.value,password.current.value);

    let messsage = validateData(email.current.value, password.current.value);
    console.log(messsage)
    setError(messsage);

    if (messsage) return;

    if (!isLogin) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          console.log(user);

          

          if (auth) {
            disPatch(addUser({
              id: auth.uid,
              name: auth.displayName,
              email: auth.email,
              photoURL: auth.photoURL
            }))
            navigate('/browse')
;            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            // ...
          } else {
            // No user is signed in.
            console.log("no user");
          }

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode + "" + errorMessage);
          // ..
        });
    }
    else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          disPatch(addUser({
            id: auth.uid,
            name: auth.displayName,
            email: auth.email,
            photoURL: auth.photoURL
          }))
          navigate('/browse')
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode + ': ' + errorMessage);
        });
    }
  }

  return (
    <div className=''>
      <Home />
      <div className='absolute'>
        <img src={ImageBackground} alt="" className='relative' />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className='absolute bg-black w-3/12 p-12 mx-auto right-0 left-0 top-44 text-black rounded' >
        <h1 className='text-white font-bold flex justify-center items-center'>
          {!isLogin ? 'SignUp' : "SignIn"}
        </h1>
        <input type="text" name="email" placeholder='Email' ref={email} className='p-4 my-4 w-full bg-gray-700 text-white' />
        <input type="password" name="password" className='p-4 my-4 w-full bg-gray-700 text-white' ref={password} placeholder='password' />
        {
          !isLogin && (
            <div>
              <input type="text" name="firstName" className='p-4 my-4 w-full bg-gray-700 text-white' placeholder='UserName' />

              {/* <input type="password" name="ConfirmPassword" className='p-4 my-4 w-full bg-gray-700 text-white' placeholder='ConfirmPassword' /> */}

            </div>
          )
        }
        <h2 className='text-red-500 mb-2'>{error}</h2>
        <button type="submit" onClick={handleValidate} className='text-white flex items-center justify-center bg-red-800 p-2 w-full'>
          {
            !isLogin ? "Signup" : "Signin"
          }
        </button>
        <p className='text-white cursor-pointer mt-3' onClick={handleSignup}>Don't have an account?{
          !isLogin ? "Signup" : "Signin"
        }</p>
      </form>
    </div>
  )
}

export default Login
