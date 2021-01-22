import React from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query';
import { acceptTeamInvite } from '../API/FirebaseAPI';
import toast from 'react-hot-toast';

export default function AcceptTeamInvite() {
    const currentUrl = useLocation();
    const querystrings = queryString.parse(currentUrl.search)
    console.log(querystrings);

    const queryClient = useQueryClient();

    const acceptInviteMutation = useMutation(acceptTeamInvite, {
        onSuccess: () => {
            queryClient.invalidateQueries('teamList');
            queryClient.refetchQueries();
            toast.success('Invite accepted!');
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    const acceptInvite = () => {
        const teamSlug = querystrings.slug
        const invitationId = querystrings.invitation
        acceptInviteMutation.mutate({ teamSlug, invitationId})
    };

    return (
        <div className="container">
            <h1 className="title mt-8">Accept team invitation?</h1>
            <button className="button" onClick={acceptInvite}>Accept</button>
        </div>
    )
}
