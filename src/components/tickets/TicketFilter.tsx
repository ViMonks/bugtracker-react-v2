import React from 'react';

interface TicketFilterProps {
    title: string;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    viewingClosed: boolean;
    handleViewingClosedChange: () => void;
    handleFilterReset: () => void;
}

const TicketFilter: React.FunctionComponent<TicketFilterProps> = ({
    title,
    handleTitleChange,
    handleFilterReset,
    viewingClosed,
    handleViewingClosedChange,
}: TicketFilterProps): React.ReactElement => {
    return (
        <div className="field has-addons">
            <div className="control">
                <input
                    type="text"
                    className="input is-small"
                    placeholder="Title search"
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>
            <button className="button is-small is-outlined is-light is-link" onClick={handleFilterReset}>
                Reset
            </button>
            <button className="button is-small is-light" onClick={handleViewingClosedChange}>
                {viewingClosed ? 'View open' : 'View closed'}
            </button>
        </div>
    );
};

export default TicketFilter;
