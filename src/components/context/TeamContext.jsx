/* eslint-disable */
import React from 'react'
import { useParams } from 'react-router-dom';
import teamDetail from '../../fakeAPI/teamDetail';

// interface imports
import { Team } from '../../types'

const TeamContext = React.createContext(); // undefined! tells TypeScript that this value will NOT be undefined at runtime

TeamContext.displayName = 'CurrentTeam';

export default TeamContext

export function useTeam() {
    return React.useContext(TeamContext)
}

export function TeamProvider({ children }) {
    const getTeam = (teamSlug) => {
        // TODO: API call to get team info based on current URL
        return teamDetail
    }

    const { teamSlug } = useParams();    
    const [team, setTeam] = React.useState(getTeam(teamSlug))    

    React.useEffect(() => {
        setTeam(getTeam(teamSlug))
        console.log('Rendering...')
    }, [teamSlug])

    const value = {
        team,
    }

    return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>
}