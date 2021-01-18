export const baseURL = 'http://localhost:5001/api/';

export const getHeaders = (token) => {
    return {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
    };
};
