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
import { TeamProvider } from './components/context/TeamContextDEPRECATED';
import Dashboard from './components/auth/Dashboard';
import FirebaseUI from './components/auth/FirebaseUI';
import Testing from './components/API/Testing';
import MyQueryClientProvider from './components/API/MyQueryClientProvider';

function PrimaryLayout(): React.ReactElement {
    return (
        <MyQueryClientProvider>
            <AuthProvider>
                <div className="App h-screen">
                    <main>
                        <Route exact path="/dashboard" component={Dashboard} />
                        <PrivateRoute exact path="/teams" component={TeamListContainer} />
                        {/* <TeamProvider>*/} 
                            <div>
                                <PrivateRoute exact path="/testing" component={Testing} />
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
                            </div>
                        {/* </TeamProvider> */}
                        <Route exact path="/auth" component={FirebaseUI} />
                    </main>
                </div>
            </AuthProvider>
        </MyQueryClientProvider>
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
// TODO: remove TeamContextProvider