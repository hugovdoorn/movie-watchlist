import React, {useState} from "react";
import MovieControls from "../moviecontrols/MovieControls"
import "./Moviecard.css"
import {useNavigate} from "react-router-dom";

function MovieCard({movie, type}) {
    const [showOverview, setShowOverview] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="movie-card" onMouseEnter={() => setShowOverview(true)} onMouseLeave={() => setShowOverview(false)}>
            <div className="overlay"></div>
            {movie.poster_path ? (
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                     alt={`${movie.title} Poster`}
                />
            ) : (
                <div className="filler-poster"></div>
            )}
            {showOverview && (
                <p onClick={() => navigate(`/overview/${movie.id}`)} className="overview">
                    Description: {movie.overview.substring(0, 88)}
                    {movie.overview.length > 88 && "..."}
                </p>
            )}
            <MovieControls type={type} movie={movie} />
        </div>
    );
}

export default MovieCard;