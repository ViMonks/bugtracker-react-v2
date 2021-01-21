import React from 'react';

// interface imports
import { ProjectMembership } from '../../types';

interface AssignedDevelopersListProps {
    memberships: ProjectMembership[];
}

const AssignedDevelopersList: React.FunctionComponent<AssignedDevelopersListProps> = ({
    memberships,
}: AssignedDevelopersListProps): React.ReactElement => {
    // filter initial array of memberships to only developers, then map to an array of usernames
    const developers = memberships
        // .filter((membership) => membership.role_name == 'Developer')
        .map((membership) => membership.user);

    // state setup for filtering developers by username
    const [filteredDevelopers, setFilteredDevelopers] = React.useState(developers);
    const [searchValue, setSearchValue] = React.useState('');

    const handleDeveloperSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const element = e.target as HTMLInputElement;
        setSearchValue(element.value);
    };

    const handleDeveloperSearchReset = (): void => {
        setSearchValue('');
    };

    const filterDevelopers = (developers: string[]): string[] => {
        const filteredDevelopers = developers.filter(
            (developer) => developer.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1,
        );
        return filteredDevelopers;
    };

    React.useEffect(() => {
        setFilteredDevelopers(filterDevelopers(developers));
    }, [searchValue, memberships]);

    // helper function to create list item for each developer
    const createListItem = (text: string) => {
        return <div className="panel-block">{text}</div>;
    };

    return (
        <div className="panel is-info is-light">
            <p className="panel-heading">Members</p>
            <div className="panel-block">
                <p className="control has-icons-left">
                    <input
                        type="text"
                        className="input"
                        placeholder="Search members"
                        value={searchValue}
                        onChange={handleDeveloperSearchChange}
                    />
                    <span className="icon is-left">
                        <i className="fas fa-search"></i>
                    </span>
                </p>
            </div>
            {filteredDevelopers.map((item) => createListItem(item))}
            {developers.length === 0 && <div className="panel-block">No members assigned to project.</div>}
            <div className="panel-block">
                <button
                    className="button is-light is-outlined is-link is-fullwidth"
                    onClick={handleDeveloperSearchReset}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default AssignedDevelopersList;
