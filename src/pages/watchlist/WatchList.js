import React, {useContext} from "react";
import {GlobalContext} from "../../context/GlobalState";
import MovieCard from "../../components/moviecard/MovieCard";
import "./Watchlist.css"

//  TODO: token koppelen aan de watchlist als de token hetzelfde blijft watchlist bewaren. Mocht er een andere token van een andere gebruiker worden gevonden dan clear de watched en watchlist via localStorage.clear();
// Op deze pagina willen we toegaan tot onze films die zijn opgeslagen in de local storage via de context. Ik wil de films weergeven in een mooie grid.
function Watchlist() {
    const {watchlist} = useContext(GlobalContext);

    return (
    <div className="movie-page">
        <div className="container">
          <div className="header">
              <h1 className="heading">my watchlist</h1>
              {/*In het span element een operator zetten die enkelvoud aangeeft als er één film in lijst staat, staan er meer dan 1 films in lijst dan wordt er meervoud weergegeven. */}
              <span className="count-pill">
                  {watchlist.length} {watchlist.length === 1 ? "Movie" : "Movies"}
              </span>
          </div>

            {/*checken of er wel films in de watched staan als er geen films zijn melding weergeven dat er geen films zijn door middel van een ternary operator */}
            {watchlist.length > 0 ? (
        // in de movie-grid wil ik door de watchlist heen mappen
            <div className="movie-grid">
                {watchlist.map(movie => (
                    <MovieCard movie={movie} type="watchlist" key={movie.id} />
                ))}
            </div>
                ) : (
                    <h2 className="no-movies">No movies in your list. Press the +ADD button to add some :) </h2>
                )}
        </div>
    </div>
);
}

export default Watchlist;