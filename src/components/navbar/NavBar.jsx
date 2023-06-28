import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

const Sidebar = () => 

<Navbar className='m-2 ml-2' bg="light" expand="lg">
<Navbar.Brand href="home">Mi Aplicación</Navbar.Brand>
<Navbar.Toggle aria-controls="basic-navbar-nav" />
<Navbar.Collapse id="basic-navbar-nav">
  <Nav className="mr-auto">
    <Nav.Link href="home">Inicio</Nav.Link>
    <Nav.Link href="flights">Vuelos</Nav.Link>
    <Nav.Link href="find_flight">Buscar</Nav.Link>
    <Nav.Link href="#profile">Perfil</Nav.Link>
  </Nav>
</Navbar.Collapse>
</Navbar>

export default Sidebar;
