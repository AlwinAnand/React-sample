import { takeLatest, put, call, all } from 'redux-saga/effects';
import * as SignInActionTypes from '../actionTypes/SignInActionTypes';
import { signInCase } from '../api/SignInApi';

function* SignIn(action) {
    try {
        const signInResponse = yield call(signInCase, action);
        const { data, error } = signInResponse;
        if (error) {
            const { message = '' } = signInResponse;
            yield put({ type: SignInActionTypes.SIGN_IN_ERROR, error: message });
        } else {
            yield put({ type: SignInActionTypes.SIGN_IN_SUCCESS, data });
        }
    } catch (error) {
        yield all([
            put({ type: SignInActionTypes.SIGN_IN_ERROR, error }),
        ]);
    }
}

export default function* watchSignInSaga() {
    yield all([
        takeLatest(SignInActionTypes.SIGN_IN_REQUEST, SignIn),
    ]);
}
