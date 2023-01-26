import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalContextProvider from "./context/GlobalState";
import AuthContextProvider from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <React.StrictMode>
            <GlobalContextProvider>
                <AuthContextProvider>
                    <App/>
                </AuthContextProvider>
            </GlobalContextProvider>
        </React.StrictMode>
    </Router>
);

