import React, { Component } from 'react';
import { ControlLabel, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Icon } from 'react-icons-kit';
import { ic_arrow_drop_down as icArrowDropDown, ic_arrow_drop_up as icArrowDropUp } from 'react-icons-kit/md';
import { info } from 'react-icons-kit/feather/info';
import { check } from 'react-icons-kit/entypo/check';
import { exclamationTriangle } from 'react-icons-kit/fa/exclamationTriangle';
import { EMAIL_PATTERN } from '../../common/constants';
import './FloatingLabel.scss';

export class FloatingLabelField extends Component {
    constructor() {
        super();
        this.state = {
            inputValue: false,
            emailValidate: false
        };
    }

    floatingLabelAnimate = e => {
        if (e.target.value) {
            this.setState({ inputValue: true });
        } else {
            this.setState({ inputValue: false });
        }
        const emailPattern = EMAIL_PATTERN;
        const validEmail = emailPattern.test(e.target.value);
        if (validEmail) {
            this.setState({ emailValidate: true });
        } else {
            this.setState({ emailValidate: false });
        }
    };

    render() {
        const {
            input,
            label,
            fieldID,
            serverError,
            type,
            disabled,
            isInfo,
            infoText,
            autoComplete,
            showEyeIcon,
            meta: { touched, error },
            isAutofocus,
            onKeyPress,
            input: { value },
        } = this.props;
        const { inputValue, emailValidate } = this.state;

        return (
            <div
                id={type === 'hidden' ? 'hideTextBox' : null}
                className={inputValue || input.value !== '' ? 'form-group labelActive' : 'form-group'}
            >
                <div
                    id={emailValidate ? 'successBorder' : null}
                    className={(touched && error) || serverError ? 'floatLabelWrap errorBorder' : 'floatLabelWrap'}
                >
                    <input
                        {...input}
                        autoComplete={autoComplete ? autoComplete : 'new passowrd'}
                        type={type}
                        onKeyPress={type === 'number' ? this.onlyNumbersAllowFunction : null}
                        onKeyUp={e => {
                            this.floatingLabelAnimate(e);
                            if (onKeyPress) {
                                onKeyPress(e);
                            }
                        }}
                        disabled={disabled}
                        id={fieldID}
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus={isAutofocus}
                        className="inputTxtStyle"
                    />
                    {type === 'number'
                        && (
                            <div>
                                <span className="arrowIconDown">
                                    <Icon size={20} icon={icArrowDropDown} />
                                </span>
                                <span className="arrowIconTop">
                                    <Icon size={20} icon={icArrowDropUp} />
                                </span>
                            </div>
                        )
                    }
                    <ControlLabel className="labelTxt">{label}</ControlLabel>
                    {emailValidate && (
                        <span className="iconRight">
                            <Icon size={20} icon={check} />
                        </span>
                    )}
                    <span className="iconWarning">
                        <Icon size={20} icon={exclamationTriangle} />
                    </span>
                    {(touched && error) || serverError ? (
                        <span className="error_text">{serverError ? serverError : error}</span>
                    ) : null}
                    {showEyeIcon}
                    <span className="iconInfo">
                        { !value && isInfo && (
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                    <Tooltip id="tooltip"><strong>{infoText}</strong></Tooltip>
                                }
                            >
                                <Icon size={20} style={{ color: '#E9C46A' }} icon={info} />
                            </OverlayTrigger>
                        )}
                    </span>
                </div>
            </div>
        );
    }
}

export default FloatingLabelField;
