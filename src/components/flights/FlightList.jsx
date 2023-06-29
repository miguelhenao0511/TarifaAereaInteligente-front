import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import FlightDetail from './FlightDetail';
import Cookies from 'js-cookie';

function FlightList() {
  const [flightList, setFlightList] = useState([]);
  const [filterAirline, setFilterAirline] = useState('');
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [filterSteps, setFilterSteps] = useState('1');
  const [filterDate, setFilterDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [airlines, setAirlines] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const auth = Cookies.get('auth');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/airlines', {
      method: 'GET',
      headers: { 'auth': auth }
    })
      .then(response => response.json())
      .then(data => {
        // Trabajar con los datos recibidos
        setAirlines(data);
      })
      .catch(error => {
        // Manejar errores
        setAirlines([]);
      });


    fetch('http://127.0.0.1:8000/routes', {
      method: 'GET',
      headers: { 'auth': auth }
    })
      .then(response => response.json())
      .then(data => {
        // Trabajar con los datos recibidos
        setDestinations(data);
      })
      .catch(error => {
        // Manejar errores
        setDestinations([]);
      });
  }, []);

  const handleFilterSubmit = async () => {
    setIsLoading(true);
    try {
      const body = {
        "airlines": [filterAirline],
        "route_from": filterFrom,
        "route_to": filterTo,
        "steps": parseInt(filterSteps),
        "date": filterDate,
        "days": 1
      }
      const response = await fetch("http://127.0.0.1:8000/prices",{
        method: 'POST',
        body: JSON.stringify(body)        
      });
      const data = await response.json();
      const flights = []
      data.prices.forEach(airlinePrices => {
        airlinePrices.prices.forEach((airlinePrice, index) =>{
          flights.push(
            {
              "airline": airlinePrices.airline,
              "source": data.route_from,
              "destiny": data.route_to,
              "steps": data.steps,
              "date": data.dates[index],
              "price": airlinePrice,
            }
          )          
        })        
      });

      setFlightList(flights);
    } catch (error) {
      console.error('Error al obtener la lista de vuelos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterAirlineChange = (event) => {
    setFilterAirline(event.target.value);
  };

  const handleFilterFromChange = (event) => {
    setFilterFrom(event.target.value);
  };

  const handleFilterToChange = (event) => {
    setFilterTo(event.target.value);
  };

  const handleFilterStepsChange = (event) => {
    setFilterSteps(event.target.value);
  };

  const handleFilterDateChange = (event) => {
    setFilterDate(event.target.value);
  };

  return (

    <div className='m-3'>
      <h3>A continuacion podras realizar tu consulta y obtendras un prediccion</h3>
        <Form.Group controlId="filterSelect">
            <Form.Label>Filtrar por aerolinea:</Form.Label>
            <Form.Control as="select" value={filterAirline} onChange={handleFilterAirlineChange}>
                <option value="">Todos</option>
                {airlines.map(airline => (<option value={airline.name}>{airline.name}</option>))}
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="filterFrom">
            <Form.Label>Filtrar por origen:</Form.Label>
            <Form.Control as="select" value={filterFrom} onChange={handleFilterFromChange}>
                <option value=""></option>
                {destinations.map(destiny => (<option value={destiny.code}>{destiny.name}</option>))}
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="filterTo">
            <Form.Label>Filtrar por destino:</Form.Label>
            <Form.Control as="select" value={filterTo} onChange={handleFilterToChange}>
                <option value=""></option>
                {destinations.map(destiny => (<option value={destiny.code}>{destiny.name}</option>))}
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="filterSteps">
            <Form.Label>Filtrar por escalas:</Form.Label>
            <Form.Control as="select" value={filterSteps} onChange={handleFilterStepsChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="filterDate">
            <Form.Label>Filtrar por fecha:</Form.Label>
            <Form.Control
              type="date"
              value={filterDate}
              onChange={handleFilterDateChange}
            />
        </Form.Group>
        <Button className='mt-2' variant="primary" onClick={handleFilterSubmit} disabled={isLoading}>
          {isLoading ? 'Cargando...' : 'Aplicar filtros'}
        </Button>

        <div className="m-5">
            {flightList.map((flightItem) => {
              return <FlightDetail flight={flightItem} />
            })}
        </div>
    </div>
  );
}

export default FlightList;
