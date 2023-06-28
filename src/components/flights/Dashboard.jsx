import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import Cookies from 'js-cookie';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const LineChart = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [airlines, setAirlines] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: 'rgba(75, 19, 192, 0.2)',
        borderColor: 'rgba(75, 19, 192, 1)',
        borderWidth: 1,
      }
    ]
  });

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

  const handleCheckboxChange = (value) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const handleFilterSubmit = async () => {
    setIsLoading(true);
    try {
      let yourDate = new Date()

      const body = {
        "airlines": selectedOptions,
        "route_from": filterFrom,
        "route_to": filterTo,
        "steps": 1,
        "days": 30,
        "date": yourDate.toISOString().split('T')[0]
      }
      const response = await fetch("http://127.0.0.1:8000/prices", {
        method: 'POST',
        body: JSON.stringify(body),
        headers: JSON.stringify({ 'auth': auth })
      });
      const data = await response.json();
      const pricesDataset = []
      data.prices.forEach(airlinePrices => {
        const color = getRandomRGBA()
        pricesDataset.push({
          label: airlinePrices.airline,
          data: airlinePrices.prices,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1,
        })
      });

      setChartData({
        labels: data.dates,
        datasets: pricesDataset
      });
    } catch (error) {
      console.error('Error al obtener la lista de vuelos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterFromChange = (event) => {
    setFilterFrom(event.target.value);
  };

  const handleFilterToChange = (event) => {
    setFilterTo(event.target.value);
  };

  function getRandomRGBA() {
    // Generar valores aleatorios para los componentes R, G y B
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Generar un valor aleatorio para la opacidad
    const opacity = Math.random().toFixed(1);

    // Construir la cadena RGBA con los valores generados
    const rgbaColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;

    return rgbaColor;
  }

  return <div className='m-5'>
    <Line data={chartData} />
    <Form>
      <Row>
        <Col xs={12} md={6}>
          <Form.Group controlId="filterFrom">
            <Form.Label>Filtrar por origen:</Form.Label>
            <Form.Control as="select" value={filterFrom} onChange={handleFilterFromChange}>
              <option value=""></option>
              {destinations.map(destiny => (<option value={destiny.code}>{destiny.name}</option>))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId="filterTo">
            <Form.Label>Filtrar por destino:</Form.Label>
            <Form.Control as="select" value={filterTo} onChange={handleFilterToChange}>
              <option value=""></option>
              {destinations.map(destiny => (<option value={destiny.code}>{destiny.name}</option>))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {airlines.map((airline, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <Form.Check
              type="checkbox"
              label={airline.name}
              checked={selectedOptions.includes(airline.name)}
              onChange={() => handleCheckboxChange(airline.name)}
            />
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <Button className='mt-2' variant="primary" onClick={handleFilterSubmit} disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Aplicar filtros'}
          </Button>
        </Col>
      </Row>
    </Form>
  </div>;
};

export default LineChart;