
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import './App.css';

const App: React.FC =()=>{
  return(
    
    <Routes>
      <Route path='/' element={<Layout />}/>
    </Routes>
  )
}


export default App;
