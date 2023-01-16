// Appreducer zegt hoe de data moet worden opgeslagen in onze local storage
// default lege reducer voordat we er iets mee gaan doen
function AppReducer (state, action) {
    switch(action.type) {
        case "ADD_MOVIE_TO_WATCHLIST":
            return{
                ...state,
                // als je nu op een film klikt komt die in de watchlist omdat de ...state de watchlist heeft gespreid.
                watchlist: [action.payload, ...state.watchlist],
            }
        case "REMOVE_MOVIE_TO_WATCHLIST":
            return {
                ...state,
                // Deze array willen we in deze case filteren zodat films worden gefilterd en worden verwijderd. Als de movie.id al in de array staat zal deze niet meer worden opgenomen in de watchlist
                watchlist: state.watchlist.filter((movie) => movie.id !== action.payload),
            }
        case "ADD_MOVIE_TO_WATCHED":
            return{
                ...state,
                // Nu is de case/actie om de film te verwijderen van het watchlist component en toevoegen aan het watched component. De .id moet ook worden doorgegeven
                watchlist: state.watchlist.filter((movie) => movie.id !== action.payload.id),
                watched: [action.payload, ...state.watched]

            }
        case "MOVE_TO_WATCHLIST":
            return{
                ...state,
                // Nu is de case/actie om de film te verwijderen van het watched component en toevoegen aan het watchlist component. De .id moet ook worden doorgegeven. Hier wordt action.payload.id gebruikt omdat de hele film wordt doorgegeven. daarom is .id nodig
                watched: state.watched.filter((movie) => movie.id !== action.payload.id),
                watchlist: [action.payload, ...state.watchlist]

            }
        case "REMOVE_FROM_WATCHED":
            return{
                ...state,
                // Mu is de actie/case dat er een object/film verwijderd wordt uit de watched lijst. Hier is action.payload voldoende omdat we de .id doorgeven.
                watched: state.watched.filter((movie) => movie.id !== action.payload),
            }
        default:
            return state;
    }
}

export default AppReducer;