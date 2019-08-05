import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import floatingLabelField from '../FloatingLabel/FloatingLabel';
import { SIGN_IN } from '../../common/constants';
import './SignIn.scss';

export const validate = values => {
    const error = {};

    if (!values.emailId) {
        // error.emailId = 'Invalid email';
    }

    if (!values.password) {
        error.password = 'Required';
    }

   return error;
};

// eslint-disable-next-line react/prop-types
export const renderFieldInput = ({ input, label, type, id }) => (
    <div>
        <label htmlFor={id}>{label}</label>
        <div>
            <input {...input} id={id} type={type} />
        </div>
    </div>
);

export class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            isPasswordVisible: false,
            isEyeIconVisible: false
        };
    }

    onKeyPress = event => {
        if (event.target.value) {
            this.setState({ isEyeIconVisible: true });
        } else {
            this.setState({ isEyeIconVisible: false, isPasswordVisible: false });
        }
    }

    showHidePasswrd = () => {
        const { isPasswordVisible } = this.state;
        const toggledIsShow = isPasswordVisible ? false : true;
        this.setState({
            isPasswordVisible: toggledIsShow
        });
    }

    render() {
        const { handleSubmit } = this.props;
        const { isEyeIconVisible, isPasswordVisible } = this.state;

        const signInFormOnSubmit = values => {
            console.log('values', values);
        };

        return (
            <div className="formWrap">
                <div className="signInFormWrap">
                    <div className="logo">
                        <img src="https://secure.loanbeam.com/Images/LB_LOGO.png" alt="logo"/>
                    </div>
                    <form onSubmit={handleSubmit(signInFormOnSubmit)}>
                    <Field
                            name="emailId"
                            type="text"
                            label="Email"
                            component={floatingLabelField}
                            id="emailId"
                        />
                        <Field
                            name="password"
                            type={isPasswordVisible ? 'text' : 'password'}
                            component={floatingLabelField}
                            label="Password"
                            onKeyPress={this.onKeyPress}
                            showEyeIcon={isEyeIconVisible ? <span className="eyeIconWrap" onClick={this.showHidePasswrd}>{isPasswordVisible ? <img src="https://ak1.ostkcdn.com/img/mxc/b2b/eye-view.png" alt="eyeView" /> : <img src="https://ak1.ostkcdn.com/img/mxc/b2b/eye-hide.png" alt="eyeOff" />}</span> : null}
                            id="password"
                        />
                        <div className="form-group formRowWrap">
                            <Button
                            type="submit"
                            className="createAccBtn"
                        >
                            {SIGN_IN}
                        </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

SignIn.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};


const SignInReduxForm = reduxForm({
    form: 'SignIn',
    validate,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(SignIn);

export default SignInReduxForm;
