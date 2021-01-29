/* eslint-disable */
export const baseURL = process.env.REACT_APP_API_BASE_URL;

export const getHeaders = (token) => {
    return {
        Authorization: `JWT ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*',
    };
};
