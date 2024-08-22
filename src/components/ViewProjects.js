import React, { useEffect, useState } from 'react';
import { getProjectsByManager } from '../apiService';
import { Table, Container, Spinner, Alert, Button, Row, Col, Card } from 'react-bootstrap';

const ViewProjects = ({ token, userId }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showTasksForProject, setShowTasksForProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getProjectsByManager(userId, token);
                setProjects(response);
            } catch (error) {
                setError('Failed to load projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [userId, token]);

    const handleProjectClick = (projectId) => {
        setShowTasksForProject(showTasksForProject === projectId ? null : projectId);
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    const cardStyle = {
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease'
    };

    const cardHoverStyle = {
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
    };

    const iconStyle = {
        marginRight: '8px'
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">My Projects</h2>
            {showTasksForProject !== null && (
                <Button
                    variant="secondary"
                    onClick={() => setShowTasksForProject(null)}
                    className="mb-3"
                >
                    <i className="bi bi-arrow-left-circle" style={iconStyle}></i> Back to Projects
                </Button>
            )}
            
            {showTasksForProject === null ? (
                <Table striped bordered hover responsive="md">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id}>
                                <td>{project.id}</td>
                                <td>{project.name}</td>
                                <td>
                                    <div className="project-description" dangerouslySetInnerHTML={{ __html: project.description }} />
                                </td>
                                <td>
                                    <Button 
                                        variant={showTasksForProject === project.id ? 'danger' : 'primary'} 
                                        onClick={() => handleProjectClick(project.id)}
                                    >
                                        {showTasksForProject === project.id ? (
                                            <>
                                                <i className="bi bi-eye-slash" style={iconStyle}></i> Hide Tasks
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-eye" style={iconStyle}></i> View Tasks
                                            </>
                                        )}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <div>
                    {projects.find(project => project.id === showTasksForProject)?.tasks.length > 0 ? (
                        <Row className="g-4">
                            {projects.find(project => project.id === showTasksForProject).tasks.map(task => (
                                <Col key={task.id} md={4}>
                                    <Card
                                        style={cardStyle}
                                        className="shadow-sm border-0"
                                    >
                                        <Card.Body>
                                            <Card.Title>
                                                <i className="bi bi-file-earmark-text" style={iconStyle}></i> {task.name}
                                            </Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                <i className="bi bi-calendar-date" style={iconStyle}></i> Due Date: {task.dueDate}
                                            </Card.Subtitle>
                                            <Card.Text className="mt-2" dangerouslySetInnerHTML={{ __html: task.description }} />
                                            <Card.Text className="mt-2">
                                                <i className={`bi ${task.status === 'Completed' ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`} style={iconStyle}></i> Status: {task.status}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <p>No tasks found for this project.</p>
                    )}
                </div>
            )}
        </Container>
    );
};

export default ViewProjects;
