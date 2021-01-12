import React from 'react';
import { Toaster } from 'react-hot-toast'
// import './App.css';
import './App.sass'
import { BrowserRouter, Route } from 'react-router-dom';
import ProjectListContainer from './components/projects/ProjectListContainer';
import ProjectDetailContainer from './components/projects/ProjectDetailContainer';
import TicketDetailContainer from './components/tickets/TicketDetailContainer';

function PrimaryLayout(): React.ReactElement {
    return (
        <div className="App bg-gray-100 h-screen">
            <main>
                <Route exact path="/" component={ProjectListContainer} />
                <Route exact path="/projects/:projectSlug" component={ProjectDetailContainer} />
                <Route exact path="/projects" component={ProjectListContainer} />
                <Route exact path="/projects/:projectSlug/tickets/:ticketSlug" component={TicketDetailContainer} />
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
