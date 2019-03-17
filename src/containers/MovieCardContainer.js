import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ManageMovieCard from "../components/ManageMovieCard.js";
import { editMovie, deleteMovie } from "../actions/index.js";

const mapStateToProps = (state, ownProps) => {
    return { state };
};

const usedActions = {
    editMovie: editMovie,
    deleteMovie: deleteMovie
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(usedActions, dispatch);
};

const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageMovieCard);

export default MainContainer;
