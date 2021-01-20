import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { baseURL, getHeaders } from './ApiConfig';
import { auth } from '../../auth/firebase';

export const getTeamsList = async (token) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios.get(baseURL + 'teams/', { headers: getHeaders(accessToken) }).catch((err) => {
        if (err.response) {
            throw new Error(err.response.data['errors'] || err.response.data['detail'] || err.response.data['error']);
        } else {
            throw new Error(err);
        }
    });
};

export const getProjectList = async ({ user, teamSlug }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios.get(`${baseURL}teams/${teamSlug}/projects/`, { headers: getHeaders(accessToken) }).catch((err) => {
        if (err.response) {
            throw new Error(err.response.data['errors'] || err.response.data['detail'] || err.response.data['error']);
        } else {
            throw new Error(err);
        }
    });
};

export const getTeamDetails = async ({ user, teamSlug }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios.get(`${baseURL}teams/${teamSlug}/`, { headers: getHeaders(accessToken) }).catch((err) => {
        if (err.response) {
            throw new Error(err.response.data['errors'] || err.response.data['detail'] || err.response.data['error']);
        } else {
            throw new Error(err);
        }
    });
};

export const getTicketList = async ({ teamSlug, projectSlug }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios
        .get(`${baseURL}teams/${teamSlug}/projects/${projectSlug}/tickets/`, { headers: getHeaders(accessToken) })
        .catch((err) => {
            if (err.response) {
                throw new Error(
                    err.response.data['errors'] || err.response.data['detail'] || err.response.data['error'],
                );
            } else {
                throw new Error(err);
            }
        });
};

export const getProjectDetails = async ({ teamSlug, projectSlug }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios
        .get(`${baseURL}teams/${teamSlug}/projects/${projectSlug}/`, { headers: getHeaders(accessToken) })
        .catch((err) => {
            if (err.response) {
                throw new Error(
                    err.response.data['errors'] || err.response.data['detail'] || err.response.data['error'],
                );
            } else {
                throw new Error(err);
            }
        });
};

export const getTicketDetails = async ({ user, teamSlug, projectSlug, ticketSlug }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios
        .get(`${baseURL}teams/${teamSlug}/projects/${projectSlug}/tickets/${ticketSlug}/`, {
            headers: getHeaders(accessToken),
        })
        .catch((err) => {
            if (err.response) {
                throw new Error(
                    err.response.data['errors'] || err.response.data['detail'] || err.response.data['error'],
                );
            } else {
                throw new Error(err);
            }
        });
};

// POST REQUESTS

export const createTeam = async ({ user, newTeam }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios.post(baseURL + 'teams/', newTeam, { headers: getHeaders(accessToken) }).catch((err) => {
        if (err.response) {
            throw new Error(err.response.data['errors'] || err.response.data['detail'] || err.response.data['error']);
        } else {
            throw new Error(err);
        }
    });
};

export const createProject = async ({ user, teamSlug, newProject }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios
        .post(`${baseURL}teams/${teamSlug}/projects/`, newProject, { headers: getHeaders(accessToken) })
        .catch((err) => {
            if (err.response) {
                throw new Error(
                    err.response.data['errors'] || err.response.data['detail'] || err.response.data['error'],
                );
            } else {
                throw new Error(err);
            }
        });
};

export const createTicket = async ({ teamSlug, projectSlug, newTicket }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios
        .post(`${baseURL}teams/${teamSlug}/projects/${projectSlug}/tickets/`, newTicket, {
            headers: getHeaders(accessToken),
        })
        .catch((err) => {
            if (err.response) {
                throw new Error(
                    err.response.data['errors'] || err.response.data['detail'] || err.response.data['error'],
                );
            } else {
                throw new Error(err);
            }
        });
};
