import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FlightDetail from './components/flights/FlightDetail';
import FlightList from './components/flights/FlightList';
import Sidebar from './components/navbar/NavBar';

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/flights" element={<FlightList />}/>
        <Route path="/detalle-vuelo" element={<FlightDetail />}/>
      </Routes>
    </Router>
  );
}

export default App;
