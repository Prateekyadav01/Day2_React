import React, { useRef, useState } from 'react'
import Home from './Home'
import ImageBackground from "../assets/images/Background.jpg";
// import { useReducer } from 'react';
import { validateData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
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
  const name = useRef();

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
          updateProfile(user,{
            displayName:name.current.value,
            photoURL:"https://www.google.com/imgres?q=images&imgurl=https%3A%2F%2Fimages.ctfassets.net%2Fhrltx12pl8hq%2F28ECAQiPJZ78hxatLTa7Ts%2F2f695d869736ae3b0de3e56ceaca3958%2Ffree-nature-images.jpg%3Ffit%3Dfill%26w%3D1200%26h%3D630&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fdiscover%2Ffree-nature-images&docid=uEeA4F2Pf5UbvM&tbnid=0E5dDA82VanW3M&vet=12ahUKEwjoh4icnbeFAxUMZ2wGHZqECYAQM3oECBYQAA..i&w=1200&h=630&hcb=2&ved=2ahUKEwjoh4icnbeFAxUMZ2wGHZqECYAQM3oECBYQAA",

          }).then(()=>{
            const {uid , email , displayName,photoURL} = auth.currentUser;
            disPatch(
              addUser({
                uid:uid,
                email:email,
                displayName:displayName,
                photoURL:photoURL
              })
            )
          })
        //  else {
        //     console.log("no user");
        //   }
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
    </div>
  )
}

export default Login
