import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTeam } from '../context/TeamContext';

export default function Testing(): React.ReactElement {
    const { currentUser } = useAuth();
    const { team } = useTeam();

    const handleGetTeams = () => {
        console.log(`Current user is: ${currentUser.email}`);
        console.log('Getting teams...');
    };

    const handleGetProjects = () => {
        console.log(`Current user is: ${currentUser.email}`);
        console.log('Getting projects...');
    };

    const handleGetTickets = () => {
        console.log(`Current user is: ${currentUser.email}`);
        console.log('Getting tickets...');
    };

    const handleSeeToken = () => {
        currentUser.getIdToken().then((token: string) => console.log(token));
    };

    return (
        <div>
            <button className="button" onClick={handleGetTeams}>
                Get Teams
            </button>
            <button className="button" onClick={handleGetProjects}>
                Get Projects
            </button>
            <button className="button" onClick={handleGetTickets}>
                Get Tickets
            </button>
            <button className="button" onClick={handleSeeToken}>
                See Token
            </button>
        </div>
    );
}
