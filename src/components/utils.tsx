import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'
moment().format();

// Utility functions for constructing tables
export const createLinkCell = (value: string, href: string): React.ReactElement => {
    return (
        <td className="border border-gray-300 py-2 px-1 bg-gray-100 text-blue-500">
            <Link to={href} className="hover:text-blue-600">
                {value}
            </Link>
        </td>
    );
};

export const createHeader = (header: string, index: string): React.ReactElement => {
    return (
        <th key={index.toString()} className="border border-blue-300 px-1 py-2 bg-blue-200 text-blue-900">
            {header}
        </th>
    );
};

export const createCell = (value: string | number | null): React.ReactElement => {
    return <td className="border border-gray-300 py-2 px-1 bg-gray-100 text-gray-500">{value}</td>;
};

export const createDateCell = (value: string) => {
    const date = new Date(value);
    return <td className="border border-gray-300 py-2 px-1 bg-gray-100 text-gray-500">{date.toLocaleDateString()}</td>;
};

export const createElapsedTimeCell = (value: string) => {
    const date = new Date(value);
    const momentDate = moment(date);
    return <td className="border border-gray-300 py-2 px-1 bg-gray-100 text-gray-500">{momentDate.fromNow()}</td>;
}