let nextMovieId = 0;

export const editMovie = movieToEdit => ({
    type: "EDIT_MOVIE",
    movieToEdit
});

export const deleteMovie = movieIdToDelete => ({
    type: "DELETE_MOVIE",
    movieIdToDelete
});

export const addMovie = movieToAdd => ({
    type: "ADD_NEW_MOVIE",
    movieToAdd,
    id: nextMovieId++
});

export const filteredMoviesByName = movieName => ({
    type: "DISPLAY_FILTERED_MOVIES_BY_NAME",
    movieName
});

export const filteredMoviesByGenre = movieGenre => ({
    type: "DISPLAY_FILTERED_MOVIES_BY_GENRE",
    movieGenre
});
