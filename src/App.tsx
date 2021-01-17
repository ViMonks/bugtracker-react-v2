import React from 'react';
import { Toaster } from 'react-hot-toast';
import './App.sass';
import { BrowserRouter, Route } from 'react-router-dom';
import ProjectListContainer from './components/projects/ProjectListContainer';
import ProjectDetailContainer from './components/projects/ProjectDetailContainer';
import TicketDetailContainer from './components/tickets/TicketDetailContainer';
import TeamListContainer from './components/teams/TeamListContainer';
import ManageTeamController from './components/teams/ManageTeam';
import PrivateRoute from './components/auth/PrivateRoute';
import { AuthProvider } from './components/context/AuthContext';
import Dashboard from './components/auth/Dashboard';
import FirebaseUI from './components/auth/FirebaseUI';

function PrimaryLayout(): React.ReactElement {
    return (
        <AuthProvider>
            <div className="App bg-gray-100 h-screen">
                <main>
                    <Route exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/teams" component={TeamListContainer} />
                    <PrivateRoute
                        exact
                        path="/teams/:teamSlug/projects/:projectSlug"
                        component={ProjectDetailContainer}
                    />
                    <PrivateRoute exact path="/teams/:teamSlug/projects" component={ProjectListContainer} />
                    <PrivateRoute exact path="/teams/:teamSlug/manage" component={ManageTeamController} />
                    <PrivateRoute
                        exact
                        path="/teams/:teamSlug/projects/:projectSlug/tickets/:ticketSlug"
                        component={TicketDetailContainer}
                    />
                    <Route exact path="/auth" component={FirebaseUI} />
                </main>
            </div>
        </AuthProvider>
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
