import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { baseURL, getHeaders } from './ApiConfig';

export const getTeamsList = (token) =>
    axios.get(baseURL+'teams/', {headers: getHeaders(token)})
        .catch(err => {
            if (err.response) {
                throw new Error(err.response.data['errors'] || err.response.data['detail'] || err.response.data['error'])
            } else {
                throw new Error(err)
            }
        })

export const getProjectList = (token) =>
    axios.get("http://localhost:5001/api/teams/monks-test-team/projects/", {headers: getHeaders(token)})
        .catch(err => {
            if (err.response) {
                throw new Error(err.response.data['errors'] || err.response.data['detail'] || err.response.data['error'])
            } else {
                throw new Error(err)
            }
        })