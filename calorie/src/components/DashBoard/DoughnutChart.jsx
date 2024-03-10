import React, { useEffect, useState } from 'react';
import LineChart from './LineChart';
import DoughnutPieChart from './DoughnutPieChart';

const ChartsContainer = () => {
    const {_id} = JSON.parse(localStorage.getItem('User'));
    const [weeklyCalories, setWeeklyCalories] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);
    const [averageCalories, setAverageCalories] = useState(0);

    useEffect(() => {
      const fetchCalories = async () => {
        try {
          const res = await fetch(`https://calorie-tracker-mrnl.onrender.com/api/calorie/weeklyCalorieIntake/${_id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await res.json();
          if (data) {
            const weeklyIntake = data?.weeklyCalories.map(calorie => calorie.calories);
            setWeeklyCalories(weeklyIntake);
            setTotalCalories(data.totalCalories);
            setAverageCalories(data.averageCalories);
          }
        } catch (err) {
          console.log('error', err);
        }
      };
      fetchCalories();
    }, [_id]);

    const chartStyle = { height: '150' };
    return (
      <div className='flex flex-col md:flex-row justify-center mx-4'>
        <div className='border self-center border-gray-300 rounded md:w-2/3 mr-2 '>
          <LineChart style={chartStyle} data={weeklyCalories} />
        </div>
        <div className='border border-gray-300 mx-4 rounded mt-2 md:mt-0 md:w-1/3'>
          <DoughnutPieChart data={[totalCalories, averageCalories]} chartType="doughnut" />
        </div>
      </div>
    );
};

export default ChartsContainer;
