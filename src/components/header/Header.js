import React, {useContext} from "react";
import "./Header.css"
import {NavLink} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faClapperboard, faCircleUser} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "../../context/AuthContext";

function Header() {
    const {isAuthenticated} = useContext(AuthContext);

    return (
        <header>
            {/*aanpassen naar inner en outer container*/}
            <div className= "outer-container">
                <div className= "inner-container">
                    <div className= "brand">
                        <NavLink to="/"> <FontAwesomeIcon icon={faClapperboard}></FontAwesomeIcon> </NavLink>
                    </div>
                    <ul className="nav-links">

                        <li>
                            <NavLink to="/watchlist">watchlist</NavLink>
                        </li>

                        <li>
                            <NavLink to="/watched">watched</NavLink>
                        </li>

                        <li>
                            <NavLink to="/" className="btn">+ add</NavLink>
                        </li>
                        {/*Als de gebruiker is ingelogd wordt je naar de profielpagina gelinked zolang de gebruiker is ingelogd*/}
                        <li>
                            {isAuthenticated ?
                                <NavLink to="/profile"> <FontAwesomeIcon icon={faCircleUser}></FontAwesomeIcon> </NavLink> :
                                <NavLink to="/login"> <FontAwesomeIcon icon={faCircleUser}></FontAwesomeIcon> </NavLink>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;