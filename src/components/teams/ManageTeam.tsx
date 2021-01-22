import React from 'react';
import { useParams } from 'react-router-dom';

// interface imports
import { Team } from '../../types';

// internal imports
import TeamMembersPanel from './TeamMembersPanel';
import InviteUserToTeamModal from './InviteUserToTeamModal';
import { useQuery } from 'react-query';
import { getTeamDetails } from '../API/FirebaseAPI';
import LoadingBar from '../LoadingBar';
import LeaveTeamModal from './LeaveTeamModal';

// interface ManageTeamControllerProps {
//     teamSlug: string;
// }

interface ManageTeamProps {
    team: Team;
}

interface ParamTypes {
    teamSlug: string;
}

const ManageTeamController: React.FunctionComponent = (): React.ReactElement => {
    const {teamSlug} = useParams<ParamTypes>();

    const { isLoading, error, data } = useQuery<any, Error>(
        ['teamDetails', { teamSlug }],
        () => getTeamDetails({ teamSlug }),
        { staleTime: 30000 },
    );

    return (
    <div className="container">
        {isLoading ? <LoadingBar /> : null}
        {error ? error.message : null}
        {data && <ManageTeam team={data.data} />}
    </div>
    );
};

const ManageTeam: React.FunctionComponent<ManageTeamProps> = ({ team }: ManageTeamProps): React.ReactElement => {
    return (
        <div className="container mt-4">
            <div className="columns">
                <div className="column">
                    <h1 className="title">{team.title}</h1>
                    <p>{team.description}</p>
                    <p>Admin: {team.user_is_admin.toString()}</p>
                    <p>Admin list:{team.admins}</p>
                    <p>Created on {new Date(team.created).toLocaleDateString()}</p>
                    <div className="mt-2">
                        <InviteUserToTeamModal /> {/* TODO: this should only appear for admins */}
                    </div>
                </div>
                <div className="column">
                    <TeamMembersPanel members={team.memberships} />
                    <LeaveTeamModal />
                </div>
            </div>
        </div>
    );
};

export default ManageTeamController;
