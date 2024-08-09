import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import '../styles/form.css';

function Addstudent() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
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

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('studentcsv', data.studentcsv[0]);

        try {
            const response = await axios.post("http://localhost:3000/addstudent", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                console.log("File upload successful");
                navigate("/dashboard", { state: { status: response.status, message: "File upload successful" } });
            } else {
                console.error("Upload failed");
                window.alert("Upload failed");
            }
        } catch (error) {
            console.error("Error during uploading:", error);
            window.alert("Error during upload. Please try again.");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Add Students</h1>
                <h3>Enter the CSV File</h3>
                <input type="file" name="studentcsv" {...register('studentcsv', { required: true })} />
                {errors.studentcsv && <p>CSV file is required</p>}
                <button type="submit">Upload</button>
            </form>
        </>
    );
}

export default Addstudent;
