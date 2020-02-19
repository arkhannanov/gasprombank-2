import React from 'react';
import {fetchServices} from "../../redux/services-reducer";
import loadingImage from './../../assets/loading.gif';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import Error from "../Error/Error";

class Main extends React.Component {

    render() {

        const {currentId, errorDetails, loading} = this.props;

        console.log("Tест");

        return (
            <div className="details">
                {errorDetails && <Error/>}
                {!loading
                    ? <div className="details__container">
                        {currentId}
                    </div>
                    : <div className="main__error"><img src={loadingImage} alt="loadingImage"/></div>
                }
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return ({
        currentId: state.detailsPage.currentId,
        errorDetails: state.detailsPage.errorDetails,
        loading: state.detailsPage.loading,
    })
}

export default compose(
    connect(mapStateToProps, {fetchServices}),
    withRouter
)(Main);