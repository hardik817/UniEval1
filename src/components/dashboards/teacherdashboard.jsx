import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Teacherdashboard() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/dashboard', { withCredentials: true })
            .then((response) => setData(response.data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleCourseView = async (classno, courseView) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/dashboard",
                { classno, courseView },
                { withCredentials: true }
            );
            if ([200, 201, 202].includes(response.status)) {
                console.log("User is authenticated");
                navigate("/addstudent", { state: { status: response.status, message: "Authenticated" } });
            } else {
                console.error("Not authenticated");
                window.alert("Incorrect Password or Username");
            }
        } catch (error) {
            console.error("Error during login:", error);
            window.alert("Error during login. Please try again.");
        }
    };

    const displayData = (data) => {
        if (Array.isArray(data)) {
            return data.map((item, index) => {
                if (Array.isArray(item)) {
                    const [classno, courseName] = item;
                    return (
                        <div key={index}>
                            <h2>Class Number: {classno}</h2>
                            <h3>Course Name: {courseName}</h3>
                            <button type="button" onClick={() => handleCourseView(classno, courseName)}>View</button>
                        </div>
                    );
                } else {
                    return <div key={index}>Invalid data format</div>;
                }
            });
        } else {
            return <div>Invalid data format</div>;
        }
    };

    return (
        <>
            <h1>Welcome Teacher</h1>
            <h1>Data from Backend</h1>
            {data ? (
                <div>{displayData(data)}</div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}

export default Teacherdashboard;
