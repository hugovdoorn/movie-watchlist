import React, {useContext} from "react";
import "./App.css";
import {Routes, Route, Navigate} from "react-router-dom";
import Header from "./components/header/Header";
import Watchlist from "./pages/watchlist/Watchlist";
import Watched from "./pages/watched/Watched";
import Add from "./pages/add/Add";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import {AuthContext} from "./context/AuthContext";
import Overview from "./pages/overview/Overview";

function App() {
    const {isAuthenticated} = useContext(AuthContext);

    return (
        <>
            <Header />
            <div className= "outer-container">
                <Routes>
                    <Route exact path="/" element={<Add />} />
                    <Route path="/watched" element={isAuthenticated ? <Watched /> : <Navigate to="/login"/>} />
                    <Route path="/watchlist" element={ isAuthenticated ? <Watchlist /> : <Navigate to="/login"/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/overview/:id" element={<Overview />} />
                    <Route path="/profile" element={isAuthenticated ? <Profile/> : <Navigate to="/"/>}/>
                </Routes>
            </div>
        </>
    );
}
export default App;
