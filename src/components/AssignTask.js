import React, { useState, useEffect } from 'react';
import { assignTask, searchUsers, searchProjects } from '../apiService';
import { Form, Button, Container, Row, Col, ListGroup } from 'react-bootstrap';
import { FaTasks, FaRegEdit, FaCalendarAlt, FaUser, FaProjectDiagram } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssignTask = ({ token }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [dueDate, setDueDate] = useState('');
    const [userId, setUserId] = useState('');
    const [projectId, setProjectId] = useState('');
    const [userSearch, setUserSearch] = useState('');
    const [projectSearch, setProjectSearch] = useState('');
    const [userResults, setUserResults] = useState([]);
    const [projectResults, setProjectResults] = useState([]);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showProjectDropdown, setShowProjectDropdown] = useState(false);

    // Search functions
    const searchForUsers = async (query) => {
        if (query) {
            try {
                const response = await searchUsers(query, token);
                setUserResults(response);
                setShowUserDropdown(true);
            } catch (error) {
                console.error('Failed to search users:', error);
            }
        } else {
            setUserResults([]);
            setShowUserDropdown(false);
        }
    };

    const searchForProjects = async (query) => {
        if (query) {
            try {
                const response = await searchProjects(query, token);
                setProjectResults(response);
                setShowProjectDropdown(true);
            } catch (error) {
                console.error('Failed to search projects:', error);
            }
        } else {
            setProjectResults([]);
            setShowProjectDropdown(false);
        }
    };

    useEffect(() => {
        searchForUsers(userSearch);
    }, [userSearch]);

    useEffect(() => {
        searchForProjects(projectSearch);
    }, [projectSearch]);

    const handleUserSelect = (user) => {
        setUserId(user.id);
        setUserSearch(user.name);
        setShowUserDropdown(false);
    };

    const handleProjectSelect = (project) => {
        setProjectId(project.id);
        setProjectSearch(project.name);
        setShowProjectDropdown(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await assignTask({ name, description, status, dueDate, user: { id: userId }, project: { id: projectId } }, token);
            toast.success(`Task assigned: ${response.name}`);
        } catch (error) {
            toast.error('Failed to assign task');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6} className="shadow-lg p-4">
                    <div className="text-center mb-4">
                        <h2>Assign Task</h2>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label><FaTasks /> Task Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Task Name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><FaRegEdit /> Description</Form.Label>
                            <ReactQuill 
                                value={description} 
                                onChange={setDescription} 
                                placeholder="Description" 
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><FaCalendarAlt /> Due Date</Form.Label>
                            <Form.Control 
                                type="date" 
                                placeholder="Due Date" 
                                value={dueDate} 
                                onChange={(e) => setDueDate(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><FaUser /> User</Form.Label>
                            <div className="position-relative">
                                <Form.Control 
                                    type="text" 
                                    placeholder="Search User" 
                                    value={userSearch} 
                                    onChange={(e) => setUserSearch(e.target.value)} 
                                    onFocus={() => setShowUserDropdown(true)}
                                    onBlur={() => setTimeout(() => setShowUserDropdown(false), 200)}
                                />
                                {showUserDropdown && userResults.length > 0 && (
                                    <ListGroup className="position-absolute w-100 mt-2 bg-white border border-secondary rounded shadow-sm">
                                        {userResults.map(user => (
                                            <ListGroup.Item 
                                                key={user.id} 
                                                action 
                                                onClick={() => handleUserSelect(user)}
                                                className="cursor-pointer"
                                            >
                                                {user.name}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><FaProjectDiagram /> Project</Form.Label>
                            <div className="position-relative">
                                <Form.Control 
                                    type="text" 
                                    placeholder="Search Project" 
                                    value={projectSearch} 
                                    onChange={(e) => setProjectSearch(e.target.value)} 
                                    onFocus={() => setShowProjectDropdown(true)}
                                    onBlur={() => setTimeout(() => setShowProjectDropdown(false), 200)}
                                />
                                {showProjectDropdown && projectResults.length > 0 && (
                                    <ListGroup className="position-absolute w-100 mt-2 bg-white border border-secondary rounded shadow-sm">
                                        {projectResults.map(project => (
                                            <ListGroup.Item 
                                                key={project.id} 
                                                action 
                                                onClick={() => handleProjectSelect(project)}
                                                className="cursor-pointer"
                                            >
                                                {project.name}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </div>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Assign Task
                        </Button>
                    </Form>
                    { /* Toast container to display notifications */ }
                    <ToastContainer />
                </Col>
            </Row>
        </Container>
    );
};

export default AssignTask;
