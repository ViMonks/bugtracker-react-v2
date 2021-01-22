import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// interface imports
import { TeamMembership } from '../../types';
import { useMutation, useQueryClient } from 'react-query';
import { promoteToAdmin, removeTeamMember } from '../API/FirebaseAPI';

interface TeamMembersPanelProps {
    members: TeamMembership[];
}

interface TeamPanelBlockProps {
    member: string;
}

interface ParamTypes {
    teamSlug: string;
}

const TeamPanelBlock: React.FunctionComponent<TeamPanelBlockProps> = ({
    member,
}: TeamPanelBlockProps): React.ReactElement => {
    const { teamSlug } = useParams<ParamTypes>();
    const [removeMemberIsActive, setRemoveMemberIsActive] = React.useState(false);
    const [promoteToAdminIsActive, setPromoteToAdminIsActive] = React.useState(false);
    const [chooseOptionIsActive, setChooseOptionIsActive] = React.useState(false);
    const username = member;

    const queryClient = useQueryClient();

    const removeMemberMutation = useMutation(removeTeamMember, {
        onSuccess: () => {
            queryClient.invalidateQueries('teamDetails');
            queryClient.refetchQueries();
            toast.success('User removed from team.');
            setRemoveMemberIsActive(false);
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    const removeMember = () => {
        const member = { member: username };
        removeMemberMutation.mutate({ teamSlug, member });
    };

    const promoteMemberMutation = useMutation(promoteToAdmin, {
        onSuccess: () => {
            queryClient.invalidateQueries('teamDetails');
            queryClient.refetchQueries();
            toast.success('User promoted to team administrator!');
            setPromoteToAdminIsActive(false);
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    const promoteMember = () => {
        const member = { user: username };
        promoteMemberMutation.mutate({ teamSlug, member });
    };

    const closeAllModals = () => {
        setRemoveMemberIsActive(false);
        setPromoteToAdminIsActive(false);
        setChooseOptionIsActive(false);
    };

    const activateRemoveMemberModal = () => {
        setRemoveMemberIsActive(true);
        setPromoteToAdminIsActive(false);
        setChooseOptionIsActive(false);
    };

    const activatePromoteMemberModal = () => {
        setRemoveMemberIsActive(false);
        setPromoteToAdminIsActive(true);
        setChooseOptionIsActive(false);
    };

    return (
        <Fragment>
            <a className="panel-block" onClick={() => setChooseOptionIsActive(!chooseOptionIsActive)}>
                <span className="panel-icon">
                    <i className="fas fa-user"></i>
                </span>
                {member}
            </a>

            {/* Choose option modal */}
            <div className={chooseOptionIsActive ? 'modal is-active' : 'modal'}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="card">
                        <header className="card-header">
                            <p className="card-header-title">Manage member</p>
                        </header>
                        <div className="card-content">
                            <div className="content">What would you like to do?</div>
                        </div>
                        <div className="card-footer">
                            <div className="card-footer-item">
                                <button className="button" onClick={activateRemoveMemberModal}>
                                    Remove member
                                </button>
                            </div>
                            <div className="card-footer-item">
                                <button className="button" onClick={activatePromoteMemberModal}>
                                    Promote member to admin
                                </button>
                            </div>
                            <div className="card-footer-item">
                                <button className="button is-text" onClick={closeAllModals}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={closeAllModals}></button>
            </div>

            {/* Removing Member Modal */}
            <div className={removeMemberIsActive ? 'modal is-active' : 'modal'}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="card">
                        <header className="card-header">
                            <p className="card-header-title">Remove member</p>
                        </header>
                        <div className="card-content">
                            <div className="content">Are you sure you wish to remove {member} from your team?</div>
                        </div>
                        <div className="card-footer">
                            <div className="card-footer-item">
                                <button className="button is-danger is-light" onClick={removeMember}>
                                    Remove member
                                </button>
                            </div>
                            <div className="card-footer-item">
                                <button className="button" onClick={closeAllModals}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={closeAllModals}></button>
            </div>

            {/* Promoting to admin modal */}
            <div className={promoteToAdminIsActive ? 'modal is-active' : 'modal'}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="card">
                        <header className="card-header">
                            <p className="card-header-title">Promote member</p>
                        </header>
                        <div className="card-content">
                            <div className="content">
                                Are you sure you wish to promote {member} to a team administrator? This{' '}
                                <strong>cannot</strong> be undone. This user will have all administrator privileges.
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="card-footer-item">
                                <button className="button is-primary is-light" onClick={promoteMember}>
                                    Promote member
                                </button>
                            </div>
                            <div className="card-footer-item">
                                <button className="button" onClick={closeAllModals}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={closeAllModals}></button>
            </div>
        </Fragment>
    );
};

const AdminTeamMembersPanel: React.FunctionComponent<TeamMembersPanelProps> = ({
    members,
}: TeamMembersPanelProps): React.ReactElement => {
    const [search, setSearch] = React.useState('');
    const [filteredMembers, setFilteredMembers] = React.useState(members.map((member) => member.user));

    const noMembers: boolean = members.filter((member) => member.role_name !== 'Administrator').length === 0;

    React.useEffect(() => {
        const nonAdmins: string[] = members
            .filter((member) => member.role_name !== 'Administrator')
            .map((member) => member.user);
        const filtered = nonAdmins.filter((member) => member.toLowerCase().indexOf(search.toLowerCase()) !== -1);
        setFilteredMembers(filtered);
    }, [search, members]);

    return (
        <nav className="panel">
            <p className="panel-heading">Members</p>
            <p className="panel-block has-text-weight-light bg-gray-50">You may remove members from your team here.</p>
            <div className="panel-block">
                <p className="control has-icons-left">
                    <input
                        type="text"
                        className="input"
                        placeholder="Search members"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <span className="icon is-left">
                        <i className="fas fa-search"></i>
                    </span>
                </p>
            </div>
            {noMembers && <p className="panel-block">This team has no members</p>}
            {filteredMembers.map((member) => (
                <TeamPanelBlock key={member} member={member} />
            ))}
        </nav>
    );
};

export default AdminTeamMembersPanel;
