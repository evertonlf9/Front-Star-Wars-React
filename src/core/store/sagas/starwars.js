import { takeLatest, put, call } from 'redux-saga/effects';
import { Types as StarwarsTypes } from '../ducks/starwars';

import Http from '../../services/repository';

/*GET*/
function getDataApiAPI(params) {
	return Http.get(`${params.type}/?search=${params.searchText}&page=${params.currentPage}&size=${params.pageSize}`);
}

function* getDataApi(action) {
    try {
		const response = yield call(getDataApiAPI.bind(this, action.params));

        yield put({
            type: StarwarsTypes.SUCCESS_DATA_API,
            response:response.data
        });
    }
    catch (err) {
        yield put({
            type: StarwarsTypes.ERROR_DATA_API,
            err
        });
    }
}

export function* getDataApiSaga() {
	yield takeLatest(StarwarsTypes.GET_DATA_API, getDataApi);
}

/*GET DETAIL*/
function getDetailApi(params) {
	return Http.get(`${params.type}/${params.id}`);
}

function* getDetail(action) {
    try {
		const response = yield call(getDetailApi.bind(this, action.params));

        yield put({
            type: StarwarsTypes.SUCCESS_DETAIL,
            response:response.data
        });
    }
    catch (err) {
        yield put({
            type: StarwarsTypes.ERROR_DETAIL,
            err
        });
    }
}

export function* getDetailSaga() {
	yield takeLatest(StarwarsTypes.GET_DETAIL, getDetail);
}

/*GET DATA*/
function getDataAPI(params) {
	return Http._getData(params.data, params.type);
}

function* getData(action) {
    try {
		const response = yield call(getDataAPI.bind(this, action.params));

        yield put({
            type: StarwarsTypes.SUCCESS_DATA,
            response:{ data: response.data, type: response.type}
        });
    }
    catch (err) {
        yield put({
            type: StarwarsTypes.ERROR_DATA,
            err
        });
    }
}

export function* getDataSaga() {
	yield takeLatest(StarwarsTypes.GET_DATA, getData);
}