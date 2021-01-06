import React from 'react';
import './App.css';
import ProjectListContainer from './components/projects/ProjectListContainer';

function App(): React.ReactElement {
    return (
        <div className="App bg-gray-100 h-screen">
            <ProjectListContainer />
        </div>
    );
}

export default App;
