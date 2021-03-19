import React, { useState, useEffect } from 'react'
// import logo from "./logo.svg";
// import "./App.css";
import Routes from "./Routes";
// import {BrowserRouter as Router, Link} from 'react-router-dom'
//
// import CanvasComp from "./Canvas.js";
// import WritingCanvas from "./WritingCanvas"
import SocketComp from "./Socket"


function App() {
  const [loadClient, setLoadClient] = useState(true)

  return (
    <div className="App">
      <header className="App-header"></header>
      <div>
        <Routes />
        <button onClick={() => setLoadClient(prevState => !prevState)}>
          Stop Client
        </button>
        {loadClient && <SocketComp /> }
      </div>
    </div>
  );
}

export default App;
