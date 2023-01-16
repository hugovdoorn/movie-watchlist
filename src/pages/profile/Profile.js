import React, { useState, useEffect } from "react";
import "./Profile.css";
import ProfilePic from "../../assets/images/profile_pic.jpg";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import axios from "axios";

function Profile() {
    const { isAuthenticated, logoutFunction } = useContext(AuthContext);
// Get userData from local storage if exists, otherwise use an empty object
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")) || { username: "", email: "", watched: [], watchlist: [] });

    useEffect(() => {
        // Check if userData is empty
        if (!Object.keys(userData).length) {
            // If it is, try to get it from localStorage
            setUserData(JSON.parse(localStorage.getItem("userData")) || {});
        }
    }, [userData]);

    useEffect(() => {
        if (isAuthenticated) {
            // Fetch user data only if user is authenticated
            const fetchData = async () => {
                try {
                    // Add authorization header with the user's access token
                    const res = await axios.get("https://frontend-educational-backend.herokuapp.com/api/user", {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        }
                    });
                    // Save the user data to local storage
                    localStorage.setItem("userData", JSON.stringify({ username: res.data.username, email: res.data.email, watched: res.data.watched, watchlist: res.data.watchlist }));
                    // Update the state
                    setUserData({ username: res.data.username, email: res.data.email, watched: res.data.watched, watchlist: res.data.watchlist });
                } catch (e) {
                    console.error(e.response);
                }
            };
            fetchData();
        }
    }, [isAuthenticated]);

    const handleLogout = () => {
        logoutFunction();
        localStorage.removeItem("token");
    }

    return (
        <div className="profile">
            <form className="profile-form">
                <h2>profile picture</h2>
                <div className="profile-pic">
                    <img className="profile-img" src={ProfilePic} alt="logo" />
                </div>
                <h2>username:</h2>
                <p>{userData.username}</p>
                <h2>email address:</h2>
                <p>{userData.email}</p>
                <h2>password:</h2>
                <p>******</p>
            </form>
            {isAuthenticated === true &&
                <button className="logout-btn" type="button" onClick={handleLogout}>
                    logout
                </button>
            }
        </div>
    );
}

export default Profile;
