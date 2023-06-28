import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:8000/login',{
            method: 'POST',
            body: JSON.stringify({'email': email, 'password': password})
        })
        .then(response => response.json())
        .then(data => {
            if (data.user){
                Cookies.set('auth', data.user.id, { expires: 7 });
                navigate('/home')
            } else {
                setErrorMessage(data.message)
            }
        })
        .catch(error => {
            // Manejar errores
            console.log("error" + error)
        });
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <h1>Iniciar sesión</h1>
                {errorMessage != '' ? <h4>{errorMessage}</h4> : null}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Ingresa tu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Iniciar sesión
                    </Button>
                </Form>
                <Button variant="secondary" href="/register">Registrate</Button>
            </div>
        </Container>
    );
}

export default Login;
