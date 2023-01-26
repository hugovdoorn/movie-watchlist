import "./Register.css";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import React from "react";

function Register(){
    const {register, handleSubmit, formState: {errors} } = useForm();
    const BASE_URI = `https://frontend-educational-backend.herokuapp.com/api/auth/signup`;
    const navigate = useNavigate();

    async function onFormSubmit(data) {
        try {
            const response = await axios.post(BASE_URI, {
                username: data.username,
                email: data.email,
                password: data.password,
                role: ["user"]
            });
            console.log(response)
            navigate("/login")

        } catch (e) {
            console.error(e)
            alert(e.response.data.message)
        }
        console.log(data);
    }
    return(
        <div className="register">
            <h1 className="register-title">register</h1>
            <form className="register-form" onSubmit={handleSubmit(onFormSubmit)}>
                <label>username</label>
                <input
                    type="text"
                    className="register-input"
                    placeholder="Enter a minimum of 6 characters..."
                    id="user-email"
                    {...register("username", {
                        required: true,
                        minLength: {value: 6, message: "Minimum amount of characters is 6",},
                    })}
                />
                {errors.username && <p>{errors.username.message}</p>}
                <label>email address</label>
                <input
                    type="text"
                    className="register-input"
                    placeholder="Enter @ minimum of 6 characters..."
                    {...register("email", {
                        required: true,
                        minLength: {value: 6, message: "Minimum amount of characters is 6",},
                        // pattern gebruikt die wordt opgebouwd door middel van een regular expression (RegEx)
                        validate: (value) => /^.+@.+\..+$/.test(value) || 'Email should contain an @ character',
                    })}
                />
                {errors.email && <p>{errors.email.message || errors.validate}</p>}
                <label>password</label>
                <input
                    type="password"
                    className="register-input"
                    placeholder="Enter a minimum of 6 characters..."
                    {...register("password", {
                        required: true,
                        minLength: {value: 6, message: "Minimum amount of characters is 6"}
                    })}
                />
                {errors.password && <p>{errors.password.message}</p>}

                <button type="submit" className="register-button" >register</button>
            </form>
            <Link to="/login">
                <button className="register-login-button">
                    login
                </button>
            </Link>
        </div>
    )
}

export default Register;


