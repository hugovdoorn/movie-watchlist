import React from "react";
import "./ResultCard.css"
import {GlobalContext} from "../../context/GlobalState";
import "../../pages/add/Add";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons";

function ResultCard({movie}) {
    // grab/ pak de actie die we hebben gemaakt en deze kunnen we destructuren, addMovieToWatchList, watchlist en watched array importeren uit de context
    const {
        addMovieToWatchList,
        addMovieToWatched,
        watchlist,
        watched } = React.useContext(GlobalContext);

    // Variabele om ervoor te zorgen dat een film maar een keer kan worden opgeslagen in de addMovieToWatchList
    // watchlist.find betekent zoeken door de array naar elk object (0) (film) in ons geval. Die gelijk is aan een film. Als het object/film er al in staat kan die niet nogmaals worden toegevoegd aan de watchlist
    let storedMovie = watchlist.find((obj) => obj.id === movie.id);

    // Deze variabele zorgt ervoor dat je de button "add to watchlist" niet meer ziet in het Add component als je de film al toe hebt gevoegd aan watched
    let storedMovieWatched = watched.find((obj) => obj.id === movie.id);

    // watchListDisabled zorgt ervoor dat de button om de film toe te voegen greyed-out wordt weergegeven als de film als is toegevoegd.
    const watchListDisabled = storedMovie ? true : !!storedMovieWatched;
    const watchedDisabled = !!storedMovieWatched;

    return (
<div className="result-card">
<div className="poster-wrapper">
    {movie.poster_path ? (
        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
             alt={`${movie.title} Poster`}
        />
    ) : (
        <div className="filler-poster"></div>
    )}
</div>
    <div className="info">
        <div className="header">
            <h3 className="title">{movie.title}</h3>
            {/*substring aanmaken van 0 tot 4 waardoor alleen het jaar wordt terug gegeven de eerste 4 cijfers*/}
            <h4 className="release-date">
                {/*om error op te vangen als film geen release_date heeft substring heeft aan om alleen het jaartal weer te geven*/}
                Release: {movie ? movie.release_date.substring(0, 4) : "-"}
            </h4>
            <h4 className="release-date">
                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon> {movie ? movie.vote_average : "-"}
            </h4>
        </div>

        <div className="controls">
            <button
                className="btn"
                // disabled element aanmaken om de button addtowatchlist niet te kunnen aanklikken
                disabled={watchListDisabled}
                onClick={() => addMovieToWatchList(movie)}
            >Add to Watchlist
            </button>

                <button
                    className="btn"
                     // disabled element aanmaken om de button addtowatchlist niet te kunnen aanklikken
                    disabled={watchedDisabled}
                    onClick={() => addMovieToWatched(movie)}
                >Add to Watched
                </button>
        </div>
    </div>
</div>
);
}

export default ResultCard;