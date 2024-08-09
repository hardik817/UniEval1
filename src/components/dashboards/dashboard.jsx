import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Userdashboard from './userdashboard';
import Teacherdashboard from './teacherdashboard';
import Admindashboard from './admindashboard';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../ui/navbar';
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
    const location = useLocation();
    const { status, message } = location.state || {};
    function handledashboard() {
        if (status == 201) {
            return <Userdashboard />
        }
        else if (status == 200) {
            return <Teacherdashboard />
        }
        else if (status == 202) {
            return <Admindashboard />
        }
    }
    return (
        <>
            <div>{handledashboard()}</div>
        </>
    );
};

export default Dashboard;

