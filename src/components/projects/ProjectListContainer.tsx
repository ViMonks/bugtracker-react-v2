import React from 'react';
import projectList from '../../fakeAPI/projectList';
import teamDetail from '../../fakeAPI/teamDetail';
import { useParams } from 'react-router-dom';

// interfaces
import { Project, Team } from '../../types';

// context
import TeamContext from '../context/TeamContext'

// internal imports
import ProjectListView from './ProjectListView';
import CreateProjectModalForm from './CreateProjectModalForm';

interface ParamTypes {
    teamSlug: string;
}

const ProjectListContainer = (): React.ReactElement => {
    const { teamSlug } = useParams<ParamTypes>();

    const getProjects = (): Project[] => {
        // TODO: this is where the API call will live
        return projectList;
    };

    const getTeam = (teamSlug: string): Team => {
        // TODO: API call to get team based on current URL
        return teamDetail;
    };

    const [team, setTeam] = React.useState(getTeam(teamSlug));
    React.useEffect(() => {
        setTeam(getTeam(teamSlug));
    }, [teamSlug]);    

    const [projects, setProjects] = React.useState(getProjects());

    return (
        <div>
            <TeamContext.Provider value={team}>
                <div className="block">
                    <ProjectListView projects={projects} />
                </div>
                <div className="block">
                    <CreateProjectModalForm />
                </div>
            </TeamContext.Provider>
        </div>
    );
};

export default ProjectListContainer;
