import React, { Fragment } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

// interface imports
import { ProjectMembership, NewOrUpdatedTicketProps } from '../../types';
import { getProjectDetails } from '../API/FirebaseAPI';

interface CreateTicketModalFormProps {
    createTicket: (newTicket: NewOrUpdatedTicketProps) => void;
}

interface ParamTypes {
    projectSlug: string;
    teamSlug: string;
}

const CreateTicketModalForm: React.FunctionComponent<CreateTicketModalFormProps> = ({
    createTicket,
}: CreateTicketModalFormProps): React.ReactElement => {
    // getting the projectSlug from the URL
    const { projectSlug, teamSlug } = useParams<ParamTypes>();
    const { isLoading, error, data: project } = useQuery<any, Error>(
        ['projectDetails', { teamSlug, projectSlug }],
        () => getProjectDetails({ teamSlug, projectSlug }),
        { staleTime: 30000 },
    );

    // state for form data
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [developer, setDeveloper] = React.useState('');
    const [priority, setPriority] = React.useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleDeveloperChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDeveloper(e.target.value);
    };

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriority(e.target.value);
    };

    // state for whether the modal is active or not
    const [isActive, setIsActive] = React.useState(false);

    const handleToggleIsActive = () => {
        setIsActive(!isActive);
    };

    // submitting form data
    const handleSubmit = () => {
        const convertPriorityToNumber = (priority: string): number => {
            if (priority === 'Low') {
                return 1;
            } else if (priority === 'High') {
                return 2;
            } else {
                return 3;
            }
        };

        const newTicket = {
            title: title,
            description: description,
            developer: developer,
            priority: convertPriorityToNumber(priority),
            project: projectSlug,
        };
        createTicket(newTicket);
        setIsActive(false);
    };

    const createDevelopersOptionsList = (members: ProjectMembership[]): React.ReactElement => {
        const developers: string[] = members
        // // uncomment the following three lines if you want the possible developers to NOT include managers
        //     // .filter((member) => { 
        //     //     return member.role_name == 'Developer';
        //     // })
            .map((developer) => developer.user);

        return (
            <Fragment>
                <div className="select">
                    <select value={developer} onChange={handleDeveloperChange}>
                        <option value="" selected disabled>
                            Assign a developer (optional)
                        </option>
                        {developers.map((developer) => (
                            <option key={developer} value={developer}>
                                {developer}
                            </option>
                        ))}
                    </select>
                </div>
            </Fragment>
        );
    };

    return (
        <Fragment>
            <button className={isLoading ? 'button is-primary is-loading' : 'button is-primary'} onClick={handleToggleIsActive}>
                Submit Ticket
            </button>

            {error ? error.message : null}
            {project && (
            <div className={isActive ? 'modal is-active' : 'modal'}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Submit Ticket</p>
                        <button className="delete" aria-label="close" onClick={handleToggleIsActive}></button>
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
                                    className="textarea"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                ></textarea>
                            </div>
                        </div>

                        {/* Developer Field */}
                        <div className="field">
                            <label className="label">Developer</label>
                            <div className="control">{createDevelopersOptionsList(project.data.memberships)}</div>
                        </div>

                        {/* Priority Field */}
                        <div className="field">
                            <label className="label">Priority</label>
                            <div className="control">
                                <div className={!priority ? 'select is-danger' : 'select'}>
                                    <select value={priority} onChange={handlePriorityChange}>
                                        <option selected disabled value="">
                                            Select priority
                                        </option>
                                        <option>Low</option>
                                        <option>High</option>
                                        <option>Urgent</option>
                                    </select>
                                </div>
                            </div>
                            {!priority && <p className="help is-danger">Priority is required.</p>}
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        {!title || !priority ? (
                            <button className="button is-success" disabled onClick={handleSubmit}>
                                Submit
                            </button>
                        ) : (
                            <button className="button is-success" onClick={handleSubmit}>
                                Submit
                            </button>
                        )}

                        <button className="button" onClick={handleToggleIsActive}>
                            Cancel
                        </button>
                    </footer>
                </div>
                <button className="modal-close is-large" onClick={handleToggleIsActive}></button>
            </div>)}
        </Fragment>
    );
};

export default CreateTicketModalForm;
