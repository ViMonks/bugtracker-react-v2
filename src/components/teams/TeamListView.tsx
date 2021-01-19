import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProjectList } from '../API/Api';
import { useQuery, useQueryClient } from 'react-query';

// interface imports
import { Team } from '../../types';

interface TeamListViewProps {
    teams: Team[];
}

interface TeamCardProps {
    team: Team;
}

const TeamListView: React.FunctionComponent<TeamListViewProps> = ({ teams }: TeamListViewProps): React.ReactElement => {
    return (
        <div className="container mt-4">
            <div className="columns is-multiline">
                {teams.map((team) => (
                    <TeamCard team={team} key={team.slug} />
                ))}
            </div>
        </div>
    );
};

const TeamCard: React.FunctionComponent<TeamCardProps> = ({ team }: TeamCardProps): React.ReactElement => {
    const queryClient = useQueryClient()
    const { user } = useAuth()
    const teamSlug = team.slug
    const prefetchProjectList = async () => {
        await user;
        await queryClient.prefetchQuery(['projectList', { user, teamSlug }], () => getProjectList({ user, teamSlug }), {
            staleTime: 30000,
        });
    };

    React.useEffect(() => {
        prefetchProjectList()
    })

    return (
        <div className="column is-one-third">
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">{team.title}</p>
                </header>
                <div className="card-content">
                    <div className="content">{team.description}</div>
                </div>
                <div className="card-footer">
                    <div className="card-footer-item">
                        <Link to={`/teams/${team.slug}/projects`}>View</Link>
                    </div>
                    <div className="card-footer-item">
                        <Link to={`/teams/${team.slug}/manage`}>Manage</Link>
                        {/* <p>Manage</p> */}
                    </div>
                    {/* <div className="card-footer-item">
                        <p>Leave Team</p>
                    </div> */}
                    {/* TODO: add ability to leave team */}
                </div>
            </div>
        </div>
    );
};
// TODO: The manage link must only show up for team admins
export default TeamListView;
