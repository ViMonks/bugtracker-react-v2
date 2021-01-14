import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'
moment().format();

// Utility functions for constructing tables
export const createLinkCell = (value: string, href: string): React.ReactElement => {
    return (
        <td className="border border-gray-300 py-2 px-1 bg-gray-100 text-blue-500">
            <Link to={location => `${location.pathname}/${href}`} className="hover:text-blue-600">
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

// converts a Ticket's priority number into the proper text
export const getPriorityText = (priority: number): string => {
    if (priority === 1) {
        return 'Low';
    } else if (priority === 2) {
        return 'High';
    } else {
        return 'Urgent';
    }
};

// converts a date string to a "updated x minutes ago" or whatever string
export const getLastUpdatedString = (date: string) => {
    const dateObj = new Date(date);
    const momentDate = moment(dateObj);
    return momentDate.fromNow();
};

// validates an email address
export function validateEmail (email: string) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }