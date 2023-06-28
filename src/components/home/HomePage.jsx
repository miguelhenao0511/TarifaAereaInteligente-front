import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';

const HomePage = () => {
  const auth = Cookies.get('auth');
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

      {auth != null ? null : (<Container>
        <Button variant="primary" href="/register">Registrarse</Button>
        <Button variant="secondary" href="/login">Iniciar sesión</Button>
      </Container>)}

    </Container>
  );
}

export default HomePage;