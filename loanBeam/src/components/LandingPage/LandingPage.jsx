import React, { Component } from 'react';
import SignIn from '../SignIn/SignIn';
import '../../../Style.scss';

export default class Login extends Component {
    render() {
        return (
            <div className="fullWrap">
                <div className="innerWrap">
                    <div className="conntentWrap">
                        <div className="boxWrap">
                            <SignIn />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
