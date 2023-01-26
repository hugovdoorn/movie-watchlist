import React, {useState, useEffect} from "react";
import "./Profile.css";
import ProfilePic from "../../assets/images/profile_pic.jpg";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import axios from "axios";

function Profile(key) {
    const {isAuthenticated, logoutFunction} = useContext(AuthContext);
    const [userData, setUserData] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            const fetchData = async () => {
                try {
                    const res = await axios.get("https://frontend-educational-backend.herokuapp.com/api/user", {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        }
                    });
                    setUserData(res.data);
                } catch (e) {
                    console.error(e.response);
                }
            };
            fetchData();
        }
    }, [isAuthenticated]);
    const handleLogout = () => {
        logoutFunction();
        localStorage.clear();
        window.location.reload();
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
