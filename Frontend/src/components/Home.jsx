import React from 'react'
import logo from '../assets/images/Netflix_Logo_PMS.png'
import {useSelector} from 'react-redux'

const Home = () => {
  const selector = useSelector((state)=>{ return state.user});
  console.log(selector);
  return (
    <div>
      <img src={logo} alt="logo" className='absolute left-0 w-3/12 z-10' />
    </div>
  )
}

export default Home
