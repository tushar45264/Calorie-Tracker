import React, { useState } from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const Input = () => {
  const {_id,name} = JSON.parse(localStorage.getItem('User'));
  const [meal, setMeal] = useState('');
  const navigate =useNavigate();
  const [calories, setCalories] = useState('');

  
  const handleSubmit = async(e) => {
    e.preventDefault(); 
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    console.log(date)
    try{
      const response = await fetch(`https://calorie-tracker-mrnl.onrender.com/api/calorie/calorieIntake/${_id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({meal,calories,date})
      })
      const data = await response.json();
      if(data){
        navigate('/dashboard')
        console.log(data);
      }
    } catch(err){
      console.error('error',err);
    }

    setMeal('');
    setCalories('');
  };

  return (
    <>
      <Navbar />
      <div className='flex flex-col justify-center items-center mt-4'>
        <h1 className='text-4xl font-semibold text-gray-700'>
          Hey, {name?name:'User'}
        </h1>
        <h2 className='text-xl font-semibold text-gray-600 mt-4'>
          Enter Your today's calorie intake!
        </h2>
        <div className='border rounded border-gray-200 mt-8'>
          <form onSubmit={handleSubmit} className='flex flex-col my-10 mx-10'>
            <label htmlFor='meal' className='text-gray-600 text-2xl font-semibold px-4 py-2'>Meal</label>
            <input 
              id='meal'
              type='text'
              className='w-80 border border-gray-200 h-10 px-4 rounded'
              placeholder='Enter your meal'
              value={meal}
              onChange={(e) => setMeal(e.target.value)}
            />
            <label htmlFor='calories' className='text-gray-600 text-2xl mt-2 font-semibold px-4 py-2'>Calorie Intake</label>
            <input 
              id='calories'
              type='text'
              className='w-80 border border-gray-200 h-10 px-4 rounded'
              placeholder='Enter your calorie intake'
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
            <button type='submit' className='mt-8 w-80 h-10 self-center bg-blue-500 text-white rounded'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Input;
