import React, {Component} from 'react';
import './App.scss';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import {connect, Provider} from "react-redux";
import store from "./redux/redux-store";
import './App.scss';
import {compose} from "redux";
import Main from "./components/Main/Main";
import Details from "./components/Details/Details";


class App extends Component {

    componentDidMount() {

        this.props.history.push("/main");
    }

  render() {

    return (
        <div className='app'>
            <Route path='/main'
                   render={() => <Main/>}/>
            <Route exact path={`/${this.props.currentId}/detais`}
                   render={() => <Details />}/>
        </div>
    )
  }
};



let mapStateToProps = (state) => {
    return ({
        currentId: state.detailsPage.currentId,
    })
}


let AppContainer = compose(
    connect(mapStateToProps, {}),
    withRouter
)(App);


const GASPROMBANK = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  </BrowserRouter>
}

export default GASPROMBANK;