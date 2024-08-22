import React, { useState, useEffect } from 'react';
import { getTasksByUser, getTasksByProject } from '../apiService';
import { Container, Row, Col, Card, Alert, ListGroup, Button, Badge, ButtonGroup } from 'react-bootstrap';
import { BsCalendar, BsClock, BsExclamationTriangle, BsCheckCircle, BsPencil } from 'react-icons/bs';
import { FaTasks } from 'react-icons/fa';

const ViewTasks = ({ token, userId, projectId }) => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]); // Filtered task list
    const [expandedTaskIds, setExpandedTaskIds] = useState([]); // Track expanded tasks
    const [message, setMessage] = useState('');
    const [filter, setFilter] = useState('all'); // Task filter ('all', 'pending', 'completed', 'incomplete')

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                let response;
                if (userId) {
                    response = await getTasksByUser(userId, token);
                } else if (projectId) {
                    response = await getTasksByProject(projectId, token);
                }

                // Update tasks based on current date
                const now = new Date();
                const updatedTasks = response.map(task => {
                    const dueDate = new Date(task.dueDate);
                    if (dueDate < now && task.status !== 'Completed') {
                        return { ...task, status: 'Incomplete' };
                    }
                    return task;
                });

                setTasks(updatedTasks);
            } catch (error) {
                setMessage('Failed to fetch tasks');
            }
        };

        fetchTasks();
    }, [token, userId, projectId]);

    useEffect(() => {
        // Filter tasks based on the selected filter
        if (filter === 'completed') {
            setFilteredTasks(tasks.filter(task => task.status === 'Completed'));
        } else if (filter === 'incomplete') {
            setFilteredTasks(tasks.filter(task => task.status === 'Incomplete'));
        } else if (filter === 'pending') {
            setFilteredTasks(tasks.filter(task => task.status === 'Pending'));
        } else {
            setFilteredTasks(tasks); // 'all' case
        }
    }, [filter, tasks]);

    const toggleExpand = (taskId) => {
        setExpandedTaskIds(prevState =>
            prevState.includes(taskId)
                ? prevState.filter(id => id !== taskId)
                : [...prevState, taskId]
        );
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4 text-center"><FaTasks /> View Tasks</h2>
            {message && <Alert variant="danger"><BsExclamationTriangle /> {message}</Alert>}

            {/* Button Group for filtering tasks */}
            <ButtonGroup className="mb-4 d-flex justify-content-center">
                <Button variant={filter === 'all' ? 'primary' : 'outline-primary'} onClick={() => setFilter('all')}>
                    All Tasks
                </Button>
                <Button variant={filter === 'pending' ? 'primary' : 'outline-warning'} onClick={() => setFilter('pending')}>
                    Pending Tasks
                </Button>
                <Button variant={filter === 'incomplete' ? 'primary' : 'outline-danger'} onClick={() => setFilter('incomplete')}>
                    Incomplete Tasks
                </Button>
                <Button variant={filter === 'completed' ? 'primary' : 'outline-success'} onClick={() => setFilter('completed')}>
                    Completed Tasks
                </Button>
            </ButtonGroup>

            <Row>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                        <Col key={task.id} md={4} className="mb-3">
                            <Card className="shadow-sm border-0">
                                <Card.Body>
                                    <Card.Title className="d-flex justify-content-between align-items-center">
                                        {task.name}
                                        <Badge pill bg={
                                            task.status === 'Completed' ? 'success' :
                                            task.status === 'Incomplete' ? 'danger' :
                                            task.status === 'Pending' ? 'warning' : 'secondary'
                                        }>
                                            {task.status === 'Completed' ? <BsCheckCircle /> :
                                             task.status === 'Incomplete' ? <BsExclamationTriangle /> :
                                             task.status === 'Pending' ? <BsPencil /> : null} {task.status}
                                        </Badge>
                                    </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        <BsCalendar /> Due Date: {task.dueDate}
                                    </Card.Subtitle>
                                    <Card.Text className="task-description">
                                        {expandedTaskIds.includes(task.id) ? (
                                            <div dangerouslySetInnerHTML={{ __html: task.description }} />
                                        ) : (
                                            <div className="text-truncate" style={{ maxHeight: '3.6em', overflow: 'hidden' }}>
                                                <div dangerouslySetInnerHTML={{ __html: task.description }} />
                                            </div>
                                        )}
                                    </Card.Text>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <BsClock /> Status: {task.status}
                                        </ListGroup.Item>
                                    </ListGroup>
                                    <Button 
                                        variant={expandedTaskIds.includes(task.id) ? 'secondary' : 'primary'} 
                                        className="mt-3 w-100" 
                                        onClick={() => toggleExpand(task.id)}
                                    >
                                        {expandedTaskIds.includes(task.id) ? 'Hide Details' : 'View Details'}
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <Alert variant="info" className="text-center"><BsExclamationTriangle /> No tasks available.</Alert>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default ViewTasks;
