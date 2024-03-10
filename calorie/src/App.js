import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import HomeLogin from './components/HomeReg';
import HomeRegister from './components/HomeLog';
import Input from './components/DashBoard/Input';
import DashBoard from './components/DashBoard/DashBoard';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path='/' element={<HomeRegister />}/>
           <Route path='/signup' element={<HomeLogin />}/>
           <Route path='/details' element={<Home />}/>
           <Route path='/input' element={<Input />}/>
           <Route path='/dashboard' element={<DashBoard />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
