import React from "react";
import MovieCardContainer from "./containers/MovieCardContainer";
import HeaderContainer from "./containers/HeaderContainer";
import "./styles/global.css";
import "./styles/app.css";

const App = () => (
    <div className="appContainer">
        <HeaderContainer />
        <div className="allMoviesContainer">
            <MovieCardContainer />
        </div>
    </div>
);

export default App;
