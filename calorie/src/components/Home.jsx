import React, { useState } from 'react';
import Kal from '../images/cal.png';
import man from '../images/man.png';
import woman from '../images/woman.png';
import Weight from '../images/lose-weight.png'
import Height from '../images/height.png'
import Age from '../images/age.png'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('User'));
  const navigate = useNavigate();
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  
  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleWeightChange = (event) => {
    console.log(event.target.value)
    setWeight(event.target.value);
  };

  const selectGender = (selectedGender) => {
    console.log(selectedGender)
    setGender(selectedGender);
  };

  const handleSubmit = async(event) => {
    
    event.preventDefault(); 
   try {
    const res = await fetch(`http://localhost:5000/api/user/update/${user?._id}`, {
      method: 'PATCH',
      credentials:'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({gender, age, height, weight})
    })
    const data = await res.json();
    if(data)
    { 
       const height =data.updatedUser.height;
      const weight =data.updatedUser.weight
      const BMI =weight/(height*height/10000);
      const age=data.updatedUser.age;
      const BMR=66.47+((13.75*weight))+((5.003*height))-(6.755&age);
      localStorage.setItem('BMI', BMI);
      localStorage.setItem('BMR', BMR);
      navigate('/input');
      console.log(weight)

    }
   } catch (error) {
    console.log(error)
   }
  };

  return (
    <>
    <Navbar />
    <div className='mt-2 flex flex-col justify-center mb-10'>
      <div className='flex flex-col justify-center'>
        <div className='flex flex-row justify-center items-center gap-2'>
          <img src={Kal} alt='KalLogo' className=' animate-bounce w-10 h-10 sm:w-12 sm:h-12'/>
          <h1 className='text-2xl md:text-2xl lg:text-4xl font-bold text-gray-800 mb-4'>Daily Calorie Intake Calculator</h1>
        </div>
        <h1 className='w-5/6 lg:w-1/2 text-center self-center mb-4'>
          Feel free to enter your information below in the Daily Calorie Intake calculator to receive your personal current daily calorie intake, and what your body needs to fuel itself during the day with your routine!
        </h1>
      </div>
      <div className='mx-12 lg:ml-56 grid md:grid-cols-2 grid-cols-1 gap-4 lg:mr-56 mt-2'>

      <div className='flex flex-col justify-center rounded border-2 border-gray-400'>
  <h1 className='text-2xl font-semibold text-gray-700 my-4 self-center'>
    What is your sex?
  </h1>
  <div className='flex flex-row justify-center'>
    <div className='flex flex-col justify-center mr-16'>
      <img src={man} alt='man' className='md:h-20 md:w-20 h-16 w-16' />
      <button 
        onClick={() => selectGender('Male')} 
        className={`border rounded my-2 px-4 py-2 ${gender === 'Male' ? 'bg-blue-500 text-white' : 'hover:bg-gray-300 bg-gray-200 text-gray-800'}`}>
        Male
      </button>
    </div>
    <div className='flex flex-col'>
      <img src={woman} alt='woman' className='md:h-20 md:w-20 h-16 w-16' />
      <button 
        onClick={() => selectGender('Female')} 
        className={`border rounded my-4 px-4 py-2 ${gender === 'Female' ? 'bg-pink-500 text-white' : 'hover:bg-gray-300 bg-gray-200 text-gray-800'}`}>
        Female
      </button>
    </div>
  </div>
</div>


        {/* Age Input */}
        <div className='flex flex-col justify-center rounded border-2 border-gray-400'>
          <h1 className='text-2xl font-semibold text-gray-700 top-0 self-center my-2 md:my-0'>
            How old are you?
          </h1>
          <img src={Age} alt='age' className='h-20 w-20 self-center my-2' />
          <form className="max-w-sm mx-auto mb-4 md:mb-0">
            <input type="number" value={age} onChange={handleAgeChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="0" required />
            <h1 className='text-gray-600'>Years</h1>
          </form>
        </div>

        {/* Height Input */}
        <div className='flex flex-col justify-center rounded border-2 border-gray-400'>
          <h1 className='text-2xl font-semibold text-gray-700 top-0 self-center mt-4'>
            How tall are you?
          </h1>
          <img src={Height} alt='age' className='h-20 w-20 self-center my-2' />
          <form className="max-w-sm mx-auto mb-4">
            <input type="number" value={height} onChange={handleHeightChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="0" required />
            <h1 className='text-gray-600'>cm</h1>
          </form>
        </div>

        {/* Weight Input */}
        <div className='flex flex-col justify-center rounded border-2 border-gray-400'>
          <h1 className='text-2xl font-semibold text-gray-700 top-0 self-center mt-4'>
            How much do you weigh?
          </h1>
          <img src={Weight} alt='age' className='h-20 w-20 self-center my-2' />
          <form className="max-w-sm mx-auto mb-8">
            <input type="number" value={weight} onChange={handleWeightChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="0" required />
            <h1 className='text-gray-600'>kg</h1>
          </form>
        </div>
      </div>
      <div className='flex justify-center mt-4'>
      <button onClick={handleSubmit} className=' bg-blue-500 w-1/3 border rounded py-2 px-4 font-semibold text-white hover:bg-blue-600'>
            Submit
        </button>
      </div>
    </div>
    </>
  )
}

export default Home;
