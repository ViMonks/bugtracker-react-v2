import React from 'react';

interface ProjectFilterProps {
    title: string;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    startDate: string;
    handleStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    endDate: string;
    handleEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    manager: string;
    handleManagerChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    viewingArchived: boolean;
    handleViewingArchivedChange: () => void;
    handleFilterReset: () => void;
    uniqueManagers: string[];
}

const ProjectFilter: React.FunctionComponent<ProjectFilterProps> = ({
    title,
    handleTitleChange,
    startDate,
    handleStartDateChange,
    endDate,
    handleEndDateChange,
    manager,
    handleManagerChange,
    viewingArchived,
    handleViewingArchivedChange,
    handleFilterReset,
    uniqueManagers,
}: ProjectFilterProps): React.ReactElement => {
    return (
        <div className="container shadow bg-gray-200 mt-3">
            <div className="my-2 grid grid-cols-1 md:grid-cols-10">
                <div className="text-left md:text-center md:col-span-2">
                    <label className="text-2xl text-gray-800" htmlFor="title">
                        Title:
                    </label>
                    <input
                        className="mx-1 border rounded-md focus:ring-2 outline-none bg-gray-300 text-gray-700"
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div className="text-left md:text-center md:col-span-2">
                    <label className="text-2xl text-gray-800" htmlFor="start-date">
                        Start date:
                    </label>
                    <input
                        className="mx-1 border rounded-md focus:ring-2 outline-none bg-gray-300 text-gray-700"
                        type="date"
                        id="start-date"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                </div>
                <div className="text-left md:text-center md:col-span-2">
                    <label className="text-2xl text-gray-800" htmlFor="end-date">
                        End date:
                    </label>
                    <input
                        className="mx-1 border rounded-md focus:ring-2 outline-none bg-gray-300 text-gray-700"
                        type="date"
                        id="end-date"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </div>
                <div className="text-left md:text-center md:col-span-2">
                    <label className="text-2xl text-gray-800" htmlFor="manager">
                        Manager:
                    </label>
                    <select
                        name="manager"
                        id="manager"
                        className="mx-1 border rounded-md focus:ring-2 outline-none bg-gray-300 text-gray-700"
                        value={manager}
                        onChange={handleManagerChange}
                    >
                        <option value=""></option>
                        {uniqueManagers.map((manager, index) => (
                            <option key={index} value={manager}>
                                {manager}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="text-left md:text-center md:col-span-1">
                    <button
                        className="text-l text-gray-800 bg-gray-300 hover:bg-gray-400 border border-gray-800 px-2 rounded-sm mt-1 focus:outline-none"
                        onClick={handleFilterReset}
                    >
                        Reset
                    </button>
                </div>
                <div className="text-left md:text-center md:col-span-1">
                    <button
                        className={
                            viewingArchived
                                ? 'text-l text-gray-800 bg-blue-300 hover:bg-blue-400 border border-blue-800 px-2 rounded-sm mt-1 focus:outline-none'
                                : 'text-l text-gray-800 bg-blue-300 hover:bg-blue-400 border border-blue-800 px-2 rounded-sm mt-1 focus:outline-none'
                        }
                        onClick={handleViewingArchivedChange}
                    >
                        {viewingArchived ? 'View active' : 'View archived'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectFilter;
