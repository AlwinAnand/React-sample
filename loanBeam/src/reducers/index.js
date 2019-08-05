import { combineReducers } from 'redux';
import { reducer as forms } from 'redux-form';
import SignInReducer from './SignInReducer';

const allReducers = combineReducers({
    form: forms,
    signIn: SignInReducer,
});

export default allReducers;
