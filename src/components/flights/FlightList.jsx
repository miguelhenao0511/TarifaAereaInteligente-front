import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import FlightDetail from './FlightDetail';

function FlightList() {
  const [flightList, setFlightList] = useState([]);
  const [filterAirline, setFilterAirline] = useState('');
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [filterSteps, setFilterSteps] = useState('1');
  const [filterDate, setFilterDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/flights?airline=${filterAirline}&source=${filterFrom}&destiny=${filterTo}&steps=${filterSteps}&date=${filterDate}`);
      const data = await response.json();
      setFlightList(data);
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

  var airlines = [
    'KLM',
    'Multiple Airlines',
    'American Airlines',
    'Air France',
    'Lufthansa',
    'Air Canada',
    'United Airlines',
    'British Airways',
    'Qatar Airways',
    'Finnair',
    'Emirates',
    'SAUDIA',
    'SWISS',
    'Finnair, American Airlines',
    'LOT',
    'Aeroflot',
    'Turkish Airlines',
    'Lufthansa, Egypt Air',
    'TAP AIR PORTUGAL'
  ]

  var destinations = [
    {code: "NYC", name: "NUEVA YORK"},
    {code: "PAR", name: "PARIS"},
    {code: "RUH", name: "RIAD ARABIA SAUDI"},
    {code: "SVO", name: "MOSCU"}
  ]

  return (
    <div className='m-3'>
        <Form.Group controlId="filterSelect">
            <Form.Label>Filtrar por aerolinea:</Form.Label>
            <Form.Control as="select" value={filterAirline} onChange={handleFilterAirlineChange}>
                <option value="">Todos</option>
                {airlines.map(airline => (<option value={airline}>{airline}</option>))}
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
