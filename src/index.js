import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import rootReducer from "./reducers/index.js";
import { createStore } from "redux";
import { addMovie } from "./actions/index.js";

/* CREATE THE STORE */
const store = createStore(rootReducer);

/* ALL THE CURRENT MOVIES  */
const moviesArray = [
    "The Mummy",
    "Lord Of The Rings",
    "Harry Potter",
    "Saw",
    "Twilight",
    "Ted",
    "Finding nemo",
    "The incredibles",
    "Lone survivor",
    "Law abiding citizen",
    "Avatar",
    "The notebook"
];

/* FETCH MOVIES FUNC */
const fetchMovies = async movieName => {
    const url = `https://www.omdbapi.com/?apikey=34f9503e&t=${movieName}`;
    const data = await fetch(url);
    const json = await data.json();
    const {
        Title: title,
        Year: year,
        Runtime: runtime,
        Genre: genre,
        Director: director,
        Poster: image,
        Plot: plot
    } = json;
    const movieData = { title, year, runtime, genre, director, image, plot };
    store.dispatch(addMovie(movieData));
};

for (let i = 0; i < moviesArray.length; i++) {
    fetchMovies(moviesArray[i]);
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
