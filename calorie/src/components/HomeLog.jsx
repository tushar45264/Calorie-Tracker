import React from 'react'
import Login from './Login'
import Right from '../images/correct.png'
import Kal from '../images/cal.png'
import check from '../images/check.png'

const HomeRegister = () => {
  return (
    <div className=' flex flex-row'>
        <div className=' hidden h-screen lg:block w-1/2 bg-blue-600'>
        <div className=' flex flex-row items-center mt-12 ml-16 gap-4'>
        <img src={Kal} alt='KalLogo' className='w-10 h-10 sm:w-16 sm:h-16 animate-bounce hover:animate-none'/>
        <h1 className='text-5xl text-white font-bold  text-center'>
                Calorie Tracker
        </h1>
        </div>
        <div className=' flex flex-col ml-24 mt-4'>
        <div className=' ml-8 mb-4 mt-4'>
                <div className='flex flex-row items-center'>
                <img src={Right} alt='right' className='h-6 w-6 mr-2' />
                <h1 className='text-white text-2xl font-semibold'>
                Get started quickly
                </h1>
                </div>
                <h1 className='text-white ml-8'>
                Integrate with developer-friendly APIs or choose low-code.
                </h1>
            </div>

            <div className=' ml-8 mb-4 mt-2'>
                <div className='flex flex-row items-center'>
                <img src={Right} alt='right' className='h-6 w-6 mr-2' />
                <h1 className='text-white text-2xl font-semibold'>
                Get started quickly
                </h1>
                </div>
                <h1 className='text-white ml-8'>
                Integrate with developer-friendly APIs or choose low-code.
                </h1>
            </div>

            <div className='ml-8 mb-4 mt-2'>
                <div className='flex flex-row items-center'>
                <img src={Right} alt='right' className='h-6 w-6 mr-2' />
                <h1 className='text-white text-2xl font-semibold'>
                Get started quickly
                </h1>
                </div>
                <h1 className='text-white ml-8'>
                Integrate with developer-friendly APIs or choose low-code.
                </h1>
            </div>
        </div>
            

        </div>
        <div className=' h-screen w-full lg:w-1/2'>
        <div className='flex items-center lg:hidden bg-blue-700 pb-2 shadow-md'>
        <img src={Kal} alt='KalLogo' className='block lg:hidden w-10 h-10 sm:w-12 sm:h-12 ml-4 mt-2'/>
            <h1 className=' text-3xl font-bold text-white'>Calorie Tracker</h1>
        </div>
            <Login />
        </div>
    </div>
  )
}

export default HomeRegister