import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import '../styles/form.css'
function Login() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:3000/", data, { withCredentials: true });
            if (response.status === 200) {
                console.log("Login successful");
                navigate("/dashboard");
            } else {
                console.error("Login failed");
                window.alert("Incorrect Password or Username");
            }
        } catch (error) {
            console.error("Error during login:", error);
            window.alert("Error during login. Please try again.");
        }
    };
    function handleSignup() {
        navigate("/signup")
    }
    return (
        <>
            <h1 className="logo">UniEval</h1>
            <form method="post" action="/" onSubmit={handleSubmit(onSubmit)}>
                <div className="login">
                    <h1 className="loginTitle">Log in to UniEval</h1>
                    <div className="textbox">
                        <input className="username" placeholder="Username" {...register("username", { required: { value: true, msg: "Please enter a registration number" }, maxLength: { value: 9, msg: "Max length exceeded" }, minlength: { value: 9, msg: "Min length is 9" } },)} />
                    </div>
                    <div className="textbox1">
                        <input className="password" placeholder="Password" {...register("password", { required: true })} />
                        {errors.password && <div className="errors">This field is required</div>}
                    </div>
                    <h6 className="lostPassword">Lost Password?</h6>
                    <h6 className="signup" onClick={handleSignup}>Signup</h6>
                    <input className="submit" type="submit" />
                </div>
            </form>

        </>
    )
}
export default Login;