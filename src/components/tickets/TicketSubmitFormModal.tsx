import React, { Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';

// internal imports
import { getPriorityText } from '../utils';

// interface imports
import { Ticket, ProjectMembership } from '../../types';

interface TicketSubmitFormModalProps {
    ticket?: Ticket;
    updating: boolean;
    projectMembers: ProjectMembership[];
}


const TicketSubmitFormModal: React.FunctionComponent<TicketSubmitFormModalProps> = ({
    ticket,
    updating,
    projectMembers
}: TicketSubmitFormModalProps): React.ReactElement => {
    const [isActive, setIsActive] = React.useState(false);

    const handleToggleIsActive = () => {
        setIsActive(!isActive);
    };

    const createDevelopersOptionsList = (members: ProjectMembership[]): React.ReactElement => {
        // This function creates the options list for the developer assignment dropdown.
        // It must handle two cases: when a developer is already assigned and when one isn't.
        // When the developer is already assigned:
        // This function creates a list of options where the currently assigned developer is already selected.
        // When the developer is not already assigned:
        // The function simply creates a list of all developers.
        // In both cases, the function must filter the list of project members down to developers only (i.e., excluding the project manager).
        if (ticket?.developer) {
            const assignedDeveloper: string = members.filter((member) => {
                return member.user === ticket.developer;
            })[0].user;

            const membersWithAssignedDeveloperRemoved: string[] = members
                .filter((member) => {
                    return member.user !== ticket.developer && member.role_name === 'Developer';
                })
                .map((developer) => developer.user);

            return (
                <Fragment>
                    <div className="select">
                        <select>
                            <option key={assignedDeveloper} value={assignedDeveloper} selected>
                                {assignedDeveloper}
                            </option>
                            {membersWithAssignedDeveloperRemoved.map((member) => (
                                <option key={member} value={member}>
                                    {member}
                                </option>
                            ))}
                        </select>
                    </div>
                </Fragment>
            );
        } else {
            const developers: string[] = members
                .filter((member) => {
                    return member.role_name == 'Developer';
                })
                .map((developer) => developer.user);

            return (
                <Fragment>
                    <div className="select">
                        <select>
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
        }
    };

    

    return (
        <Fragment>
            <button className="button is-info" onClick={handleToggleIsActive}>
                {updating ? 'Update Ticket' : 'Submit Ticket'}
            </button>

            <div className={isActive ? 'modal is-active' : 'modal'}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{updating ? 'Update Ticket' : 'Submit Ticket'}</p>
                        <button className="delete" aria-label="close" onClick={handleToggleIsActive}></button>
                    </header>
                    <section className="modal-card-body">
                        {/* Title Field */}
                        <div className="field">
                            <label className="label">Title</label>
                            <div className="control">
                                <input type="text" className="input">
                                    {ticket?.title}
                                </input>
                            </div>
                        </div>

                        {/* Description Field */}
                        <div className="field">
                            <label className="label">Description</label>
                            <div className="control">
                                <textarea className="textarea">{ticket?.description}</textarea>
                            </div>
                        </div>

                        {/* Developer Field */}
                        <div className="field">
                            <label className="label">Developer</label>
                            <div className="control">
                                {createDevelopersOptionsList(projectMembers)}
                            </div>
                        </div>

                        {/* Priority Field */}
                        <div className="field">
                            <label className="label">Priority</label>
                            <div className="control">
                                <div className="select">
                                    <select>
                                        <option selected disabled value="">
                                            Select priority
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Resolution Field */}
                        <div className="field">
                            <label className="label">Priority</label>
                            <div className="control">
                                <textarea
                                    className="textarea"
                                    placeholder="If this ticket has been resolved, describe how it was resolved. Otherwise, leave blank."
                                >
                                    {ticket?.resolution}
                                </textarea>
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success">Submit</button>
                        <button className="button" onClick={handleToggleIsActive}>
                            Cancel
                        </button>
                    </footer>
                </div>
                <button className="modal-close is-large" onClick={handleToggleIsActive}></button>
            </div>
        </Fragment>
    );
};
