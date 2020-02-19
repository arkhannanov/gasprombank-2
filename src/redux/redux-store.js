import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import createSagaMiddleware from "redux-saga";
import servicesReducer from "./services-reducer";
import {watchFetchServices} from "./services-reducer";
import detailsReducer, {watchFetchDetails} from "./details-reducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    servicesPage: servicesReducer,
    detailsPage: detailsReducer
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,  composeEnhancers(applyMiddleware(sagaMiddleware, thunkMiddleware)));
sagaMiddleware.run(watchFetchServices);
sagaMiddleware.run(watchFetchDetails);
window.__store__ = store;

export default store;