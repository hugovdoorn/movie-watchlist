import React, {useContext} from "react";
import {GlobalContext} from "../../context/GlobalState";
import MovieCard from "../../components/moviecard/MovieCard"
import "./Watched.css"

function Watched() {
    const {watched} = useContext(GlobalContext);

    return (
    <div className="movie-page">
        <div className="container">
            <div className="header">
                <h1 className="heading">watched movies</h1>
                {/*In de span een operator zetten die enkelvoud aangeeft als er één film in lijst staat, staan er meer dan 1 films in lijst dan wordt er meervoud weergegeven. */}
                <span className="count-pill">
                  {watched.length} {watched.length === 1 ? "Movie" : "Movies"}
              </span>
            </div>

            {/*checken of er wel films in de watched staan als er geen films zijn melding weergeven dat er geen films zijn door middel van een ternary operator */}
            {watched.length > 0 ? (
                // in de movie-grid wil ik door de watched heen mappen
                <div className="movie-grid" >
                    {watched.map(movie => (
                        <MovieCard movie={movie} type="watched" key={movie.id} />
                    ))}
                </div>
            ) : (
                <h2 className="no-movies">No movies in your list. Press the +ADD button to add some :) </h2>
            )}
        </div>
    </div>
);
}

export default Watched;