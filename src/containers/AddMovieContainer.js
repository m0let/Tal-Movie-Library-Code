import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddMovie from "../components/AddMovie.js";
import { addMovie } from "../actions/index.js";

const mapStateToProps = (state, ownProps) => {
    return { state };
};

const usedActions = {
    addMovie: addMovie
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(usedActions, dispatch);
};

const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddMovie);

export default MainContainer;
