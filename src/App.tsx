import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import ProjectListContainer from './components/projects/ProjectListContainer';
import ProjectDetailContainer from './components/projects/ProjectDetailContainer';

function PrimaryLayout(): React.ReactElement {
    return (
        <div className="App bg-gray-100 h-screen">
            <main>
                <Route path="/" exact component={ProjectListContainer} />
                <Route path="/projects/:projectSlug" component={ProjectDetailContainer} />
                <Route exact path="/projects" component={ProjectListContainer} />
            </main>
        </div>
    );
}

function App(): React.ReactElement {
    return (
        <BrowserRouter>
            <PrimaryLayout />
        </BrowserRouter>
    );
}

export default App;
