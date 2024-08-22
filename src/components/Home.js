// src/components/Home.js
import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container className="mt-5">
            <Row className="text-center">
                <Col>
                    <h1 className="mb-4" style={{ fontSize: '2.5rem', color: '#007bff' }}>
                        Welcome to the Project Management App
                    </h1>
                    <p className="lead" style={{ fontSize: '1.2rem', color: '#6c757d' }}>
                        This is a platform where you can manage projects, assign tasks, and view your tasks efficiently.
                    </p>
                    <p className="mb-4" style={{ fontSize: '1rem', color: '#6c757d' }}>
                        To get started, please register or log in to access the full features of the application.
                    </p>
                    <div className="mt-4">
                        <Button 
                            variant="primary" 
                            as={Link} 
                            to="/register" 
                            style={{ marginRight: '10px' }}
                        >
                            Register
                        </Button>
                        <Button 
                            variant="secondary" 
                            as={Link} 
                            to="/login"
                        >
                            Login
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
