import React from 'react';
import { Toaster } from 'react-hot-toast';
// import './App.css';
import './App.sass';
import { BrowserRouter, Route } from 'react-router-dom';
import ProjectListContainer from './components/projects/ProjectListContainer';
import ProjectDetailContainer from './components/projects/ProjectDetailContainer';
import TicketDetailContainer from './components/tickets/TicketDetailContainer';
import TeamListContainer from './components/teams/TeamListContainer';
import ManageTeamController from './components/teams/ManageTeam';

function PrimaryLayout(): React.ReactElement {
    return (
        <div className="App bg-gray-100 h-screen">
            <main>
                <Route exact path="/" component={TeamListContainer} />
                <Route exact path="/teams/:teamSlug/projects/:projectSlug" component={ProjectDetailContainer} />
                <Route exact path="/teams/:teamSlug/projects">
                    <ProjectListContainer />
                </Route>
                <Route exact path="/teams/:teamSlug/manage" component={ManageTeamController} />
                <Route
                    exact
                    path="/teams/:teamSlug/projects/:projectSlug/tickets/:ticketSlug"
                    component={TicketDetailContainer}
                />
            </main>
        </div>
    );
}

function App(): React.ReactElement {
    return (
        <BrowserRouter>
            <PrimaryLayout />
            <Toaster />
        </BrowserRouter>
    );
}

export default App;
