import {put, takeEvery, call} from "@redux-saga/core/effects";

const REQUEST_SERVICES = 'REQUEST_SERVICES';
const REQUEST_SERVICES_SUCCEEDED = 'REQUERST_SERVICES_SUCCEEDED';
const REQUEST_SERVICES_FAILED = 'REQUERST_SERVICES_FAILED';
const FETCH_SERVICES = 'FETCH_SERVICES';


let initialState = {
    services: [],
    loading: false,
    errorServices: false,
};

const servicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_SERVICES: {
            return {
                ...state,
                loading: true,
                errorServices: false
            }
        }
        case REQUEST_SERVICES_SUCCEEDED: {
            let data = action.data;
            return {
                ...state,
                services: data,
                loading: false,
                errorServices: false
            }
        }
        case REQUEST_SERVICES_FAILED: {
            return {
                ...state,
                loading: false,
                errorServices: true
            }
        }
        default:
            return state;
    }
}

export const requestServicesSucceeded = (data) => ({type: REQUEST_SERVICES_SUCCEEDED, data});
export const requestServicesFailed = () => ({type: REQUEST_SERVICES_FAILED});
export const requestServices = () => ({type: REQUEST_SERVICES});
export const fetchServices = () => ({type: FETCH_SERVICES});

export function* watchFetchServices() {
    yield takeEvery('FETCH_SERVICES', fetchServicesAsync);
}

function* fetchServicesAsync(action) {
    try {
        yield put(requestServices());
        const data = yield call(() => {
                return fetch('http://localhost:7070/api/services')
                    .then(res => res.json())
            }
        );
        yield put(requestServicesSucceeded(data));
    } catch (error) {
        yield put(requestServicesFailed());
    }
}


export default servicesReducer;