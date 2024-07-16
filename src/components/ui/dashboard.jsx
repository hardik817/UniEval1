import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/check-auth', { withCredentials: true });
                if (!response.data.isAuthenticated) {
                    navigate('/');
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                navigate('/');
            }
        };

        checkAuth();
    }, [navigate]);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard!</p>
        </div>
    );
};

export default Dashboard;

