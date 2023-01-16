import React, { useEffect, useState } from "react";
import "./Overview.css"
import axios from "axios";
import { useParams } from "react-router-dom";

function Overview() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchOverview() {
            setError(false);
            setLoading(true);

            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                setMovie(response.data);
            } catch (e) {
                console.error(e);
                setError(true);
            }

            setLoading(false);
        }

        if (id) {
            fetchOverview();
        }
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: getting the movie description information went wrong. Please try again. </p>;
    }

    if (!movie) {
        return null;
    }

    return (
        <>
            <div className="movie-page">
                <div className="container">
                    <div className="header">
                        <h1 className="heading">{movie.title}</h1>
                    </div>
                    <h2 className="heading">description:</h2>
                    <p className="overview-info">{movie.overview}</p>
                </div>
            </div>
        </>
    );
}

export default Overview;


