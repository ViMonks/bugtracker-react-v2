import React from 'react';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

// interface imports
import { Team } from '../../types';
import { getProjectList } from '../API/FirebaseAPI';

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
    // PREFETCH
    const queryClient = useQueryClient()
    const teamSlug = team.slug
    const prefetchProjectList = async () => {
        await queryClient.prefetchQuery(['projectList', { teamSlug }], () => getProjectList({ teamSlug }), {
            staleTime: Infinity,
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
                        <Link to={`/teams/${team.slug}/projects`}>Projects</Link>
                    </div>
                    <div className="card-footer-item">
                        <Link to={`/teams/${team.slug}/manage`}>Manage</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TeamListView;
