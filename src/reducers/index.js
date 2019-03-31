import { stat } from "fs";

const initialState = {
    movies: [],
    filterMoviesByName: "",
    filterMoviesByGenre: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "EDIT_MOVIE":
            const newStateAfterEditMovie = state.movies.map(movie =>
                movie.id === action.movieToEdit.id ? Object.assign({}, action.movieToEdit) : movie
            );
            return Object.assign({}, state, {
                movies: newStateAfterEditMovie
            });
        case "DELETE_MOVIE":
            const newStateAfterDeleteTheSelectedMovie = state.movies.filter(movie => {
                return movie.id !== action.movieIdToDelete;
            });
            return {
                ...state,
                movies: newStateAfterDeleteTheSelectedMovie
            };
        case "ADD_NEW_MOVIE":
            const newMovie = { ...action.movieToAdd };
            return {
                ...state,
                movies: [...state.movies, newMovie]
            };
        case "DISPLAY_FILTERED_MOVIES_BY_NAME":
            return Object.assign({}, state, {
                filterMoviesByName: action.movieName
            });
        case "DISPLAY_FILTERED_MOVIES_BY_GENRE":
            return Object.assign({}, state, {
                filterMoviesByGenre: action.movieGenre === "All" ? "" : action.movieGenre
            });
        default:
            return state;
    }
};
