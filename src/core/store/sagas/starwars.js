import { takeLatest, put, call } from 'redux-saga/effects';
import { Types as StarwarsTypes } from '../ducks/starwars';

import Http from '../../services/repository';

/*GET PEOPLE*/
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