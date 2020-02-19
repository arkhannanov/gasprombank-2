import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {fetchServices} from "../../redux/services-reducer";
import {fetchDetails} from "../../redux/details-reducer";
import {withRouter} from "react-router-dom";

class Error extends React.Component {

    handleClick = () => {

        if (this.props.errorServices) {
            this.props.fetchServices();
        } else if (this.props.errorDetails) {
            this.props.fetchDetails(this.props.currentId);
        }
    }


    render() {

        return (
            <div className="error">
                <div>Произошла Ошибка!</div>
                <button onClick={() => this.handleClick()}>Повторите запрос</button>
            </div>
        )
    }
}


let mapStateToProps = (state) => {
    return ({
        errorServices: state.servicesPage.errorServices,
        errorDetails: state.detailsPage.errorDetails,
        currentId: state.detailsPage.currentId
    });
}

export default compose(
    connect(mapStateToProps, {fetchServices, fetchDetails}),
    withRouter
)(Error);