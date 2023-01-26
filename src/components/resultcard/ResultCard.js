import React from "react";
import "./ResultCard.css"
import {GlobalContext} from "../../context/GlobalState";
import "../../pages/add/Add";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons";

function ResultCard({movie}) {
    const {
        addMovieToWatchList,
        addMovieToWatched,
        watchlist,
        watched } = React.useContext(GlobalContext);

    let storedMovie = watchlist.find((obj) => obj.id === movie.id);
    let storedMovieWatched = watched.find((obj) => obj.id === movie.id);

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
                    <h4 className="release-date">
                        Release: {movie ? movie.release_date.substring(0, 4) : "-"}
                    </h4>
                    <h4 className="release-date">
                        <FontAwesomeIcon icon={faStar}></FontAwesomeIcon> {movie ? movie.vote_average : "-"}
                    </h4>
                </div>
                <div className="controls">
                    <button
                        className="btn"
                        disabled={watchListDisabled}
                        onClick={() => addMovieToWatchList(movie)}
                    >Add to Watchlist
                    </button>
                    <button
                        className="btn"
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