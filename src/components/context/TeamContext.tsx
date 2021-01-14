import React from 'react'

// interface imports
import { Team } from '../../types'

const TeamContext = React.createContext<Team>(undefined!); // undefined! tells TypeScript that this value will NOT be undefined at runtime

TeamContext.displayName = 'CurrentTeam';

export default TeamContext