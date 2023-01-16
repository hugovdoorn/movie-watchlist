    import {Link} from "react-router-dom";
    import {AuthContext} from "../../context/AuthContext";
    import {useContext} from "react";
    import axios from "axios";
    import "./Login.css"
    import {useForm} from "react-hook-form";

    function Login(){
        const {register, handleSubmit, formState: {errors}} = useForm();
        const {loginFunction} = useContext(AuthContext)
        const bASE_URI = `https://frontend-educational-backend.herokuapp.com/api/auth/signin`
        
        async function onFormSubmit(data) {
            try {
                const response = await axios.post(bASE_URI, {
                    username: data.username,
                    password: data.password,
                });
                console.log(response)
                loginFunction(response.data)

            } catch (e) {
                console.error(e);
                if (e.response.status === 401) {
                    alert("Credentials dont match, try again.")
                }
            }
        }

    return(
        <div className="login">
            <h1 className="login-title">login</h1>
            <form className="login-form" onSubmit={handleSubmit(onFormSubmit)}  >
                <label>username</label>
                <input type="text"
                       className="login-input"
                       placeholder="Enter a minimum of 6 characters..."
                       id="username"
                       {...register("username", {
                           required: true,
                           minLength: {value: 6, message: "Minimum amount of characters is 6",},
                       })}
                />
                {errors.username && <p>{errors.username.message}</p>}
                <label>password</label>
                <input type="password"
                       className="login-input"
                       placeholder="Enter a minimum of 6 characters..."
                       id="password"
                       {...register("password", {
                           required: true,
                           minLength: {value: 6, message: "Minimum amount of characters is 6"}
                       })}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <button className="login-button" type="submit">
                    login
                </button>
            </form>

            <Link to="/register">
                <button className="login-register-button">
                    register
                </button>
            </Link>

        </div>
    )
}

export default Login