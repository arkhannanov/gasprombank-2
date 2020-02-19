import {put, takeEvery, call} from "@redux-saga/core/effects";

const REQUEST_DETAILS = 'REQUEST_DETAILS';
const REQUEST_DETAILS_SUCCEEDED = 'REQUEST_DETAILS_SUCCEEDED';
const REQUEST_DETAILS_FAILED = 'REQUEST_DETAILS_FAILED';
const FETCH_DETAILS = 'FETCH_DETAILS';


let initialState = {
    currentId: null,
    details: [],
    loading: false,
    errorDetails: false
};

const detailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_DETAILS: {
            return {
                ...state,
                loading: true,
            }
        }
        case REQUEST_DETAILS_SUCCEEDED: {
            let data = action.data;
            let currentId = action.id;
            return {
                ...state,
                currentId: currentId,
                services: data,
                loading: false,
                errorDetails: false
            }
        }
        case REQUEST_DETAILS_FAILED: {
            return {
                ...state,
                loading: false,
                errorDetails: true
            }
        }
        default:
            return state;
    }
}

export const requestDetailsSucceeded = (data, id) => ({type: REQUEST_DETAILS_SUCCEEDED, data, id});
export const requestDetailsFailed = () => ({type: REQUEST_DETAILS_FAILED});
export const requestDetails = () => ({type: REQUEST_DETAILS});
export const fetchDetails = (id) => ({type: FETCH_DETAILS, id});

export function* watchFetchDetails() {
    yield takeEvery('FETCH_DETAILS', fetchDetailsAsync);
}

function* fetchDetailsAsync(action) {
    try {
        yield put(requestDetails());
        const data = yield call(() => {
                return fetch(`http://locahost:7070/api/services/${action.id}`)
                    .then(res => res.json())
            }
        );
        yield put(requestDetailsSucceeded(data, action.id));
    } catch (error) {
        console.log("Тест");
        yield put(requestDetailsFailed());
    }
}


export default detailsReducer;