import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

interface TicketModalProps {
    isOpen: boolean;
    resolution?: string;
    handleCloseTicket: (ticketSlug: string, resolutionState?: string) => void;
}

interface ParamTypes {
    projectSlug: string;
    ticketSlug: string;
    teamSlug: string;
}

const TicketDetailClosingModal: React.FunctionComponent<TicketModalProps> = ({
    isOpen,
    resolution,
    handleCloseTicket,
}: TicketModalProps): React.ReactElement => {
    const [resolutionState, setResolutionState] = React.useState(resolution)
    const handleResolutionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setResolutionState(e.target.value);
    };
    /*
    This component takes in three props, as seen in the above interface. isOpen represents whether the ticket being viewed is open or closed.
    This determines whether the button says 'Close Ticket' or 'Reopen Ticket'.
    <resolution> represents the string value of the ticket's resolution, if it exists. This value populates the resolution field of the modal form if it exists.
    <closeTicket> is a function defined in the TicketDetailContainer component. This function handles the API call necessary to close or reopen a ticket.
    */
    const [isActive, setIsActive] = React.useState(false);
    const { ticketSlug } = useParams<ParamTypes>();

    const handleToggleIsActive = () => {
        setIsActive(!isActive);
    };

    const handleSubmit = () => {
        // this function calls closeTicket, which is handled by TicketDetailContainer
        // then, if the ticket was originally open, it is now being closed, so user is redirected to project detail view
        // otherwise, the ticket is being reopened, so the user remains on this page, and the modal closes
        handleCloseTicket(ticketSlug, resolutionState);
        handleToggleIsActive();
    };

    return (
        <Fragment>
            <div className="panel-block">
                <button className="button is-light" onClick={handleToggleIsActive}>
                    {isOpen ? 'Close ticket' : 'Reopen ticket'}
                </button>
            </div>

            <div className={isActive ? 'modal is-active' : 'modal'}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Ticket Resolution</p>
                        <button className="delete" aria-label="close" onClick={handleToggleIsActive}></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="field">
                            <div className="control">
                                <textarea className="textarea" placeholder="Describe how you resolved this ticket (optional)." onChange={handleResolutionChange} value={resolutionState}>

                                </textarea>
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={handleSubmit}>
                            Close Ticket
                        </button>
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

export default TicketDetailClosingModal;
