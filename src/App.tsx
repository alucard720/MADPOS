
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import InventoryManagement from './components/inventory-management';
import LoginScreen from './components/LoginScreen';

import './App.css';

const App: React.FC =()=>{
 const navigate = useNavigate();
  const handlelogin = (username: string, password: string) => {
    console.log(username, password);
  }
 
  return(

    <Routes>
      <Route path='/login' element={<LoginScreen onLogin={handlelogin} />}/>
      <Route path='/layout' element={<Layout />}/>
      <Route path='/inventory-management' element={<InventoryManagement />}/>
      

    </Routes>
  )
}


export default App;
