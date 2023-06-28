import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:8000/user',{
            method: 'POST',
            body: JSON.stringify({'first_name': firstName, 'last_name': lastName, 'email': email, 'password': password})
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
                <h1>Registro</h1>
                {errorMessage != '' ? <h4>{errorMessage}</h4> : null}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formFirstName">
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formLastName">
                        <Form.Label>Apellidos</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Registrar
                    </Button>
                </Form>
                <Button variant="secondary" href="/login">Iniciar sesión</Button>
            </div>
        </Container>
    );
}

export default Register;
