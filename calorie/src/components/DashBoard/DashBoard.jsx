import React, { useRef, useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Navbar from '../Navbar';
import ChartsContainer from './DoughnutChart'; 
import obesityImg from '../../images/obesity.png';
import maintainImg from '../../images/weight.png'; 
import gainImg from '../../images/gain-weight.png'; 

const DashBoardContent = React.forwardRef((props, ref) => {
  const {_id} = JSON.parse(localStorage.getItem('User'));
  const BMI = localStorage.getItem('BMI')?.slice(0, 5);
  const BMR = localStorage.getItem('BMR');
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
          setWeeklyCalories(data?.weeklyCalories?.map(calorie => calorie.calories));
          setTotalCalories(data.totalCalories);
          setAverageCalories(data.averageCalories);
        }
      } catch (err) {
        console.log('error', err);
      }
    };
    fetchCalories();
  }, [_id]);



  return (
    <> <Navbar />
        <div ref={ref} className='border-2 flex flex-col border-gray-300 rounded mt-4 mx-4 pb-4 mb-4'>
            <div className='grid md:grid-cols-3 gap-4 mx-4'>
                <div className='border flex flex-row item-center border-gray-200 rounded my-2 md:my-4 py-4 pl-4 bg-green-200'>
                    <h1 className='text-5xl font-bold text-black'>
                        {totalCalories?.toFixed(0)}
                    </h1>
                    <div className=''>
                        <h1 className='ml-4'>
                            Weekly Calories intake
                        </h1>
                        {/* <h1 className='ml-4'>
                            Average Calories intake
                        </h1> */}
                    </div>
                </div>
                <div className='border flex flex-row item-center border-gray-200 rounded my-2 md:my-4 py-4 pl-4 bg-blue-200'>
                    <h1 className='text-5xl font-bold text-black'>
                       {averageCalories?.toFixed(0)}
                    </h1>
                    <div className=''>
                        <h1 className='ml-4'>
                            Average Calories intake
                        </h1>
                        {/* <h1 className='ml-4'>
                            Average Calories intake
                        </h1> */}
                    </div>
                </div>
                <div className='border flex flex-row item-center border-gray-200 rounded my-2 md:my-4 py-4 pl-4 bg-orange-200'>
                    <h1 className='text-5xl font-bold text-black'>
                        {BMI?BMI:0}
                    </h1>
                    <div className=''>
                        <h1 className='ml-4'>
                            Body Mass Index (BMI)
                        </h1>
                        {/* <h1 className='ml-4'>
                            Average Calories intake
                        </h1> */}
                    </div>
                </div>
            </div>
            <a href='/input'>
            <button className='border flex font-semibold text-gray-700 flex-row item-center w-28 border-gray-200 rounded ml-4 mb-2 py-4 pl-4 bg-red-200'>
                Add calorie
            </button>
            </a>
            <div>
                <ChartsContainer />
            </div>
            
            <div className='grid md:grid-cols-3 gap-8 mx-4 mt-4'>
                    <div className=' flex flex-col border border-gray-300 rounded py-4 px-2'>
                        <h1 className=' self-center text-2xl font-semibold text-gray-700'>Lose Weight</h1>
                        <img src={obesityImg} alt='lose' className='h-10 w-10 self-center' />
                        <h1 className=' text-xl font-semibold self-center'>Calorie intake per day</h1>
                        <h1 className=' text-xl font-semibold self-center'>{(BMR*1.1)?.toFixed(0)-200}-{(BMR*1.1)?.toFixed(0)}</h1>
                        <h1 className='text-md text-center'>This range of daily calories will enable you to lose 1-2 lb per week in a healthy and sustainable way.</h1>
                    </div>
                    <div className=' flex flex-col border border-gray-300 rounded py-4 px-2'>
                        <h1 className=' self-center text-2xl font-semibold text-gray-700'>Maintain weight</h1>
                        <img src={maintainImg} alt='lose' className='h-10 w-10 self-center' />
                        <h1 className=' text-xl font-semibold self-center'>Calorie intake per day</h1>
                        <h1 className=' text-xl font-semibold self-center'>{(BMR*1.375-200)?.toFixed(0)}-{(BMR*1.375)?.toFixed(0)}</h1>
                        <h1 className='text-md text-center'>This range of daily calories will enable you to maintain your current weight.</h1>
                    </div>
                    <div className=' flex flex-col border border-gray-300 rounded py-4 px-2'>
                        <h1 className=' self-center text-2xl font-semibold text-gray-700'>Gain weight</h1>
                        <img src={gainImg} alt='lose' className='h-10 w-10 self-center' />
                        <h1 className=' text-xl font-semibold self-center'>Calorie intake per day</h1>
                        <h1 className=' text-xl font-semibold self-center'>{(BMR*1.55)?.toFixed(0)-200}-{(BMR*1.55)?.toFixed(0)}</h1>
                        <h1 className='text-md text-center'>This range of daily calories will enable you to gain 1-2 lb per week.</h1>
                    </div>
            </div>
        </div>
    </>
  )
});

const DashBoard = () => {
  const componentRef = useRef();
  const [dataForCSV, setDataForCSV] = useState([]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Dashboard_Report',
    onAfterPrint: () => console.log('Print job completed!'),
  });

  useEffect(() => {
    const _id = JSON.parse(localStorage.getItem('User'))._id;
    const fetchDataForCSV = async () => {
      const res = await fetch(`https://calorie-tracker-mrnl.onrender.com/api/calorie/weeklyCalorieIntake/${_id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data) {
        setDataForCSV([
          {
            WeeklyCalories: data?.weeklyCalories?.map(calorie => calorie.calories).join(", "),
            TotalCalories: data.totalCalories,
            AverageCalories: data.averageCalories,
          }
        ]);
      }
    };
    fetchDataForCSV();
  }, []);

  const convertToCSV = (objArray) => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = `${Object.keys(array[0]).join(',')}\n`;

    array.forEach(item => {
      let line = '';
      for (let index in item) {
        if (line !== '') line += ',';

        line += item[index];
      }
      str += `${line}\n`;
    });

    return str;
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(dataForCSV);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'dashboard_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <DashBoardContent ref={componentRef} />
      <div className="flex space-x-2 ml-4 mb-4">
        <button onClick={handlePrint} className="bg-blue-500 text-white p-2 rounded">
          Download as PDF
        </button>
        <button onClick={downloadCSV} className="bg-green-500 text-white p-2 rounded">
          Download as CSV
        </button>
      </div>
    </>
  );
};

export default DashBoard;