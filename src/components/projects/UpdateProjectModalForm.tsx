import React, { Fragment } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useAuth } from '../context/AuthContext';
import { getTeamDetails } from '../API/Api';

// interface imports
import { NewOrUpdatedProjectProps, Project, TeamMembership } from '../../types';

interface UpdateProjectModalFormProps {
    project: Project;
}

interface ParamTypes {
    teamSlug: string;
}

const UpdateProjectModalForm: React.FunctionComponent<UpdateProjectModalFormProps> = ({
    project,
}: UpdateProjectModalFormProps): React.ReactElement => {
    const [isActive, setIsActive] = React.useState(false);
    const { teamSlug } = useParams<ParamTypes>();
    const { user } = useAuth();
    const { isLoading, error, data: team } = useQuery<any, Error>(
        ['teamDetails', { user, teamSlug }],
        () => getTeamDetails({ user, teamSlug }),
        { enabled: !!user, staleTime: 30000 },
    );

    // form data
    const [title, setTitle] = React.useState(project.title);
    const [description, setDescription] = React.useState(project.description);
    const [manager, setManager] = React.useState(project.manager);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleManagerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setManager(e.target.value);
    };

    const updateProject = (updatedProject: NewOrUpdatedProjectProps): void => {
        console.log(updatedProject);
        // TODO: API call to update project; will have to get teamSlug and include in POST; same for Ticket forms
        toast.success('Project updated!');
    };

    const handleSubmit = () => {
        let updatedProject;
        if (manager) {
            updatedProject = {
                title: title,
                description: description,
                manager: manager,
            };
        } else {
            updatedProject = {
                title: title,
                description: description,
            };
        }
        updateProject(updatedProject);
        setIsActive(false);
    };

    const createManagersOptionsList = (members: TeamMembership[]): React.ReactElement => {
        const memberUsernames: string[] = members.map((member) => member.user);

        return (
            <Fragment>
                <div className="select">
                    <select value={manager ? manager : ''} onChange={handleManagerChange}>
                        <option value="" selected disabled>
                            Assign a manager (optional)
                        </option>
                        {memberUsernames.map((member) => (
                            <option key={member} value={member}>
                                {member}
                            </option>
                        ))}
                    </select>
                </div>
            </Fragment>
        );
    };

    return (
        <div className="container">
            <button className={isLoading ? 'button is-primary is-loading' : 'button is-primary'} onClick={() => setIsActive(!isActive)}>
                Update Project
            </button>

            {error ? error.message : null}
            {team && (
            <div className={isActive ? 'modal is-active' : 'modal'}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Update Project</p>
                        <button className="delete" aria-label="close" onClick={() => setIsActive(!isActive)}></button>
                    </header>
                    <section className="modal-card-body">
                        {/* Title Field */}
                        <div className="field">
                            <label className="label">Title</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className={!title ? 'input is-danger' : 'input'}
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                            </div>
                            {!title && <p className="help is-danger">Title is required.</p>}
                        </div>

                        {/* Description Field */}
                        <div className="field">
                            <label className="label">Description</label>
                            <div className="control">
                                <textarea
                                    className={!description ? 'textarea is-danger' : 'textarea'}
                                    value={description}
                                    onChange={handleDescriptionChange}
                                ></textarea>
                            </div>
                            {!description && <p className="help is-danger">Description is required.</p>}
                        </div>

                        {/* Manager Field */}
                        <div className="field">
                            <label className="label">Manager</label>
                            <div className="control">{createManagersOptionsList(team.data.memberships)}</div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        {!title || !description ? (
                            <button className="button is-success" disabled onClick={handleSubmit}>
                                Submit
                            </button>
                        ) : (
                            <button className="button is-success" onClick={handleSubmit}>
                                Submit
                            </button>
                        )}

                        <button className="button" onClick={() => setIsActive(!isActive)}>
                            Cancel
                        </button>
                    </footer>
                </div>
                <button className="modal-close is-large" onClick={() => setIsActive(!isActive)}></button>
            </div>)}
        </div>
    );
};

export default UpdateProjectModalForm;
