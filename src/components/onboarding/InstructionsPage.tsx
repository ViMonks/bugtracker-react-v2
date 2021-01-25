import React from 'react';
import { Link } from 'react-router-dom';

export default function InstructionsPage(): React.ReactElement {
    return (
        <>
            <section className="section">
                <div className="container">
                    <h1 className="title is-2">How to use bugtracking.io</h1>
                    <h2 className="subtitle">Understanding the organization of teams, projects, and tickets.</h2>
                </div>
            </section>
            <hr />

            <section className="section">
                <div className="container">
                    <h1 className="title is-4">Tickets, projects, and teams</h1>
                    <p className="block">
                        All resources on Bugtracking.io are organized in a top-down structure. In other words, all
                        tickets belong to a project, and all projects belong to a team. Teams represent the highest
                        organizational unit. A team might represent anything from a solo freelance developer to a large
                        company.
                    </p>
                    <p className="block">
                        A single team might have many projects. A project might be a website that your organization is
                        building or a product you would like to launch. Tickets, then, represent single, actionable
                        tasks or issues associated with a project. In the context of developing a website, a ticket
                        might represent a feature request or a bug report.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h1 className="title is-4">Managing members</h1>
                    <p className="block">
                        Each level of organization has its own membership types and permissions. For example, a team
                        might have many members, but only a few administrators. Those team administrators have the
                        ability to invite or remove members from the team, create new team projects, and assign members
                        as project managers.
                    </p>
                    <p className="block">
                        A project has its own members. Members of a team cannot see a project unless they have been
                        added to that project&#39;s members by a team administrator or project manager. Once part of a
                        project, a member may see all tickets associated with the project and comment on those tickets.
                        Only the ticket&#39;s assigned developer (or a team administrator or project manager), however,
                        may edit or close a ticket.
                    </p>
                    <p className="block">
                        This makes it easy for all project members to collaborate on an issue, while ensuring that the
                        ultimate responsibility for a ticket remains with a trusted individual.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h1 className="title is-4">Flexibility</h1>
                    <p className="block">
                        These systems are designed to be flexible enough to accommodate teams of many sizes. Assigning
                        project managers and ticket developers is optional, so a freelance developer, for instance,
                        might not use these organizational features at all.
                    </p>
                    <p className="block">
                        A growing team, on the other hand, might implement them incrementally. A project might start out
                        small, with no assigned manager, but as it grows, a team administrator might decide a manager
                        would be useful to keep things organized. Or they might even decide that more team
                        administrators are needed. Teams, projects, and tickets can all be reorganized in this way as an
                        organization&#39;s needs change.
                    </p>
                </div>
            </section>
            <hr />
            <section className="section">
                <div className="container has-text-centered is-vcentered">
                    <h1 className="title is-4">
                        Ready to get started? <Link to="/auth/">Sign in!</Link>
                    </h1>
                </div>
            </section>
        </>
    );
}
