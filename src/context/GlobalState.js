import React, {createContext, useReducer, useEffect} from "react";
import AppReducer from "./AppReducer"

const initialState = {
    watchlist: localStorage.getItem("watchlist")
        ? JSON.parse(localStorage.getItem("watchlist"))
        : [],
    watched: localStorage.getItem("watched")
        ? JSON.parse(localStorage.getItem("watched"))
        : [],
};
export const GlobalContext = createContext(initialState);

function GlobalContextProvider(props) {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
        localStorage.setItem("watched", JSON.stringify(state.watched));
    }, [state]);

    const addMovieToWatchList = (movie) => {
        dispatch({type: "ADD_MOVIE_TO_WATCHLIST", payload: movie})
    }
    const removeMovieFromWatchList = (id) => {
        dispatch({type: "REMOVE_MOVIE_TO_WATCHLIST", payload: id})
    }
    const addMovieToWatched = (movie) => {
        dispatch({type: "ADD_MOVIE_TO_WATCHED", payload: movie})
    }
    const moveToWatchList = (movie) => {
        dispatch({type: "MOVE_TO_WATCHLIST", payload: movie})
    }
    const removeFromWatched = (id) => {
        dispatch({type: "REMOVE_FROM_WATCHED", payload: id})
    }

    return (
        <GlobalContext.Provider
            value={{
                watchlist: state.watchlist,
                watched: state.watched,
                token: state.token,
                addMovieToWatchList,
                removeMovieFromWatchList,
                addMovieToWatched,
                moveToWatchList,
                removeFromWatched,
            }} >
            {props.children}
        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider;
