import React from 'react';
import { useParams } from 'react-router-dom';

// interface imports
import { Team } from '../../types';

// internal imports
import AdminTeamMembersPanel from './AdminsTeamMembersPanel';
import InviteUserToTeamModal from './InviteUserToTeamModal';
import { useQuery } from 'react-query';
import { getTeamDetails } from '../API/FirebaseAPI';
import LoadingBar from '../LoadingBar';
import LeaveTeamModal from './LeaveTeamModal';
import StepDownAsAdmin from './StepDownAsAdmin';
import NonAdminTeamMembersPanel from './NonAdminsTeamMembersPanel';

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
    const { teamSlug } = useParams<ParamTypes>();

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
                    <div className="block">
                        <p>{team.description}</p>
                    </div>
                    <div className="block">
                        {team.admins.length === 1 ? (
                            <p>Administrator: {team.admins[0]}</p>
                        ) : (
                            <p>Administrators: {team.admins.join(', ')}</p>
                        )}
                    </div>
                    <div className="block">
                        <p>Created on {new Date(team.created).toLocaleDateString()}</p>
                    </div>
                    <div className="block">
                        <InviteUserToTeamModal /> {/* TODO: this should only appear for admins */}
                    </div>
                </div>
                <div className="column">
                    {team.user_is_admin ? (
                        <AdminTeamMembersPanel members={team.memberships} />
                    ) : (
                        <NonAdminTeamMembersPanel members={team.memberships} />
                    )}

                    <div className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <LeaveTeamModal />
                            </div>
                            <div className="level-item">
                                <StepDownAsAdmin />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageTeamController;
