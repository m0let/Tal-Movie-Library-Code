import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../styles/genreNav.css";

const GenreNav = props => {
    const moviesGenre = [
        "All",
        "Action",
        "Drama",
        "Comedy",
        "Adventure",
        "Crime",
        "Animation",
        "Thriller",
        "Horror",
        "Sci-Fi",
        "War",
        "Fantasy",
        "Romance",
        "Mystery"
    ];
    return (
        <div className="genreContainer">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {props.showSelectedGenre === "" ? "Genre" : props.showSelectedGenre}
                </Dropdown.Toggle>
                <Dropdown.Menu className="genreNavContainer">
                    {moviesGenre.map((movieGenre, index) => (
                        <Dropdown.Item
                            as="button"
                            href={index}
                            key={index}
                            onClick={() => props.filterByGenre(movieGenre)}
                        >
                            {movieGenre}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default GenreNav;
