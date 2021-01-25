import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

// internal imports
import ProjectListView from './ProjectListView';
import CreateProjectModalForm from './CreateProjectModalForm';
import { useAuth } from '../context/AuthContext';
import { getProjectList, getTeamDetails } from '../API/FirebaseAPI';
import LoadingBar from '../LoadingBar';

interface ParamTypes {
    teamSlug: string;
}

const ProjectListContainer = (): React.ReactElement => {
    // project details and ticket list prefetching happens in the ProjectTableRow component
    const { teamSlug } = useParams<ParamTypes>();
    // const { data: user } = useQuery('user', async () => await currentUser.getIdToken(), {staleTime: Infinity});
    const { isLoading, error, data } = useQuery<any, Error>(
        ['projectList', { teamSlug }],
        () => getProjectList({ teamSlug }),
        { staleTime: 30000 },
    );

    const { isLoading: teamIsLoading, error: teamError, data: team } = useQuery<any, Error>(
        ['teamDetails', { teamSlug }],
        () => getTeamDetails({ teamSlug }),
        { staleTime: 30000 },
    );

    return (
        <div className="container">
            <div className="block">
                {isLoading ? (
                    <div className="block">
                        <h1 className="title is-1 has-text-grey-dark">Projects</h1>
                        <LoadingBar />
                    </div>
                ) : null}
                {error ? error.message : null}
                {/* {data ? <ProjectListView projects={data.data} /> : null} */}
                {data && data.data.length > 0 ? (
                    <ProjectListView projects={data.data} />
                ) : (
                    <>
                        <div className="block">
                            <h1 className="title is-1 has-text-grey-dark">
                                Projects
                            </h1>
                        </div>
                        <div className="container mt-4">
                            <h1 className="title is-5">This team has no projects yet. Why not create one?</h1>
                        </div>
                    </>
                )}
            </div>
            {!teamIsLoading && team.data.user_is_admin && (
                <div className="block">
                    <CreateProjectModalForm />
                </div>
            )}
        </div>
    );
};

export default ProjectListContainer;
