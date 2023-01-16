import React, {createContext, useReducer, useEffect} from "react";
import AppReducer from "./AppReducer"

// initial state
const initialState = {
     // JSON.parse zorgt ervoor dat de string uit use effect weer een array wordt. Als er geen film is wordt aangegeven door teken : geef dan de lege array terug []
    watchlist: localStorage.getItem("watchlist") ? JSON.parse(localStorage.getItem("watchlist")) : [],
    watched: localStorage.getItem("watched") ? JSON.parse(localStorage.getItem("watched")) : [],
};

// create context
export const GlobalContext = createContext(initialState);

// provider components
function GlobalContextProvider(props) {
const [state, dispatch] = useReducer(AppReducer, initialState);

// UseEffect word getriggered wanneer de state veranderd in onze context.provider. Met deze useEffect wil ik de informatie opslaan die veranderd is in de localStorage
useEffect(() => {
    // localStorage moet een string zijn. De watchlist is een array en wordt door JSON.stringify omgezet in een string.
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist))
    localStorage.setItem("watched", JSON.stringify(state.watched))
}, [state]);

    // actions die de add to watchlist button providen/voorzien van actie wat er moet gebeuren.
const addMovieToWatchList = (movie) => {
    dispatch({type: "ADD_MOVIE_TO_WATCHLIST", payload: movie})
}

    // Onderstaande actie is om de film te verwijderen uit de watchlist. Alleen een id word meegegeven omdat het niet specifiek uitmaakt om welke film titel het gaat.
    const removeMovieFromWatchList = (id) => {
        dispatch({type: "REMOVE_MOVIE_TO_WATCHLIST", payload: id})

    }

    // actie aanmaken om een object/film te kunnen verplaatsen van de watchlist naar watched
    const addMovieToWatched = (movie) => {
        dispatch({type: "ADD_MOVIE_TO_WATCHED", payload: movie})
    }

    // actie om object/ film terug te krijgen naar de watchlist als je deze per ongeluk in je watched lijst hebt gezet
    const moveToWatchList = (movie) => {
        dispatch({type: "MOVE_TO_WATCHLIST", payload: movie})
    }

    // Verwijder de fim uit de watched lijst
    const removeFromWatched = (id) => {
        dispatch({type: "REMOVE_FROM_WATCHED", payload: id})
    }

    return (
        <GlobalContext.Provider
            value={{
                watchlist: state.watchlist,
            watched: state.watched,
            //     hetzelfde als syntax addMovieToWatchList : addMovieToWatchList
            addMovieToWatchList,
                // Toevoegen aan de GlobalContext.provider zodat je vanuit andere componenten er toegang tot hebt.
                removeMovieFromWatchList,
        //         Doorgeven aan onze value
                addMovieToWatched,
                moveToWatchList,
                removeFromWatched,
        }} >
            {props.children}
             {/*hier komt het component waar we onze eigen provider omheen wikkelen*/}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;
