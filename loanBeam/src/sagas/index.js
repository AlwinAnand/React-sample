import { fork } from 'redux-saga/effects';
import watchSignIn from './SignInSaga';

export default function* rootSagas() {
    yield* [
        fork(watchSignIn)
    ];
}
