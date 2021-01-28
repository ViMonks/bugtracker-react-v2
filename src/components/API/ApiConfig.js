/* eslint-disable */
export const baseURL = 'https://api.bugtracking.io/api/';

export const getHeaders = (token) => {
    return {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
    };
};
