import React, { useEffect } from 'react';
import logo from '../assets/images/Netflix_Logo_PMS.png';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { logout } from '../utils/authApis';

const Home = () => {
  const navigate = useNavigate();
  const disPatch = useDispatch();
  const user = useSelector((store) => store?.user);

  // console.log(user);

  const ans =  JSON.parse(localStorage.getItem('user'));

  const handleLogout = async () => {
    console.log(ans);
      const data = await logout(ans.email);
      console.log(data);
      if(data) {
        localStorage.removeItem('user');
        disPatch(removeUser());
        navigate("/");
        console.log(ans);
      }
  };
  

  useEffect(() => {
  
    

  
    // const unSubscribe = onAuthStateChanged(auth, (user) => {
    //   if (user) {

    //     const { email } = user;
    //     console.log(email);
    //     disPatch(addUser({ email: email }));
    //     console.log("user is navigate");
    //     navigate("/browse");
    //     // ...
    //   } else {
    //     disPatch(removeUser());
    //     navigate("/");
    //   }
    // });
    // return () => unSubscribe();

    if(ans){
    
      navigate("/browse");
    }
    else{
      disPatch(removeUser());
      navigate("/");
    }

  }, [user,navigate])

  return (
    <div class="relative ">
     
      <div class="absolute top-0 left-0 right-0 px-4 py-2 bg-gradient-to-r from-black flex justify-between items-center text-white">
        <img src={logo} alt="logo" class="w-24" />
        {ans && (
          <div class="flex items-center">
            <img src={user?.photoURL} alt="imageUser" class="w-12 h-12 rounded-full" />
            <button onClick={handleLogout} class=" mt-10 ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white">Sign Out</button>
          </div>
        )}
      </div>
    </div>

  );
};

export default Home;
