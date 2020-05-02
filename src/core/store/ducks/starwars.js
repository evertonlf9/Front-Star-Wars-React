import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
	getDataApi: ['params'],
	successDataApi: [],
	errorDataApi: []
});

const initialState = {
	data: [],
	loading: false,
	error: false
};

/*GET PEOPLE*/
const getDataApi = (state = initialState, action) => {
	return {
		...state,
		loading: true,
		error: false
	}
};

const successDataApi = (state = initialState, action) => ({
	...state,
	data: action.response,
	loading: false,
	error: false
});

const errorDataApi = (state = initialState, action) => ({
	...state,
	data: [],
	loading: false,
	error: action.err
});

export default createReducer(initialState, {
	[Types.GET_DATA_API]: getDataApi,
	[Types.SUCCESS_DATA_API]: successDataApi,
	[Types.ERROR_DATA_API]: errorDataApi,
});