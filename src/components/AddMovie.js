import React from "react";
import Modal from "react-responsive-modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loader from "./Loader";
import AddMovieError from "./AddMovieError";
import "../styles/addMovie.css";
import Alert from "react-bootstrap/Alert";

class ManageAddMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddMovieModal: false,
            displayErrorMessage: false,
            errorMessage: "",
            displayLoader: false,
            disabledAddButton: false,
            showMovieSuccessfullyAddedMessage: false
        };
    }

    handleNewMoiveBeforeAdd = () => {
        this.setState({ disabledAddButton: true, displayLoader: true });
        const lettersNumbersAndSpaces = /^[0-9a-zA-Z ]+$/;
        /*  CHECK IF MOVIE NAME IS EMPTY OR CONTAIN ONLY SPACES */
        if (this.movieName.value.trim().length === 0) {
            this.setState({
                displayErrorMessage: true,
                errorMessage: "Please do not leave empty fields",
                disabledAddButton: false,
                displayLoader: false
            });
        } else if (!this.movieName.value.match(lettersNumbersAndSpaces)) {
            /*  CHECK IF MOVIE NAME NOT CONTAIN ONLY NUMBERS/LETTERS/SPACES */
            this.setState({
                displayErrorMessage: true,
                errorMessage: "Movie name can contain only numbers and english letters",
                disabledAddButton: false,
                displayLoader: false
            });
        } else {
            let fixMovieNameBeforeAdding = this.removeExtraSpacingBetweenWords(
                this.movieName.value
            ).trim();
            // CHECK IF THE MOVIE NAME ALREADY EXIST
            if (this.checkIfMovieNameAlreadyExist(fixMovieNameBeforeAdding)) {
                this.setState({
                    displayErrorMessage: true,
                    errorMessage: "Same movie name is already exist",
                    disabledAddButton: false,
                    displayLoader: false
                });
            } else {
                fixMovieNameBeforeAdding = this.capitalizeWords(fixMovieNameBeforeAdding);
                this.fetchMovies(fixMovieNameBeforeAdding);
            }
        }
    };

    fetchMovies = async movieName => {
        const url = `https://www.omdbapi.com/?apikey=34f9503e&t=${movieName}`;
        const data = await fetch(url);
        const json = await data.json();
        const { Response } = json;
        if (Response !== "False") {
            const {
                imdbID: id,
                Title: title,
                Year: year,
                Runtime: runtime,
                Genre: genre,
                Director: director,
                Poster: image,
                Plot: plot
            } = json;
            const movieData = { id, title, year, runtime, genre, director, image, plot };
            this.props.addMovie({
                ...movieData,
                title: movieName
            });
            this.setState({
                displayErrorMessage: false,
                displayLoader: false,
                showMovieSuccessfullyAddedMessage: true
            });
            setTimeout(() => {
                this.onCloseModal();
            }, 2500);
        } else {
            this.setState({
                displayErrorMessage: true,
                errorMessage: "Movie not found",
                disabledAddButton: false,
                displayLoader: false
            });
        }
    };

    removeExtraSpacingBetweenWords = movieName => {
        return movieName.replace(/\s+/g, " ");
    };

    capitalizeWords = movieName => {
        return movieName
            .replace(/\w\S*/g, txt => {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            })
            .trim();
    };

    checkIfMovieNameAlreadyExist = movieName => {
        return this.props.state.movies.some(
            ({ title }) => title.toLowerCase() === movieName.toLowerCase()
        );
    };

    onOpenModal = () => {
        this.setState({ showAddMovieModal: true });
    };

    onCloseModal = () => {
        this.setState({
            showAddMovieModal: false,
            displayErrorMessage: false,
            errorMessage: "",
            disabledAddButton: false,
            displayLoader: false,
            showMovieSuccessfullyAddedMessage: false
        });
    };

    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.onOpenModal}>
                    Add Movie
                </Button>
                {this.state.showAddMovieModal && (
                    <Modal
                        open={true}
                        onClose={this.onCloseModal}
                        closeOnOverlayClick={false}
                        closeOnEsc={false}
                        showCloseIcon={false}
                    >
                        <Form>
                            <h3>Add new movie</h3>
                            {/*  ADD MOVIE NAME  */}
                            <Form.Group>
                                <Form.Label>Movie name:</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="text"
                                    maxLength={75}
                                    name="movieName"
                                    ref={node => (this.movieName = node)}
                                    onKeyPress={e => {
                                        let code = e.keyCode || e.which;
                                        if (code === 13) {
                                            e.preventDefault();
                                            this.handleNewMoiveBeforeAdd();
                                        }
                                    }}
                                />
                            </Form.Group>
                            {/*  SAVE AND CANCEL BUTTONS */}
                            <Form.Group>
                                <div className="addMovieButtonsContainer">
                                    <Button
                                        variant="success"
                                        disabled={this.state.disabledAddButton}
                                        onClick={this.handleNewMoiveBeforeAdd}
                                        onKeyPress={e => {
                                            let code = e.keyCode || e.which;
                                            if (code === 13) {
                                                e.preventDefault();
                                                this.handleNewMoiveBeforeAdd();
                                            }
                                        }}
                                    >
                                        Add
                                    </Button>
                                    <Button variant="secondary" onClick={this.onCloseModal}>
                                        Cancel
                                    </Button>
                                </div>
                            </Form.Group>
                            {/*    LOADER    */}
                            {this.state.displayLoader && (
                                <div className="centerText">
                                    <Loader />
                                </div>
                            )}
                            {/*   Movie Successfully Added Message */}
                            {this.state.showMovieSuccessfullyAddedMessage && (
                                <Alert variant="success">Movie Successfully Added</Alert>
                            )}
                            {/*    Error Messages    */}
                            {this.state.displayErrorMessage && (
                                <AddMovieError errorMessage={this.state.errorMessage} />
                            )}
                        </Form>
                    </Modal>
                )}
            </div>
        );
    }
}

export default ManageAddMovie;
