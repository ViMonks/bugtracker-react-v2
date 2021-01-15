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
import SignUp from './components/auth/Signup';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import { AuthProvider } from './components/context/AuthContext';
import Dashboard from './components/auth/Dashboard'
import ForgotPassword from './components/auth/ForgotPassword'

function PrimaryLayout(): React.ReactElement {
    return (
        <AuthProvider>
            <div className="App bg-gray-100 h-screen">
                <main>
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/forgot-password" component={ForgotPassword} />
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
