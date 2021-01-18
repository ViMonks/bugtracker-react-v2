import React from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../context/AuthContext';
import { useTeam } from '../context/TeamContext';
import { getProjectList, getTeamsList } from './Api';
import { ReactQueryDevtools } from 'react-query/devtools'
import axios from 'axios'

// const testtoken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjVmOTcxMmEwODczMTcyMGQ2NmZkNGEyYTU5MmU0ZGZjMmI1ZGU1OTUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSnVzdGluIFRodXJtYW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDUuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1aZG1PX0VuMFJucy9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNrTUs4cmNjUXJnWkF0QTB5bnhPTGxscmJYbmVnL3M5Ni1jL3Bob3RvLmpwZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9idWd0cmFja2luZy1hcGktYXV0aCIsImF1ZCI6ImJ1Z3RyYWNraW5nLWFwaS1hdXRoIiwiYXV0aF90aW1lIjoxNjEwOTE3NTY4LCJ1c2VyX2lkIjoiQjNDY3hSdm1ZQmQ2NU1XbWFEWldYWUxRNmNkMiIsInN1YiI6IkIzQ2N4UnZtWUJkNjVNV21hRFpXWFlMUTZjZDIiLCJpYXQiOjE2MTA5ODg3MDYsImV4cCI6MTYxMDk5MjMwNiwiZW1haWwiOiJ0aHVybWFuLmp1c3RpbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNzY4MTYxNzMzMzMwNTE5NTgwMCJdLCJlbWFpbCI6WyJ0aHVybWFuLmp1c3RpbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.EBuT3bEiY25YtjTtgKxR0KPmsktkhHtyrytuf-xrHEjOvOn2QS7FjAf26oooBVmEX1EbkdFXkxHWRRYvUD0v68zqB52N822rZJWRSbxlaAoO-X_QwohuAeQSitz6WHf1cEeX3eX3A6xwRTp-GHJ8WZqIZMkWH5dOm1IVKWVf14hnCa5EEv809Nf87pYIS-mx-7O-PqjaVV2W8YmKuzF6lkzH4OS0NmsmNTtCpbuLEE90v9lN6dddMe1dCimamN7QBmQpytDEhq0corqXO_yD98hy8WHMTb_eeXPmvE2i4yIHiInjQg0PxgqstvXv5Io7-vuCwmmCgizcLLyhaQTSOw'
// const axiosHeaders = {
//     'Authorization': `JWT ${testtoken}`,
//     'Content-Type': 'application/json',
//     'Accept': 'application/json, text/plain, */*',
// }

export default function Testing(): React.ReactElement {
    const { currentUser } = useAuth();
    const { team } = useTeam();
    const [token, setToken] = React.useState('')
    const {data: user} = useQuery('user', async () => {
        const data = await currentUser.getIdToken()
        return data
    })

    // const { isLoading, error, data } = useQuery(['teamsList', user], () => getTeamsList(user), {enabled: !!user})
    const { isLoading, error, data } = useQuery(['projectList', user], () => getProjectList(user), {enabled: !!user})
    const { isLoading: teamsIsLoading, error: teamsError, data: teams } = useQuery(['teamsList', user], () => getTeamsList(user), {enabled: !!user})

    

    const handleGetTeams = () => {
        console.log(`Current user is: ${currentUser.email}`);
        console.log('Getting teams...');
        console.log(teams)
    };

    const handleGetProjects = () => {
        console.log(`Current user is: ${currentUser.email}`);
        console.log('Getting projects...');
        console.log(data)
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
            <ReactQueryDevtools />
        </div>
    );
}
