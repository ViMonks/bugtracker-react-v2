import React from 'react';
import { Toaster } from 'react-hot-toast';
import './App.sass';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProjectListContainer from './components/projects/ProjectListContainer';
import ProjectDetailContainer from './components/projects/ProjectDetailContainer';
import TicketDetailContainer from './components/tickets/TicketDetailContainer';
import TeamListContainer from './components/teams/TeamListContainer';
import ManageTeamController from './components/teams/ManageTeam';
import PrivateRoute from './components/auth/PrivateRoute';
import { AuthProvider } from './components/context/AuthContext';
import Dashboard from './components/auth/Dashboard';
import FirebaseUI from './components/auth/FirebaseUI';
import Testing from './components/API/Testing';
import MyQueryClientProvider from './components/API/MyQueryClientProvider';
import { ReactQueryDevtools } from 'react-query/devtools';
import AcceptTeamInvite from './components/teams/AcceptTeamInvite';
import NavBar from './components/NavBar';
import UserInfo from './components/auth/UserInfo';
import IndexPage from './components/onboarding/IndexPage';

function PrimaryLayout(): React.ReactElement {
    return (
        <MyQueryClientProvider>
            <AuthProvider>
                {/* <ReactQueryDevtools /> */}
                <Switch>
                    <Route path="/teams/:teamSlug/projects/:projectSlug" component={NavBar} />
                    <Route path="/teams/:teamSlug/" component={NavBar} />
                    <Route path="/auth/" component={NavBar} />
                    <Route path="/" component={NavBar} />
                </Switch>
                <div className="App h-screen">
                    <main>
                        <Route exact path="/" component={IndexPage} />
                        <PrivateRoute exact path="/dashboard" component={UserInfo} />
                        <PrivateRoute exact path="/teams" component={TeamListContainer} />
                        <PrivateRoute exact path="/invitation/" component={AcceptTeamInvite} />
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
