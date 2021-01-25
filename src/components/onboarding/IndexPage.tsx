import React from 'react';

// asset imports
import team from '../../assets/team.png';
import projects from '../../assets/projects.png';
import collaborate from '../../assets/collaborate.png';
import { Link } from 'react-router-dom';

export default function IndexPage(): React.ReactElement {
    return (
        <div>
            <section className="hero is-medium is-bold is-primary">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title is-1">Bugtracking.io</h1>
                        <h2 className="subtitle is-3">
                            A full-featured, easy-to-use tool for tracking issues across projects and managing teams.
                        </h2>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container has-text-centered is-vcentered">
                    <h1 className="title is-4">
                        Ready to get started? <Link to="/auth/">Sign in!</Link>
                    </h1>
                </div>
            </section>
            <hr />

            <div className="container">
                <section className="section">
                    <div className="container has-text-centered">
                        <h1 className="title is-2">Features</h1>
                    </div>

                    <div className="columns is-vcentered">
                        <div className="column">
                            <figure className="image is-3by2">
                                <img src={team} alt="Teams" />
                            </figure>
                        </div>
                        <div className="column">
                            <div className="container is-vcentered">
                                <h1 className="title is-spaced">Team Management</h1>
                                <h2 className="subtitle">
                                    Create your own team and invite new members, or get invited to join an existing
                                    team. Create multiple projects for your team and assign members as either developers
                                    or project managers.
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="columns is-vcentered">
                        <div className="column">
                            <div className="container is-vcentered">
                                <h1 className="title is-spaced">Project Organization</h1>
                                <h2 className="subtitle">
                                    Submit tickets for each project in your team and assign developers to work on them.
                                    Stay organized with simple filtering for projects and tickets. Manage tickets by
                                    posting comments on their progress and assigning ticket priorities.
                                </h2>
                            </div>
                        </div>
                        <div className="column">
                            <figure className="image is-3by2">
                                <img src={projects} alt="Projects" />
                            </figure>
                        </div>
                    </div>

                    <div className="columns is-vcentered">
                        <div className="column">
                            <figure className="image is-3by2">
                                <img src={collaborate} alt="Collaborate" />
                            </figure>
                        </div>
                        <div className="column">
                            <div className="container is-vcentered">
                                <h1 className="title is-spaced">Collaboration</h1>
                                <h2 className="subtitle">
                                    As your team grows and you take on more projects, promote members of your team to
                                    administrator to help you stay organized. Assign managers to projects and developers
                                    to tickets to help your organization stay on track.
                                </h2>
                            </div>
                        </div>
                    </div>
                </section>
                <hr />
                <section className="section">
                    <div className="container has-text-centered is-vcentered">
                        <h1 className="title is-4">
                            <Link to="/auth/">Sign in</Link> to get started, or read more about how teams, projects, and tickets are organized.
                        </h1>
                    </div>
                </section>
            </div>
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        <strong>Bugtracking.io</strong> by Justin Thurman
                    </p>
                </div>
            </footer>
        </div>
    );
}
