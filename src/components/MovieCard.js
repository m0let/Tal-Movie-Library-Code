import React from "react";
import Button from "react-bootstrap/Button";
import "../styles/movieCard.css";

const MovieCard = props => {
    if (props.toFixFlip) {
        localStorage.removeItem("movieDeleted");
        /*  bug ( when deleting movie that surrounded by other movies it's auto flip the right movie card ) */
        /*  to fix it over all the cards and remove the is-flipped class  */
        for (let i = 0; i < document.getElementsByClassName("card").length; i++) {
            document.getElementsByClassName("card")[i].classList.remove("is-flipped");
        }
    }
    const transformCard = (cardId, e) => {
        let mycard = document.getElementById(`${cardId}`);
        mycard.classList.toggle("is-flipped");
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
                        {/*    Duplicate just because we need to disabled the transform when delete or edit clicked */}
                        <div className="buttonContainer">
                            <Button
                                onClick={e => {
                                    props.showEditModal(props.id);
                                    transformCard(props.id, e);
                                }}
                                size="small"
                                variant="outline-success"
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={e => {
                                    props.showDeleteModal(props.id);
                                    transformCard(props.id, e);
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
