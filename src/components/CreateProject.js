import React, { useState } from 'react';
import { createProject } from '../apiService';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { FaProjectDiagram, FaRegEdit } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProject = ({ token, userId }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [managerId, setManagerId] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createProject({ name, description, manager: { id: userId } }, token);
            toast.success(`Project created: ${response.name}`);
        } catch (error) {
            toast.error('Failed to create project');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-lg">
                        <Card.Body>
                            <div className="text-center mb-4">
                                <h2 className="form-title">Create Project</h2>
                                <p className="text-muted">Fill in the details to start a new project</p>
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label><FaProjectDiagram className="me-2" /> Project Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter project name" 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        required 
                                        className="form-control-lg"
                                        style={{ borderRadius: '0.25rem', boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)' }}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label><FaRegEdit className="me-2" /> Description</Form.Label>
                                    <ReactQuill 
                                        value={description} 
                                        onChange={setDescription} 
                                        placeholder="Enter project description, you can add links, bold text, etc."
                                        theme="snow"
                                        className="quill-editor"
                                        modules={{
                                            toolbar: [
                                                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                                                [{size: []}],
                                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                [{'list': 'ordered'}, {'list': 'bullet'}],
                                                ['link', 'image', 'video'],
                                                ['clean']                                         
                                            ],
                                        }}
                                        formats={[
                                            'header', 'font', 'size',
                                            'bold', 'italic', 'underline', 'strike', 'blockquote',
                                            'list', 'bullet',
                                            'link', 'image', 'video'
                                        ]}
                                        style={{ borderRadius: '0.25rem', borderColor: '#ced4da' }}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="btn-lg w-100" style={{ borderRadius: '0.25rem' }}>
                                    Create Project
                                </Button>
                            </Form>
                            { /* Toast container to display notifications */ }
                            <ToastContainer />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateProject;
