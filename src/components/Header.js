import React from "react";
import AddMovieContainer from "../containers/AddMovieContainer";
import GenreNav from "./GenreNav";
import "../styles/header.css";

const Header = props => (
    <div className="headerContainer">
        <div className="logo">Tal's Movie Library</div>
        <div className="searchBar">
            <input
                type="text"
                placeholder=" Search movie"
                onChange={e => {
                    props.filteredMoviesByName(e.target.value);
                }}
            />
            <GenreNav
                filterByGenre={props.filteredMoviesByGenre}
                showSelectedGenre={props.state.filterMoviesByGenre}
            />
        </div>

        <AddMovieContainer />
    </div>
);

export default Header;
