import React from "react";
import Alert from "react-bootstrap/Alert";

const AddMovieError = props => <Alert variant="danger">{props.errorMessage}</Alert>;
export default AddMovieError;
