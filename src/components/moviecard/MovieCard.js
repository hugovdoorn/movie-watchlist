import React, {useState} from "react";
import MovieControls from "../moviecontrols/MovieControls"
import "./Moviecard.css"
import {useNavigate} from "react-router-dom";

// property props.type gaat gelijk zijn aan watchlist of watched aan de hand van waar de film is geselecteerd.
function MovieCard({movie, type}) {
    const [showOverview, setShowOverview] = useState(false);
    const navigate = useNavigate();

    // Maak een fill css statement om ervoor te zorgen dat posters die te klein zijn zich volledig aanpassen
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