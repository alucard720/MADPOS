
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import InventoryManagement from './components/inventory-management';
import './App.css';

const App: React.FC =()=>{
  return(

    <Routes>
      <Route path='/' element={<Layout />}/>
      <Route path='/inventory-management' element={<InventoryManagement />}/>

    </Routes>
  )
}


export default App;
