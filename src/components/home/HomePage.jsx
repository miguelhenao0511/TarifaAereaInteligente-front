import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

const HomePage = () => {
  return (
    <Container>
      <Card>
        <Card.Header as="h1">Bienvenido a nuestra aplicación</Card.Header>
        <Card.Body>
          <Card.Text>
            Aquí encontrarás información general sobre la app.
          </Card.Text>
        </Card.Body>
      </Card>

      <Container>
        <h2>Beneficios de la suscripción</h2>
        <ul>
          <li>Acceso a contenido premium</li>
          <li>Descuentos exclusivos</li>
          <li>Soporte prioritario</li>
        </ul>
      </Container>

      <Container>
        <Button variant="primary" href="/registro">Registrarse</Button>
        <Button variant="secondary" href="/login">Iniciar sesión</Button>
      </Container>
    </Container>
  );
}

export default HomePage;