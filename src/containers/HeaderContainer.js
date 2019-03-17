import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "../components/Header.js";
import { filteredMoviesByName, filteredMoviesByGenre } from "../actions/index.js";

const mapStateToProps = (state, ownProps) => {
    return { state };
};

const usedActions = {
    filteredMoviesByName: filteredMoviesByName,
    filteredMoviesByGenre: filteredMoviesByGenre
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(usedActions, dispatch);
};

const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default MainContainer;
