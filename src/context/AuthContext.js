import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({});
function AuthContextProvider({ children }) {

    const [auth, toggleAuth] = useState({
        isAuth: false,
        username: null,
        status: "pending",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            fetchUserData(token)
        } else {
            toggleAuth({
                ...auth,
                status: "done",
            });
        }
    }, [] );

    async function fetchUserData(token) {
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
        username: auth.username,
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
