import React from 'react';
import './Main.scss'
import {fetchServices} from "../../redux/services-reducer";
import loadingImage from './../../assets/loading.gif';
import {connect} from "react-redux";
import {compose} from "redux";
import {NavLink, withRouter} from "react-router-dom";
import {fetchDetails} from "../../redux/details-reducer";
import Error from "../Error/Error";

class Main extends React.Component {

    componentDidMount() {
        this.props.fetchServices();
    }

    uploadDetails = (id) => {
        this.props.fetchDetails(id);
    }

    render() {

        const {services, loading, errorServices} = this.props;

        return (
            <div className="main">
                {errorServices && <Error/>}
                {!loading
                    ? <div className="main__container">
                        {services.map(item =>
                            <NavLink to={`/${item.id}/details`} key={item.id}>
                                <div onClick={() => this.uploadDetails(item.id)} className="main__item-container">
                                    <div className="main__item-id">{item.id}</div>
                                    <div className="main__item-name">{item.name}</div>
                                    <div className="main__item-price">{item.price}</div>
                                </div>
                            </NavLink>
                        )}
                    </div>
                    : <div className="main__error"><img src={loadingImage} alt="loadingImage"/></div>
                }

            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return ({
        services: state.servicesPage.services,
        loading: state.servicesPage.loading,
        errorServices: state.servicesPage.errorServices
    })
}

export default compose(
    connect(mapStateToProps, {fetchServices, fetchDetails}),
    withRouter
)(Main);