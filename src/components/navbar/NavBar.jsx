import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';

const Sidebar = () => {
  const auth = Cookies.get('auth');
  const navigate = useNavigate();

  function logout(){
    Cookies.remove('auth')
    navigate('/home')
  }
  return (
    <Navbar className='m-2 ml-2' bg="light" expand="lg">
      <Navbar.Brand href="home">PREDIAPP VUELO$</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="home">Inicio</Nav.Link>
          <Nav.Link href="flights">Vuelos</Nav.Link>
          <Nav.Link href="find_flight">Buscar</Nav.Link>         
          {auth != null ? <Nav.Link href="#profile">Perfil</Nav.Link> : null}
          {auth != null ? <Nav.Link href="#" onClick={()=>logout()}>Logout</Nav.Link> : null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>)
}


export default Sidebar;
