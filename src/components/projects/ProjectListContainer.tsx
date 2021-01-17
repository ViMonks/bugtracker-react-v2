import React from 'react';
import projectList from '../../fakeAPI/projectList';
import { useParams } from 'react-router-dom';

// interfaces
import { Project, Team } from '../../types';

// context
import TeamContext, { useTeam } from '../context/TeamContext';

// internal imports
import ProjectListView from './ProjectListView';
import CreateProjectModalForm from './CreateProjectModalForm';

interface ParamTypes {
    teamSlug: string;
}

const ProjectListContainer = (): React.ReactElement => {
    const { team } = useTeam();

    const getProjects = (): Project[] => {
        // TODO: this is where the API call will live
        return projectList;
    };

    const [projects, setProjects] = React.useState(getProjects());

    return (
        <div>
            <div className="block">
                <ProjectListView projects={projects} />
            </div>
            <div className="block">
                <CreateProjectModalForm />
            </div>
        </div>
    );
};

export default ProjectListContainer;
