import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
export const AuthContext = createContext({});
function AuthContextProvider({ children }) {
    const [auth, toggleAuth] = useState({
        isAuth: false,
        username: null,
        status: "pending",
    });

    useEffect(() => {
        // check of er nog een token in Local Storage staat
        const token = localStorage.getItem("token");

        if (token) {
            const decodedToken = jwtDecode(token)
            fetchUserData(token, decodedToken)
            console.log(decodedToken);
        } else {
            toggleAuth({
                ...auth,
                status: "done",
            });
        }
    }, [], );

    // ZO JA: haal dan de nieuwe data op en zet deze in de state:
    async function fetchUserData(token, decodedToken) {
        try {
            const response = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            console.log(response)

            toggleAuth({
                ...auth,
                isAuth: true,
                email: response.data.email,
                id: response.data.id,
                username: response.data.username,
                status: "done"
            });
        } catch (e) {
            console.error(e)
            localStorage.clear();
            toggleAuth({
                ...auth,
                status: "done",
            });
        }
    }

    const navigate = useNavigate();

    function login(userInfo) {
        localStorage.setItem("token", userInfo.accessToken);

        toggleAuth({
            ...auth,
            isAuth: true,
            username: userInfo.username,
            id: userInfo.id,
            email: userInfo.email,
        });
        navigate("/profile");
    }

    function logout() {
        toggleAuth({
            ...auth,
            isAuth: false,
            username: null,
        });
        navigate("/");
    }

    const contextData = {
        isAuthenticated: auth.isAuth,
        authFunction: toggleAuth,
        loginFunction: login,
        logoutFunction: logout,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === "done" ? children : <p>Loading...</p> }
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;
