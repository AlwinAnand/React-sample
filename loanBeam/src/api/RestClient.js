import { SERVER_DOWN_MSG, FETCH_API_MSG } from '../common/constants';

const getURLWithParams = cfg => {
    const url = cfg.url;
    let queryParams = null;
    /* istanbul ignore else */
    if (cfg.queryParams) {
        queryParams = cfg.queryParams;
    }

    return queryParams ? `${url}?${queryParams}` : url;
};

const getValidErrors = (error, apiUrl) => {
    const errorDetails = error.response;
    if (errorDetails) {
        const { message, status, error: statusText } = errorDetails.data || {};

        return { error: true, statusText, status, message };
    }

return { error: true,
statusText: `${FETCH_API_MSG} ${apiUrl}`,
status: 500,
message: SERVER_DOWN_MSG,
};
};
export default class RestClient {
    static get(config) {
        const apiUrl = getURLWithParams(config);

        return fetch(apiUrl, {
                    method: 'GET',
                    credentials: 'include',
                    headers: config.headers
                }).then(response => {
                    const status = response.status;
                    const statusText = response.statusText;

                return response.json()
                            .then(json => ({ status, statusText, data: json }));
                }).catch(error => {
                    return getValidErrors(error, apiUrl);
        });
   }

    static post(config) {
        const apiUrl = getURLWithParams(config);

        return fetch(apiUrl, {
            method: 'POST',
            headers: config.headers,
            credentials: 'include',
            body: JSON.stringify(config.data)
        }).then(response => {
        return response.json();
        }).then(text => {
            const status = text.status;
            const statusText = text.statusText;

        return { status, statusText, data: text };
            }).catch(error => {
                return getValidErrors(error, apiUrl);
        });
    }

    static put(config) {
        const apiUrl = getURLWithParams(config);

        return fetch(apiUrl, {
            method: 'PUT',
            headers: config.headers,
            credentials: 'include',
            body: JSON.stringify(config.data),
        }).then(response => {
            const status = response.status;
            const statusText = response.statusText;

        return response.json()
                    .then(json => ({ status, statusText, data: json }));
        }).catch(error => {
            return getValidErrors(error, apiUrl);
        });
}


    static delete(config) {
        const apiUrl = getURLWithParams(config);

        return fetch(apiUrl, {
            method: 'DELETE',
            headers: config.headers,
            credentials: 'include',
            body: JSON.stringify(config.data),
        }).then(response => {
            const status = response.status;
            const statusText = response.statusText;

        return response.json()
                    .then(json => ({ status, statusText, data: json }));
        }).catch(error => {
            return getValidErrors(error, apiUrl);
        });
    }

    static setContext(context) {
        this.context = context;
        this.headers = context.headers;
    }
}
