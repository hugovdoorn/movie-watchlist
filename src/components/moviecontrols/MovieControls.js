import React, {useContext} from "react";
import "./MovieControls.css"
import {GlobalContext} from "../../context/GlobalState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faEye, faXmark, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
function MovieControls({movie, type}) {
    const {
        removeMovieFromWatchList,
        addMovieToWatched,
        moveToWatchList,
        removeFromWatched} = useContext(GlobalContext);

return (
<div className="inner-card-controls">
{/* In de watchlist willen we andere controls/buttons dan in de watched lijst*/}
    {type === "watchlist" &&(
        <>
        <button className="ctrl-btn"
                onClick={() => addMovieToWatched(movie)}
        >
            <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
        </button>

            <button className="ctrl-btn"
                    // de functionaliteit om via de context in dit onClick event films te verwijderen van de watchlist
                    onClick={() => removeMovieFromWatchList(movie.id)}
            >
                <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
            </button>
        </>
    )}

    {type === "watched" &&(
        <>
        <button className="ctrl-btn"
                onClick={() => moveToWatchList(movie)}
        >
        <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
        </button>

        <button className="ctrl-btn"
        // de functionaliteit om via de context in dit onClick event films te verwijderen van de watchlist
                onClick={() => removeFromWatched(movie.id)}
        >
        <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
        </button>
        </>
    )}
</div>
);
}

export default MovieControls;