import React from 'react';
import projectList from '../../fakeAPI/projectList';

// interfaces
import { Project } from '../../types';

// internal imports
import ProjectListView from './ProjectListView';

const ProjectListContainer = (): React.ReactElement => {
    const getProjects = (): Project[] => {
        // TODO: this is where the API call will live
        return projectList;
    };

    const [projects, setProjects] = React.useState(getProjects());

    return (
        <div>
            <ProjectListView projects={projects} />
        </div>
    );
};

export default ProjectListContainer;
