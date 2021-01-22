import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// interface imports
import { TeamMembership } from '../../types';
import { useMutation, useQueryClient } from 'react-query';
import { removeTeamMember } from '../API/FirebaseAPI';

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
    const [isActive, setIsActive] = React.useState(false);
    const username = member;

    const queryClient = useQueryClient();

    const removeMemberMutation = useMutation(removeTeamMember, {
        onSuccess: () => {
            queryClient.invalidateQueries('teamDetails');
            queryClient.refetchQueries();
            toast.success('User removed from team.');
            setIsActive(false);
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    const removeMember = () => {
        const member = { member: username };
        removeMemberMutation.mutate({ teamSlug, member });
    };

    const toggleIsActive = () => {
        setIsActive(!isActive);
    };

    return (
        <Fragment>
            <a className="panel-block" onClick={toggleIsActive}>
                <span className="panel-icon">
                    <i className="fas fa-user"></i>
                </span>
                {member}
            </a>

            <div className={isActive ? 'modal is-active' : 'modal'}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="card">
                        <div className="card-content">
                            <div className="content">Are you sure you wish to remove {member} from your team?</div>
                        </div>
                        <div className="card-footer">
                            <div className="card-footer-item">
                                <button className="button is-danger" onClick={removeMember}>
                                    Remove Member
                                </button>
                            </div>
                            <div className="card-footer-item">
                                <button className="button is-info" onClick={toggleIsActive}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={toggleIsActive}></button>
            </div>
        </Fragment>
    );
};

const AdminTeamMembersPanel: React.FunctionComponent<TeamMembersPanelProps> = ({
    members,
}: TeamMembersPanelProps): React.ReactElement => {
    const [search, setSearch] = React.useState('')
    const [filteredMembers, setFilteredMembers] = React.useState(members.map(member => member.user))

    const noMembers: boolean = members.filter((member) => member.role_name !== 'Administrator').length === 0

    React.useEffect(() => {
        const nonAdmins: string[] = members.filter((member) => member.role_name !== 'Administrator').map((member) => member.user)
        const filtered = nonAdmins.filter(
            (member) => member.toLowerCase().indexOf(search.toLowerCase()) !== -1,
        );
        setFilteredMembers(filtered)
    }, [search, members])

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
            {noMembers && <p className='panel-block'>This team has no members</p>}
            {filteredMembers.map((member) => <TeamPanelBlock key={member} member={member} />)}            
        </nav>
    );
};

export default AdminTeamMembersPanel;
