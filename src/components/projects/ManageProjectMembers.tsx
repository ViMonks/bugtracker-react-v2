import React from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { Project, Team, TeamMembership } from '../../types';
import { addProjectMember, getTeamDetails, removeProjectMember } from '../API/FirebaseAPI';

interface ManageProjectMembersProps {
    team: Team;
    project: Project;
}

interface ParamTypes {
    teamSlug: string;
    projectSlug: string;
}

export default function ManageProjectMembers({ team, project }: ManageProjectMembersProps) {
    const [isActive, setIsActive] = React.useState(false);
    const { teamSlug, projectSlug } = useParams<ParamTypes>();

    const [teamMembers, setTeamMemberships] = React.useState(
        team.memberships
            .filter((membership) => membership.role_name !== 'Administrator')
            .map((membership) => membership.user).filter(username => username !== project.manager),
    );

    React.useEffect(() => {
        setTeamMemberships(team.memberships
            .filter((membership) => membership.role_name !== 'Administrator')
            .map((membership) => membership.user).filter(username => username !== project.manager))
    }, [team])

    const queryClient = useQueryClient();
    const addMemberMutation = useMutation(addProjectMember, {
        onSuccess: () => {
            queryClient.invalidateQueries('teamDetails');
            queryClient.invalidateQueries('projectDetails');
            queryClient.refetchQueries();
            toast.success('User added to project.');
            setIsActive(false);
        },
        onError: () => {
            toast.error('Something went wrong. Please try again.');
        },
    });
    const handleAddMember = (username: string): void => {
        const member = { member: username };
        addMemberMutation.mutate({ teamSlug, projectSlug, member });
    };

    const removeMemberMutation = useMutation(removeProjectMember, {
        onSuccess: () => {
            queryClient.invalidateQueries();
            queryClient.refetchQueries();
            toast.success('User removed from project.');
            setIsActive(false);
        },
        onError: () => {
            toast.error('Something went wrong. Please try again.');
        },
    });
    const handleRemoveMember = (username: string): void => {
        const member = {member: username}
        removeMemberMutation.mutate({ teamSlug, projectSlug, member })
    }

    const isProjectMember = (username: string) => {
        return project.memberships.map((member) => member.user).includes(username);
    };

    const createBodyElement = (teamMembers: string[]) => {
        if (teamMembers.length === 0) {
            return <p>Your team has no members.</p>;
        } else {
            return (
                <>
                    {teamMembers.map((member) => (
                        <nav key={member.concat(isProjectMember(member).toString())} className="level">
                            <div className="level-left">
                                <div className="level-item">{member}</div>
                            </div>
                            <div className="level-right">
                                <div className="level-item">
                                    {isProjectMember(member) ? (
                                        <button className="button" onClick={() => handleRemoveMember(member)}>
                                            <span className="icon is-small">
                                                <i className="fas fa-minus"></i>
                                            </span>
                                        </button>
                                    ) : (
                                        <button className="button" onClick={() => handleAddMember(member)}>
                                            <span className="icon is-small">
                                                <i className="fas fa-plus"></i>
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </nav>
                    ))}
                </>
            );
        }
    };

    return (
        <>
            <button className='button is-white' data-tooltip="Team members must be added to a project's members before they can see that project." onClick={() => setIsActive(!isActive)}>
                Manage project members
            </button>

            <div className={isActive ? 'modal is-active' : 'modal'}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Add or remove members</p>
                        <button className="delete" aria-label="close" onClick={() => setIsActive(false)}></button>
                    </header>
                    <section className="modal-card-body">{createBodyElement(teamMembers)}</section>
                    <footer className="modal-card-foot">
                        <button className="button" onClick={() => setIsActive(false)}>
                            Cancel
                        </button>
                        <p>If you wish to remove the project manager, demote them first by updating the project with a new manager.</p>
                    </footer>
                </div>
            </div>
        </>
    );
}
