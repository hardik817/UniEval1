import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import '../styles/form.css'
function Signup() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        const r = await fetch("http://localhost:3000/signup", { method: "POST", headers: { "Content-Type": "Application/json", }, body: JSON.stringify(data) })
        console.log(r)
        if (r.ok) {
            console.log(data)
            navigate("/");
        }
        else {
            window.alert("Account with same username or email id exists")
        }
    }
    function handlelogin() {
        navigate("/")
    }
    return (
        <>
            <h1 className="logo">UniEval</h1>
            <form method="post" action="/signup" onSubmit={handleSubmit(onSubmit)}>
                <div className="login">
                    <h1 className="signuptitle">Sign Up to UniEval</h1>
                    <div className="textbox">
                        <input placeholder="Username" {...register("username", { required: { value: true, msg: "Please enter a registration number" }, maxLength: { value: 9, msg: "Max length exceeded" }, minlength: { value: 9, msg: "Min length is 9" } },)} />
                    </div>
                    <div className="textbox1">
                        <input placeholder="Password" {...register("password", { required: true })} />
                        {errors.password && <div className="errors">This field is required</div>}
                    </div>
                    <div className="textbox2">
                        <input placeholder="Email" {...register("email", { required: true })} />
                    </div>
                    <h6 className="loggin" onClick={handlelogin}>Log in</h6>
                    <input className="submit1" type="submit" />
                </div>
            </form>

        </>
    )
}
export default Signup;