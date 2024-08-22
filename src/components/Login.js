// src/components/Login.js
import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { loginUser } from '../apiService';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken ,setUserId}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ username: email, password });
            if (response) {
                setToken(response.token);
                setUserId(response.user_id);
                navigate('/');
            } else {
                setMessage('Login failed: No token received');
            }
        } catch (error) {
            console.error('Login error:', error); 
            setMessage('Login failed');
        }
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6} lg={4}>
                    <h2 className="text-center mb-4">Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label><FaEnvelope /> Email</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter your email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><FaLock /> Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter your password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">Login</Button>
                    </Form>
                    {message && <Alert variant={message.includes('failed') ? 'danger' : 'success'} className="mt-3">{message}</Alert>}
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
