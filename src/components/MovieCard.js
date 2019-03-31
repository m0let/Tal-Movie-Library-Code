import React from "react";
import Button from "react-bootstrap/Button";
import "../styles/movieCard.css";

const MovieCard = props => {
    const transformCard = (cardId, e) => {
        /* Do not transform the card if Some of the buttons was clicked  */
        if (e.target.innerText !== "Delete" && e.target.innerText !== "Edit") {
            let mycard = document.getElementById(`${cardId}`);
            mycard.classList.toggle("is-flipped");
        }
    };
    return (
        <div className="scene centerText">
            <div
                className="card hover-shadow"
                id={props.id}
                onClick={e => {
                    transformCard(props.id, e);
                }}
            >
                <div className="card__face card__face--front">
                    <img src={props.image} className="imageStyle" alt="movie" />
                    <h5>{props.title}</h5>
                </div>

                <div className="card__face card__face--back">
                    <div className="backCardContentContainer">
                        <h5>Summary</h5>
                        <p>{props.plot}</p>
                        <p className="leftText">
                            <strong>Director:</strong> {props.director}
                        </p>
                        <p className="leftText">
                            <strong>Year: </strong>
                            {props.year}
                        </p>
                        <p className="leftText">
                            <strong>Runtime:</strong> {props.runtime}
                        </p>
                        <p className="leftText">
                            <strong>Genre:</strong> {props.genre}
                        </p>
                        <div className="buttonContainer">
                            <Button
                                onClick={e => {
                                    props.showEditModal(props.id);
                                }}
                                size="small"
                                variant="outline-success"
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={e => {
                                    props.showDeleteModal(props.id);
                                }}
                                size="small"
                                variant="outline-danger"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
