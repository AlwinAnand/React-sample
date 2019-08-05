
import RestClient from './RestClient';
import { LoanBeamConfig, defaultHeaders } from '../common/LoanBeamConfig';

export function signInCase (data) {
    const config = {};
    config.data = data.payload;
    config.url = `${LoanBeamConfig.ApiConfig()}`;
    config.headers = defaultHeaders;

    return RestClient.post(config)
        .then(json => json);
}

export default {
    signInCase
};
