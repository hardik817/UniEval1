import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import '../styles/form.css'
const Admin = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/check-auth/admin', { withCredentials: true });
                if (!response.data.isAuthenticated) {
                    navigate('/dashboard');
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                navigate('/dashboard');
            }
        };

        checkAuth();
    }, [navigate]);
    function randomClassNumber() {
        const number = Math.ceil(Math.random() * 1000000)
        setValue('classnumber', number)
        return number
    }
    const onSubmit = async (data) => {
        const response = await axios.post('http://localhost:3000/admin/update-course', data, { withCredentials: true });
        if (response.status === 200) {
            console.log(data);
            navigate('/admin');
        } else {
            window.alert("Account with same username or email id exists");
        }
    }
    return (
        <>
            <h1 className="logo">UniEval</h1>
            <form method="post" action="/admin" onSubmit={handleSubmit(onSubmit)}>
                <div className="login">
                    <h1 className="signuptitle">Assign ClassNumber</h1>
                    <div className="textbox">
                        <input placeholder="Username" {...register("username", { required: { value: true, msg: "Please enter a registration number" }, maxLength: { value: 9, msg: "Max length exceeded" }, minlength: { value: 9, msg: "Min length is 9" } },)} />
                    </div>
                    <div className="textbox1">
                        <input id='random' placeholder="ClassNumber" {...register("classnumber", { required: true })} />
                        {errors.password && <div className="errors">This field is required</div>}
                        <button onClick={randomClassNumber}>Generate</button>
                    </div>
                    <div className="textbox2">
                        <input placeholder="CourseName" {...register("coursename", { required: true })} />
                    </div>
                    <input className="submit1" type="submit" />
                </div>
            </form>
        </>

    );
};

export default Admin;

