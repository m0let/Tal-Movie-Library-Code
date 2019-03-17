import React from "react";
import MovieCard from "./MovieCard.js";
import Modal from "react-responsive-modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AddMovieError from "./AddMovieError";

class ManageMovieCard extends React.Component {
    holdMovieIdToDelete = -1;
    constructor(props) {
        super(props);
        this.state = {
            showEditModal: false,
            allCurrentMovies: this.props.state.movies,
            movieYouAreCurrentlyEditing: {},
            displayErrorMessage: false,
            errorMessage: "",
            showDeleteMovieModal: false,
            holdMovieTitleBeforeFinishToEdit: ""
        };
    }

    componentDidMount() {
        this.fixMoviesTitleNames();
    }

    fixMoviesTitleNames = () => {
        let allCurrentMovies = [...this.state.allCurrentMovies];
        for (let i = 0; i < allCurrentMovies.length; i++) {
            allCurrentMovies[i].title = this.capitalizeWords(allCurrentMovies[i].title);
        }
        this.setState({ allCurrentMovies });
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.allCurrentMovies !== this.props.state.movies) {
            const allCurrentMovies = this.props.state.movies;
            this.setState({
                allCurrentMovies
            });
        }
    }

    checkEditFields = e => {
        let fixTitleBeforeEditing = this.state.movieYouAreCurrentlyEditing.title;
        fixTitleBeforeEditing = this.removeNonEnglishLettersFromTitle(fixTitleBeforeEditing);
        fixTitleBeforeEditing = this.removeExtraSpacingBetweenWords(fixTitleBeforeEditing).trim();
        // CHECK IF SOME OF THE FIELDS ARE EMPTY
        if (
            fixTitleBeforeEditing.length === 0 ||
            this.state.movieYouAreCurrentlyEditing.runtime.trim() === "" ||
            this.state.movieYouAreCurrentlyEditing.genre.trim() === "" ||
            this.state.movieYouAreCurrentlyEditing.director.trim() === "" ||
            this.state.movieYouAreCurrentlyEditing.title === ""
        ) {
            this.setState({
                displayErrorMessage: true,
                errorMessage: "Please do not leave empty fields"
            });
        } else if (
            this.state.movieYouAreCurrentlyEditing.year.length !== 4 ||
            parseInt(this.state.movieYouAreCurrentlyEditing.year) < 1950 ||
            parseInt(this.state.movieYouAreCurrentlyEditing.year) > 2020
        ) {
            this.setState({
                displayErrorMessage: true,
                errorMessage: "A year must be between 1950 and 2020"
            });
        } else {
            // CHECK IF THE TITLE ALREADY EXIST
            if (
                this.checkIfMovieTitleAlreadyExist(
                    this.state.movieYouAreCurrentlyEditing.id,
                    fixTitleBeforeEditing
                )
            ) {
                this.setState({
                    displayErrorMessage: true,
                    errorMessage: "Same movie name is already exist"
                });
            } else {
                fixTitleBeforeEditing = this.capitalizeWords(fixTitleBeforeEditing);
                // INSERT CHANGES TO THE CURRECT MOVIE
                this.props.editMovie({
                    ...this.state.movieYouAreCurrentlyEditing,
                    title: fixTitleBeforeEditing
                });
                this.onCloseModal();
            }
        }
    };

    removeNonEnglishLettersFromTitle = movieTitle => {
        return movieTitle.replace(/[^A-Za-z0-9]/g, " ");
    };

    removeExtraSpacingBetweenWords = movieTitle => {
        return movieTitle.replace(/\s+/g, " ");
    };

    capitalizeWords = movieTitle => {
        return movieTitle
            .replace(/\w\S*/g, txt => {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            })
            .trim();
    };

    checkIfMovieTitleAlreadyExist = (editMovieId, title) => {
        const newTitle = title.toLowerCase().trim();
        for (let i = 0; i < this.state.allCurrentMovies.length; i++) {
            const { id, title } = this.state.allCurrentMovies[i];
            if (newTitle === title.toLowerCase() && editMovieId !== id) {
                return true;
            }
        }
        return false;
    };

    handleEditMovie = movieId => {
        const movieYouAreCurrentlyEditing = this.state.allCurrentMovies.find(
            ({ id }) => id === movieId
        );
        this.setState({
            showEditModal: true,
            movieYouAreCurrentlyEditing,
            holdMovieTitleBeforeFinishToEdit: movieYouAreCurrentlyEditing.title
        });
    };

    handleMovieTitle = e => {
        const movieYouAreCurrentlyEditing = {
            ...this.state.movieYouAreCurrentlyEditing,
            title: e.target.value
        };
        this.setState({
            movieYouAreCurrentlyEditing
        });
    };

    handleMovieYear = e => {
        /* UPDATE THE YEAR ONLY WHEN ITS A NUMBER */
        const regex = /^[0-9\b]+$/;
        const movieYear = e.target.value;
        if (movieYear === "" || regex.test(movieYear)) {
            const movieYouAreCurrentlyEditing = {
                ...this.state.movieYouAreCurrentlyEditing,
                year: movieYear
            };
            this.setState({
                movieYouAreCurrentlyEditing
            });
        }
    };

    handleMovieRuntime = e => {
        const movieYouAreCurrentlyEditing = {
            ...this.state.movieYouAreCurrentlyEditing,
            runtime: e.target.value
        };
        this.setState({
            movieYouAreCurrentlyEditing
        });
    };

    handleMovieGenre = e => {
        const movieYouAreCurrentlyEditing = {
            ...this.state.movieYouAreCurrentlyEditing,
            genre: e.target.value
        };
        this.setState({
            movieYouAreCurrentlyEditing
        });
    };

    handleMovieDirector = e => {
        const movieYouAreCurrentlyEditing = {
            ...this.state.movieYouAreCurrentlyEditing,
            director: e.target.value
        };
        this.setState({
            movieYouAreCurrentlyEditing
        });
    };

    showDeleteModal = movieId => {
        this.holdMovieIdToDelete = movieId;
        this.setState({ showDeleteMovieModal: true });
    };

    onCloseModal = () => {
        this.setState({
            showEditModal: false,
            showDeleteMovieModal: false,
            displayErrorMessage: false,
            errorMessage: ""
        });
    };

    render() {
        const movieDeleted = localStorage.getItem("movieDeleted") === "true";
        let moviesToDisplay;
        /*  DISPLAY FILTERED MOVIES BY GENRE */
        if (this.props.state.filterMoviesByGenre !== "") {
            moviesToDisplay = this.state.allCurrentMovies.filter(movie => {
                return movie.genre
                    .toLowerCase()
                    .includes(this.props.state.filterMoviesByGenre.toLowerCase());
            });
        } else {
            /*   DISPLAY aLL MOVIES OR FILTERED MOVIES BY MOVIE NAME  */
            moviesToDisplay = this.state.allCurrentMovies.filter(movie => {
                return movie.title
                    .toLowerCase()
                    .includes(this.props.state.filterMoviesByName.toLowerCase());
            });
        }
        return (
            <React.Fragment>
                {/*    DISPLAY ALL MOVIE CARDS     */}
                {moviesToDisplay.map((movie, index) => (
                    <MovieCard
                        showDeleteModal={this.showDeleteModal}
                        {...movie}
                        showEditModal={this.handleEditMovie}
                        key={index}
                        toFixFlip={movieDeleted}
                    />
                ))}
                {this.state.showEditModal && (
                    /*  EDIT MODAL   */
                    <Modal
                        open={this.state.showEditModal}
                        onClose={this.onCloseModal}
                        closeOnOverlayClick={false}
                        closeOnEsc={true}
                        showCloseIcon={false}
                    >
                        <Form>
                            {/*  EDIT TITLE  */}
                            <Form.Group>
                                <h3>Edit movie: {this.state.holdMovieTitleBeforeFinishToEdit}</h3>
                                <Form.Label>Edit movie title:</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={this.handleMovieTitle}
                                    maxLength={65}
                                    value={this.state.movieYouAreCurrentlyEditing.title}
                                />
                            </Form.Group>
                            {/*  EDIT YEAR  */}
                            <Form.Group>
                                <Form.Label>Edit year:</Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength={4}
                                    onChange={this.handleMovieYear}
                                    value={this.state.movieYouAreCurrentlyEditing.year}
                                />
                            </Form.Group>
                            {/*  EDIT RUNTIME  */}
                            <Form.Group>
                                <Form.Label>Edit runtime:</Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength={7}
                                    onChange={this.handleMovieRuntime}
                                    value={this.state.movieYouAreCurrentlyEditing.runtime}
                                />
                            </Form.Group>
                            {/*  EDIT GENRE  */}
                            <Form.Group>
                                <Form.Label>Edit genre:</Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength={65}
                                    onChange={this.handleMovieGenre}
                                    value={this.state.movieYouAreCurrentlyEditing.genre}
                                />
                            </Form.Group>
                            {/*  EDIT DIRECTOR  */}
                            <Form.Group>
                                <Form.Label>Edit director:</Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength={35}
                                    onChange={this.handleMovieDirector}
                                    value={this.state.movieYouAreCurrentlyEditing.director}
                                />
                            </Form.Group>
                            {/*  SAVE AND CANCEL BUTTONS */}
                            <Form.Group>
                                <div>
                                    <Button variant="success" onClick={this.checkEditFields}>
                                        Save
                                    </Button>
                                    <Button variant="secondary" onClick={this.onCloseModal}>
                                        Cancel
                                    </Button>
                                </div>
                            </Form.Group>
                            {/*    ERROR MESSAGES    */}
                            {this.state.displayErrorMessage && (
                                <AddMovieError errorMessage={this.state.errorMessage} />
                            )}
                        </Form>
                    </Modal>
                )}
                {/*    DELETE MOVIE MODAL     */}
                {this.state.showDeleteMovieModal && (
                    <Modal
                        open={true}
                        onClose={this.onCloseModal}
                        closeOnOverlayClick={false}
                        closeOnEsc={false}
                        showCloseIcon={false}
                    >
                        <h5>Are you sure you want to delete this movie?</h5>
                        <Button
                            onClick={() => {
                                this.onCloseModal();
                                localStorage.setItem("movieDeleted", true);
                                this.props.deleteMovie(this.holdMovieIdToDelete);
                            }}
                            size="small"
                            variant="outline-success"
                        >
                            OK
                        </Button>
                        <Button onClick={this.onCloseModal} size="small" variant="outline-danger">
                            Cancel
                        </Button>
                    </Modal>
                )}
            </React.Fragment>
        );
    }
}

export default ManageMovieCard;
