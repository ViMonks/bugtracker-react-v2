import React, { Fragment } from 'react'

// interface imports
import { NewTeamProps } from '../../types'

interface CreateTeamModalFormProps {
    createTeam: (newTeam: NewTeamProps) => void
}

const CreateTeamModalForm: React.FunctionComponent<CreateTeamModalFormProps> = ({createTeam}: CreateTeamModalFormProps): React.ReactElement => {
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const [isActive, setIsActive] = React.useState(false);

    const handleToggleIsActive = () => {
        setIsActive(!isActive);
    };

    const handleSubmit = () => {
        const newTeam: NewTeamProps = {
            title: title,
            description: description
        }
        createTeam(newTeam)
        setIsActive(false)
        setTitle('')
        setDescription('')
    }

    return (
        <Fragment>
            <button className="button is-primary" onClick={handleToggleIsActive}>
                Create New Team
            </button>

            <div className={isActive ? 'modal is-active' : 'modal'}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Create New Team</p>
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
                                    className={!description ? 'textarea is-danger' : 'textarea'}
                                    value={description}
                                    onChange={handleDescriptionChange}
                                ></textarea>
                            </div>
                            {!description && <p className="help is-danger">Description is required.</p>}
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

                        <button className="button" onClick={handleToggleIsActive}>
                            Cancel
                        </button>
                    </footer>
                </div>
                <button className="modal-close is-large" onClick={handleToggleIsActive}></button>
            </div>
        </Fragment>
    );
}


export default CreateTeamModalForm