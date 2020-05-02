import { all, fork } from "redux-saga/effects";

import * as starwarsSagas from "./starwars";

const getValuesInObject = obj => Object.keys(obj).map(value => obj[value]);

export default function* rootSaga() {
    yield all([
		...getValuesInObject(starwarsSagas),
    ].map(fork));
}