import axios from 'axios';
import { baseURL, getHeaders } from './ApiConfig';
import { auth } from '../../auth/firebase';

// TEAMS

export const getTeamsList = async () => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios.get(baseURL + 'teams/', { headers: getHeaders(accessToken) }).catch((err) => {
        if (err.response) {
            throw new Error(err.response.data['errors'] || err.response.data['detail'] || err.response.data['error']);
        } else {
            throw new Error(err);
        }
    });
};

export const getTeamDetails = async ({ teamSlug }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios.get(`${baseURL}teams/${teamSlug}/`, { headers: getHeaders(accessToken) }).catch((err) => {
        if (err.response) {
            throw new Error(err.response.data['errors'] || err.response.data['detail'] || err.response.data['error']);
        } else {
            throw new Error(err);
        }
    });
};

export const createTeam = async ({ newTeam }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios.post(baseURL + 'teams/', newTeam, { headers: getHeaders(accessToken) }).catch((err) => {
        if (err.response) {
            throw new Error(err.response.data['errors'] || err.response.data['detail'] || err.response.data['error']);
        } else {
            throw new Error(err);
        }
    });
};

export const inviteToTeam = async ({ teamSlug, data }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios
        .post(`${baseURL}teams/${teamSlug}/invitations/`, data, {
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

export const removeTeamMember = async ({ teamSlug, member }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios
        .put(`${baseURL}teams/${teamSlug}/remove_member/`, member, {
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

// PROJECTS

export const getProjectList = async ({ teamSlug }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios.get(`${baseURL}teams/${teamSlug}/projects/`, { headers: getHeaders(accessToken) }).catch((err) => {
        if (err.response) {
            throw new Error(err.response.data['errors'] || err.response.data['detail'] || err.response.data['error']);
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

export const createProject = async ({ teamSlug, newProject }) => {
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

export const updateProject = async ({ teamSlug, projectSlug, updatedProject }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios
        .put(`${baseURL}teams/${teamSlug}/projects/${projectSlug}/`, updatedProject, {
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

export const addProjectMember = async ({ teamSlug, projectSlug, member }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios
        .put(`${baseURL}teams/${teamSlug}/projects/${projectSlug}/add_member/`, member, {
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

export const removeProjectMember = async ({ teamSlug, projectSlug, member }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios
        .put(`${baseURL}teams/${teamSlug}/projects/${projectSlug}/remove_member/`, member, {
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

export const archiveProject = async ({ teamSlug, projectSlug, data }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios
        .put(`${baseURL}teams/${teamSlug}/projects/${projectSlug}/`, data, {
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

export const unarchiveProject = async ({ teamSlug, projectSlug, data }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios
        .put(`${baseURL}teams/${teamSlug}/projects/${projectSlug}/`, data, {
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

// TICKETS

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

export const getTicketDetails = async ({ teamSlug, projectSlug, ticketSlug }) => {
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

export const closeTicket = async ({ teamSlug, projectSlug, ticketSlug, data }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios
        .patch(`${baseURL}teams/${teamSlug}/projects/${projectSlug}/tickets/${ticketSlug}/`, data, {
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

export const reopenTicket = async ({ teamSlug, projectSlug, ticketSlug }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios
        .patch(`${baseURL}teams/${teamSlug}/projects/${projectSlug}/tickets/${ticketSlug}/`, {is_open: true}, {
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

export const updateTicket = async ({ teamSlug, projectSlug, ticketSlug, updatedTicket }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios
        .patch(`${baseURL}teams/${teamSlug}/projects/${projectSlug}/tickets/${ticketSlug}/`, updatedTicket, {
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

export const createComment = async ({ teamSlug, projectSlug, ticketSlug, comment }) => {
    const accessToken = auth.currentUser ? await auth.currentUser.getIdToken() : undefined;

    return axios
        .post(`${baseURL}teams/${teamSlug}/projects/${projectSlug}/tickets/${ticketSlug}/create_comment/`, comment, {
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