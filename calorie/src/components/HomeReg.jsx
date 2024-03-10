import React from 'react'
import Right from '../images/correct.png'
import Kal from '../images/cal.png'
import Register from './Register'

const HomeLogin = () => {
  return (
    <div className=' flex flex-row '>

        <div className=' h-screen w-full lg:w-1/2'>
        <div className='flex items-center lg:hidden bg-blue-700 pb-2 shadow-md'>
        <img src={Kal} alt='KalLogo' className='block lg:hidden w-10 h-10 sm:w-12 sm:h-12 ml-4 mt-2'/>
            <h1 className=' text-3xl font-bold text-white'>Calorie Tracker</h1>
        </div>
            <Register />
        </div>
        <div className=' h-screen w-1/2  flex-col hidden bg-blue-700 lg:block'>
        <div className=' flex flex-row items-center justify-start mt-64 ml-16 gap-4'>
        <img src={Kal} alt='KalLogo' className='w-10 h-10 sm:w-12 sm:h-12 animate-bounce hover:animate-none'/>
        <h1 className='text-3xl font-bold text-white text-left'>
                Calorie Tracker
        </h1>
        </div>
        <h1 className='text-4xl font-bold text-white text-left ml-16'>
        Explore the Calorie Tracker.
        </h1>
        <h1 className='text-md text-white text-left ml-16 '>
        Millions of designers and agencies around the world showcase their portfolio work on Flowbite - the home to the world’s best design and creative professionals
        </h1>
        </div>
        
    </div>
  )
}

export default HomeLogin