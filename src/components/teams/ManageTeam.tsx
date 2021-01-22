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
                    {team.user_is_admin && (
                        <div className="block">
                            <InviteUserToTeamModal />
                        </div>
                    )}
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
                                {team.user_is_admin ? (
                                    <button
                                        className="button is-outlined is-danger"
                                        data-tooltip="You cannot leave as team admin. Step down as admin first."
                                        disabled
                                    >
                                        Leave Team
                                    </button>
                                ) : (
                                    <LeaveTeamModal />
                                )}
                            </div>
                            {team.user_is_admin && team.admins.length > 1 && (
                                <div className="level-item">
                                    <StepDownAsAdmin />
                                </div>
                            )}
                            {team.user_is_admin && team.admins.length === 1 && (
                                <button
                                    className="button is-outlined is-danger"
                                    data-tooltip="You must promote another member to team admin before you may step down."
                                    disabled
                                >
                                    Step down as team admin
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageTeamController;
