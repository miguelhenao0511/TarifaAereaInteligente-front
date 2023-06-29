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
          Descubre nuestro exclusivo servicio que te mantiene al día con la industria aérea a nivel mundial. En un mundo en constante cambio, estamos aquí para brindarte la información más actualizada sobre el panorama de las aerolíneas.
          Nuestra plataforma te ofrece una visión completa de la industria aérea global, incluyendo noticias, tendencias y análisis de mercado. Podrás explorar cómo las aerolíneas se adaptan a los desafíos y descubrir las últimas novedades en el mundo de la aviación.
          Pero eso no es todo, también te ofrecemos una herramienta única para planificar tus viajes. Nuestro sistema te proporciona información sobre precios actuales, promociones y opciones de vuelo, ayudándote a encontrar las mejores ofertas y ahorrar dinero en tus viajes. Además, te brindamos pronósticos futuros de precios, permitiéndote tomar decisiones informadas y aprovechar las mejores oportunidades.
          Ya sea que estés buscando vuelos para tus vacaciones, viajes de negocios o simplemente explorando nuevas opciones de viaje, nuestro servicio te proporciona todo lo que necesitas para tomar decisiones inteligentes y disfrutar de una experiencia aérea sin complicaciones.
          Únete a nuestra plataforma y descubre cómo podemos ayudarte a navegar por el mundo de la aviación de manera eficiente y conveniente. Estamos aquí para simplificar tu experiencia de viaje y hacer que cada vuelo sea una experiencia excepcional. ¡Bienvenido a nuestro servicio!
          </Card.Text>
        </Card.Body>
      </Card>

      <Container>
        <h2>Beneficios de la suscripción</h2>
        <h3>valor de la suscripción $8 US por mes y $50 US por año</h3>
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