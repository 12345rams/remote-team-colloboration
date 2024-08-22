import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { FaTasks, FaProjectDiagram, FaUser } from 'react-icons/fa'; // Importing icons
import Avatar from 'react-avatar'; // Importing avatar component
import { getTaskCounts, getProjectCount, getUserDetails } from '../apiService';
import axios from 'axios'; // Ensure axios is imported
import './css/AssignTask.css'
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Dashboard = ({ token, userId }) => {
    const [taskCounts, setTaskCounts] = useState({ complete: 0, incomplete: 0 });
    const [projectCount, setProjectCount] = useState(0);
    const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tasks = await getTaskCounts(token, userId);
                const projects = await getProjectCount(token, userId);
                const user = await getUserDetails(token, userId);

                setTaskCounts(tasks);
                console.log(tasks);
                setProjectCount(projects);
                setUserDetails(user);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token, userId]);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    const totalTasks = taskCounts.complete + taskCounts.incomplete;
    const pieData = {
        labels: ['Completed Tasks', 'Incomplete Tasks'],
        datasets: [
            {
                label: 'Tasks',
                data: [taskCounts.complete, taskCounts.incomplete],
                backgroundColor: ['#36A2EB', '#FF6384'],
                borderWidth: 1,
                hoverOffset: 4
            }
        ]
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Dashboard</h2>
            <div className="row">
                {/* Task Overview Card */}
                <div className="col-md-6">
                    <div className="card shadow-lg mb-4">
                        <div className="card-body text-center">
                            <FaTasks size={40} className="text-primary mb-3" />
                            <h5 className="card-title">Task Overview</h5>
                            <div className="pie-chart-container">
                                <Pie 
                                    data={pieData} 
                                    options={{ 
                                        responsive: true, 
                                        plugins: { 
                                            legend: { position: 'top' }, 
                                            tooltip: { 
                                                callbacks: { 
                                                    label: (context) => `${context.label}: ${context.raw}` 
                                                } 
                                            } 
                                        } 
                                    }} 
                                />
                            </div>
                            <p className="mt-3">Total Tasks: {totalTasks}</p>
                        </div>
                    </div>
                </div>
                {/* Project Count and User Details Card */}
                <div className="col-md-6">
                    <div className="card shadow-lg mb-4">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-4">
                                <FaProjectDiagram size={30} className="text-success me-3" />
                                <h5 className="card-title mb-0">Project Count</h5>
                            </div>
                            <p className="card-text">Number of Projects: {projectCount}</p>
                            <div className="d-flex align-items-center mb-4">
                                <FaUser size={30} className="text-info me-3" />
                                <h5 className="card-title mb-0">User Details</h5>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <Avatar name={userDetails.name} size="50" round className="me-3" />
                                <div>
                                    <p className="card-text mb-1"><strong>Name:</strong> {userDetails.name}</p>
                                    <p className="card-text"><strong>Email:</strong> {userDetails.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

