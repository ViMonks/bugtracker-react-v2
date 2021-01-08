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
        .filter((membership) => membership.role_name == 'Developer')
        .map((membership) => membership.user);

    // state setup for filtering developers by username
    const [filteredDevelopers, setFilteredDevelopers] = React.useState(developers);
    const [searchValue, setSearchValue] = React.useState('');

    const handleDeveloperSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const element = e.target as HTMLInputElement;
        setSearchValue(element.value);
    };

    const filterDevelopers = (developers: string[]): string[] => {
        const filteredDevelopers = developers.filter(developer => developer.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
        return filteredDevelopers;
    };

    React.useEffect(() => {
        setFilteredDevelopers(filterDevelopers(developers))
    }, [searchValue])

    // helper function to create list item for each developer
    const createListItem = (text: string) => {
        return (
            <div className="my-1 hover:bg-blue-100 rounded">
                <p className="p-1">{text}</p>
            </div>
        );
    };

    return (
        <div className="flex flex-col bg-gray-200 px-4 shadow-md rounded-md mr-4 ml-1 my-2">
            <div className="my-1">
                <h3 className="text-xl text-gray-800 px-2 py-3 leading-tight">Developers</h3>
            </div>
            <div className="">
                <input
                    type="text"
                    placeholder="Search members"
                    className="my-2 w-full text-sm bg-gray-100 text-grey-darkest rounded h-10 p-3 focus:outline-none"
                    onChange={handleDeveloperSearchChange}
                />
            </div>
            {filteredDevelopers.map((item) => createListItem(item))}
        </div>
    );
};

export default AssignedDevelopersList;
