import React, { useEffect } from 'react';
import logo from '../assets/images/Netflix_Logo_PMS.png';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';

const Home = () => {
  const navigate = useNavigate();
  const disPatch = useDispatch();
  const user = useSelector((store) => store.user);
 


  const handleLogout = () => {
   signOut(auth).then(()=>{})
   .catch((err) => {
    console.log(err);
    // navigate to error page
    })
  };


  useEffect(() => {
    const unSubscribe =onAuthStateChanged(auth, (user) => {
      if (user) {

        const { uid, email , displayName , photoURL } = user;
        console.log(uid, email);
        disPatch(addUser({ uid: uid, email: email, displayName:displayName , photoURL : photoURL }));
        console.log("user is navigate");
        navigate("/browse");
        // ...
      } else {
        disPatch(removeUser());
        navigate("/");
      }
    });
    return ()=> unSubscribe();
  }, [])

  return (
    <div class="relative">
    <div class="absolute top-0 left-0 right-0 px-4 py-2 flex justify-between items-center bg-gray-900 text-white">
      <img src={logo} alt="logo" class="w-24" />
      {user && (
        <div class="flex items-center">
          <img src={user?.photoURL} alt="imageUser" class="w-12 h-12 rounded-full" />
          <button onClick={handleLogout} class="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white">Sign Out</button>
        </div>
      )}
    </div>
  </div>
  
  );
};

export default Home;
