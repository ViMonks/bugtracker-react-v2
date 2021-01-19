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
        // Actually, not sure this is correct; might should just pass teamSlug as context and let the individual views call the API
        // if I do it here, the ENTIRE UI needs to wait on the team to be retrieved before it can update
        return teamDetail
    }

    const { teamSlug } = useParams();    
    const [team, setTeam] = React.useState(getTeam(teamSlug))    

    const value = {
        team,
    }

    return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>
}