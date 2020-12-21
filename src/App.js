import React from 'react';
import './App.scss';
import { HashRouter } from 'react-router-dom'

function App(props) {
  return (
    <HashRouter>
      <div className="App">
          {props.children}
      </div>
    </HashRouter>
  );
}

export default App;
