import React from 'react'
import logo from '../images/kcal.png'
const Navbar = () => {
  return (
    <div className='w-full shadow'>
        <div className='py-2 sm:py-3 ml-4 sm:ml-8 flex justify-start items-center'>
        <a href='/dashboard'>
          <img src={logo} alt='logo' className='w-10 h-10 sm:w-12 sm:h-12 '/>
          </a>  
          <h1 className='text-xl sm:text-2xl font-bold ml-2 sm:ml-4'>
             Calorie Tracker
          </h1>
        </div>
    </div>
  )
}

export default Navbar