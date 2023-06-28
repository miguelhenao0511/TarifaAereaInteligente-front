import React from 'react';
import { Card, Button } from 'react-bootstrap';

function FlightDetail(props) {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <Card className='mb-4' style={{ width: '18rem', width: '90%' }}>
        <Card.Body>
          <Card.Title>{props.flight.airline}</Card.Title>
          <Card.Text>
            origen: {props.flight.source} - destino: {props.flight.destiny} <br />
            escalas: {props.flight.steps} <br /> 
            fecha: {props.flight.date} <hr />
            <h2>${props.flight.price}</h2>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default FlightDetail;