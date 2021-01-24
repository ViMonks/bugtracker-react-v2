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
        <div className="box">
            <div className="container">
                <div className="columns is-desktop">
                    <div className="column">
                        {/* Title Field */}
                        <div className="field">
                            <label htmlFor="" className="label">
                                Title
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        {/* Start Date Field */}
                        <div className="field">
                            <label htmlFor="" className="label">
                                Start Date
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="date"
                                    id="start-date"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        {/* End Date Field */}
                        <div className="field">
                            <label htmlFor="" className="label">
                                End Date
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="date"
                                    id="start-date"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        {/* Manager Field */}
                        <div className="field">
                            <label htmlFor="" className="label">
                                Manager
                            </label>
                            <div className="control">
                                <div className="select">
                                    <select name="manager" id="manager" value={manager} onChange={handleManagerChange}>
                                        <option value="" disabled selected>
                                            Select manager
                                        </option>
                                        {uniqueManagers.map((manager, index) => (
                                            <option key={index} value={manager}>
                                                {manager}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="column is-1">
                        <div className="field mt-5">
                            <div className="control">
                                <button className="button is-light is-link" onClick={handleFilterReset}>
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="column">
                        <div className="field mt-5">
                            <div className="control">
                                <button className="button is-light" onClick={handleViewingArchivedChange}>
                                    {viewingArchived ? 'View active' : 'View archived'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectFilter;
