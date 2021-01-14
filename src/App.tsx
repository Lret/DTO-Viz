import React from 'react';
import { NodeEditor } from 'flume';
import config from './components/graph/config/flume'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{width: "80vw", height: "80vh"}}>
          <NodeEditor
            portTypes={config.portTypes}
            nodeTypes={config.nodeTypes}
          />
        </div>
        <p>
          Welcome to <code>DTO-Viz</code>.
        </p>
        <a
          className="App-link"
          href="https://burning-vision.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Burning vision
        </a>
      </header>
    </div>
  );
}

export default App;
