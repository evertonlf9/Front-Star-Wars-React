import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import starwars from './starwars';

const createRootReducer = history => combineReducers({
	router: connectRouter(history),
	starwars
});

export default createRootReducer;
