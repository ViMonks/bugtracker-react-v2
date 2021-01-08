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
        <div className="container shadow bg-gray-200 mt-3">
            <input
                className="my-1 mx-1 border rounded-md focus:ring-2 outline-none bg-gray-300 text-gray-700 p-1"
                placeholder="Title search"
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
            />
            <button
                className="text-l text-gray-800 bg-gray-300 hover:bg-gray-400 border border-gray-800 px-2 rounded-sm mt-1 mx-2"
                onClick={handleFilterReset}
            >
                Reset
            </button>
            <button
                className="text-l text-gray-800 bg-blue-300 hover:bg-blue-400 border border-blue-800 px-2 rounded-sm mt-1 mx-1"
                onClick={handleViewingClosedChange}
            >
                {viewingClosed ? 'View open' : 'View closed'}
            </button>
        </div>
    );
};

export default TicketFilter;
