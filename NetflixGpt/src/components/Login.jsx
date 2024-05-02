import React, { useRef, useState } from 'react'
import Home from './Home'
import ImageBackground from "../assets/images/Background.jpg";
// import { useReducer } from 'react';
import { validateData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const disPatch = useDispatch();
  const handleSignup = () => {
    setIsLogin(!isLogin);
  }

  const notify = () => toast("Wow so easy !");
  const email = useRef();
  const password = useRef();
  const name = useRef();
  console.log(email.current, password.current);

  const handleValidate = () => {

    // console.log(email.current.value,password.current.value);

    // let messsage = validateData(email.current.value, password.current.value);
    // // console.log(messsage)
    // setError(messsage);

    // if (messsage) return;

    if (!isLogin) {
      // createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      //   .then((userCredential) => {
      //     // Signed up 
      //     const user = userCredential.user;
      //     console.log(user);
      //     updateProfile(user,{
      //       displayName:name.current.value,
      //       photoURL:ImageBackground,

      //     }).then(()=>{
      //       const {uid , email , displayName,photoURL} = auth.currentUser;
      //       disPatch(
      //         addUser({
      //           uid:uid,
      //           email:email,
      //           displayName:displayName,
      //           photoURL:photoURL
      //         })
      //       )
      //     })




      // set up the backend here 

      //  else {
      //     console.log("no user");
      //   }
      // }
      // .catch((error) => {
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      //   setError(errorCode + "" + errorMessage);
      //   // ..
      // });

      axios.post("/api/v1/users/sign", {
      email:email.current.value,
      password:password.current.value,
      userName:name.current.value,
        
      },
        {
          
        })
        .then((response) => {
          const{email , password , userName} = response.data;
          disPatch(addUser({
            email,
            userName,
            password,
          }))
        })
        .catch((err) => {
          console.log(err)
        })
    }
    else {
      // signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      //   .then((userCredential) => {
      //     // Signed in 
      //     const user = userCredential.user;
      //     console.log(user);
      //   })
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     setError(errorCode + ': ' + errorMessage);
      //   });

      axios.post("/api/v1/users/login" , {
        email:email.current.value,
        password:password.current.value
      } )
      .then((response)=>{
        console.log(response.data)
        const {email,password} = response.data;
        disPatch(addUser({
          email,
          password,
        }))
        let user = {
          email,
          password,
        }
        localStorage.setItem('user' , JSON.stringify(user));
        // navigate('/browse')
        console.log(email,password);
      }).catch((e)=>{
        console.log(e)
      })

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
              <input type="text" name="firstName" className='p-4 my-4 w-full bg-gray-700 text-white' ref={name} placeholder='UserName' />

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
      <ToastContainer/>
    </div>
  )
}

export default Login
