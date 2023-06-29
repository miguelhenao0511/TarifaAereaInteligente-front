import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FlightDetail from './components/flights/FlightDetail';
import FlightList from './components/flights/FlightList';
import Sidebar from './components/navbar/NavBar';
import HomePage from './components/home/HomePage';
import LineChart from './components/flights/Dashboard';
import Login from './components/login/Login';
import Register from './components/register/Register';
import UserForm from './components/User/user';

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/flights" element={<LineChart />}/>
        <Route path="/find_flight" element={<FlightList />}/>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/profile" element={<UserForm />}/>
        <Route path="/" element={<HomePage />}/>
      </Routes>
    </Router>
  );
}

export default App;
