import React, { useState, useEffect } from "react";
import axios from "axios";
import ResultCard from "../../components/resultcard/ResultCard";
import "./Add.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faSearch} from "@fortawesome/free-solid-svg-icons";


function Add() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, toggleError] = useState(false);


    useEffect(() => {
        async function fetchData() {
            toggleError(false);

            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`,
                );
                setResults(response.data.results);
            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

        if (query) {
            fetchData();
        }
    }, [query]);

    return (
        <div className="add-page">
            <div className="container">
                <div className="add-content">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder="Search a movie title"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="text"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
                        {query && results.length === 0 && !error &&
                            <span className="no-movies">
                                No search results found. Please try again :)
                            </span>}
                    </div>
                    {results.length > 0 && (
                        <ul className="results">
                            {results.map((movie) => (
                                <li key={movie.id}>
                                    <ResultCard movie={movie}/>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
export default Add;
