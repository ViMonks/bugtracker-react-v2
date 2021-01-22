import React from 'react';

// interface imports
import { TeamMembership } from '../../types';

interface TeamMembersPanelProps {
    members: TeamMembership[];
}

const NonAdminTeamMembersPanel: React.FunctionComponent<TeamMembersPanelProps> = ({
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
                <a key={member} className="panel-block">
                    <span className="panel-icon">
                        <i className="fas fa-user"></i>
                    </span>
                    {member}
                </a>
            ))}
        </nav>
    );
};

export default NonAdminTeamMembersPanel;
