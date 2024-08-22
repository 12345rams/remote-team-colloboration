import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const registerUser = async (userDetails) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/addNewUser`, userDetails);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/generateToken`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const createProject = async (project, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/projects/create`, project, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

export const getProjectsByManager = async (userId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/projects/manager/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

export const assignTask = async (task, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/tasks/assign`, task, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error assigning task:', error);
        throw error;
    }
};

export const getTasksByUser = async (userId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tasks/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const getTasksByProject = async (projectId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tasks/project/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

// Search functions
export const searchUsers = async (name, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/searchUsers`, {
            params: { name },
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching users:', error);
        throw error;
    }
};

export const searchProjects = async (name, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/projects/search`, {
            params: { name },
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching projects:', error);
        throw error;
    }
};

// Functions for counts and details
export const getTaskCounts = async (token, userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tasks/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const tasks = response.data;
        const completeCount = tasks.filter(task => task.status === 'Complete').length;
        const incompleteCount = tasks.filter(task => task.status === 'Incomplete').length;
        return {
            complete: completeCount,
            incomplete: incompleteCount
        };
    } catch (error) {
        console.error('Error fetching task counts:', error);
        throw error;
    }
};

export const getProjectCount = async (token, userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/projects/manager/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.length; 
    } catch (error) {
        console.error('Error fetching project count:', error);
        throw error;
    }
};

export const getUserDetails = async (token, userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};
