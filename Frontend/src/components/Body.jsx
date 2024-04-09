import React, { useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useDispatch} from 'react-redux'
import Login from './Login';
import Browse from './Browse';
import { addUser, removeUser } from '../utils/userSlice';
import { auth } from '../utils/firebase';

// import css from '../App.css';

const Body = () => {
  const disPatch = useDispatch();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/browse",
      element:<Browse/>
    },
  ]);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        const {uid , email , password} = user;
        console.log(uid,email);
        disPatch(addUser({uid:uid,email:email}));
        // ...
      } else {
        disPatch(removeUser());
      }
    });
  },[])

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
