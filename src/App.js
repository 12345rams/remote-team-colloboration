import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button, Alert } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa'; // Importing an icon from react-icons
import Register from './components/Register';
import Login from './components/Login';
import CreateProject from './components/CreateProject';
import AssignTask from './components/AssignTask';
import ViewTasks from './components/ViewTasks';
import Home from './components/Home';
import ViewProjects from './components/ViewProjects';
import './App.css';
import Dashboard from './components/DashBoard';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const [projectId, setProjectId] = useState(null);
    const userName = "User"; // Placeholder for user name

    useEffect(() => {
        // Store token in localStorage whenever it changes
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    useEffect(() => {
        // Store userId in localStorage whenever it changes
        if (userId) {
            localStorage.setItem('userId', userId);
        } else {
            localStorage.removeItem('userId');
        }
    }, [userId]);

    const handleLogout = () => {
        setToken('');
        setUserId(null);
    };

    return (
        <Router>
            <div>
                <Navbar bg="dark" variant="dark" className="custom-navbar">
                    <Container>
                        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                        <Nav className="me-auto">
                            {token ? (
                                <>
                                  <Nav.Link as={Link} to="/view-projects">View Projects</Nav.Link>
                                    <Nav.Link as={Link} to="/create-project">Create Project</Nav.Link>
                                    <Nav.Link as={Link} to="/assign-task">Assign Task</Nav.Link>
                                    <Nav.Link as={Link} to="/view-tasks">View Tasks</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                                </>
                            )}
                        </Nav>
                        <div className="d-flex align-items-center">
                            {token && (
                                <>
                                    <Button 
                                        variant="outline-light" 
                                        className="me-2" 
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                    <Button 
                                        variant="primary" 
                                        as={Link} 
                                        to="/create-project"
                                    >
                                        <FaPlus className="me-2" /> Create Project
                                    </Button>
                                </>
                            )}
                        </div>
                    </Container>
                </Navbar>

                <Container className="mt-4">
                    <Routes>
                        <Route path="/" element={token ? (
                            <div>
                                <h2>Welcome, {userName}!</h2>
                                <p>This is your dashboard where you can manage projects and tasks.</p>
                                <Alert variant="info" className="custom-alert">
                                    <h4>Features of Our Website:</h4>
                                    <ul>
                                        <li><strong>Create and manage projects:</strong> Initiate new projects, set deadlines, and manage all aspects of your projects seamlessly.</li>
                                        <li><strong>Assign tasks to users:</strong> Easily delegate tasks to your team members and monitor their progress.</li>
                                        <li><strong>Track the progress of tasks:</strong> Keep an eye on ongoing tasks and make sure everything stays on schedule.</li>
                                        <li><strong>View all tasks and project details:</strong> Get a comprehensive view of all tasks and project details in one place.</li>
                                    </ul>
                                </Alert>
                            </div>
                        ) : (
                            <Home />
                        )} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login setToken={setToken} setUserId={setUserId} />} />
                        <Route path="/create-project" element={token ? <CreateProject token={token} userId={userId}/> : <Navigate to="/login" />} />
                        <Route path="/assign-task" element={token ? <AssignTask token={token} /> : <Navigate to="/login" />} />
                        <Route path="/view-tasks" element={token ? <ViewTasks token={token} userId={userId} projectId={projectId} /> : <Navigate to="/login" />} />
                        <Route path="/view-projects" element={token ? <ViewProjects token={token} userId={userId} /> : <Navigate to="/login" />} />
                        <Route path="/dashboard" element={token ? <Dashboard token={token} userId={userId} /> : <Navigate to="/login" />} />
                    </Routes>
                </Container>
            </div>
        </Router>
    );
};

export default App;
