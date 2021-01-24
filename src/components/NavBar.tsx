import React from 'react';

import { Route, NavLink, Link, useParams } from 'react-router-dom';

import logo from '../assets/bugtracking_logo.png';
import { useAuth } from './context/AuthContext';

interface ParamTypes {
    teamSlug: string;
    projectSlug: string;
    ticketSlug: string;
}

export default function NavBar() {
    const { teamSlug, projectSlug, ticketSlug } = useParams<ParamTypes>();
    const { currentUser, logout } = useAuth();

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    <img src={logo} alt="Bugtracking.io" />
                </Link>

                <a
                    role="button"
                    className="navbar-burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbar-main" className="navbar-menu">
                <div className="navbar-start">
                    <NavLink
                        className="navbar-item"
                        activeClassName="navbar-item has-text-weight-semibold"
                        exact
                        to="/teams/"
                    >
                        Teams
                    </NavLink>

                    {teamSlug && (
                        <NavLink
                            className="navbar-item"
                            activeClassName="navbar-item has-text-weight-semibold"
                            exact
                            to={`/teams/${teamSlug}/projects/`}
                        >
                            Projects
                        </NavLink>
                    )}

                    {projectSlug && (
                        <NavLink
                            className="navbar-item"
                            activeClassName="navbar-item has-text-weight-semibold"
                            exact
                            to={`/teams/${teamSlug}/projects/${projectSlug}`}
                        >
                            Tickets
                        </NavLink>
                    )}

                    {/* Dropdown */}
                    {/* <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">More</a>

                        <div className="navbar-dropdown">
                            <a className="navbar-item">About</a>
                            <a className="navbar-item">Jobs</a>
                            <a className="navbar-item">Contact</a>
                            <hr className="navbar-divider" />
                            <a className="navbar-item">Report an issue</a>
                        </div>
                    </div> */}
                </div>

                <div className="navbar-end">
                    <Link className="navbar-item" to="/">
                        Documentation
                    </Link>

                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button is-primary">
                                <strong>Sign up</strong>
                            </a>
                            <a className="button is-light">Log in</a>
                        </div>
                    </div>
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link"><i className="fas fa-user-cog"></i></a>

                        <div className="navbar-dropdown is-right">
                            <a className="navbar-item">Stuff</a>
                            <a className="navbar-item">Jobs</a>
                            <a className="navbar-item">Contact</a>
                            <hr className="navbar-divider" />
                            <a className="navbar-item">Report an issue</a>
                            {currentUser && <a className="navbar-item" onClick={() => logout()}>Log out</a>}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
