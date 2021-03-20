import React, { useState, useEffect } from 'react'
import Routes from "./Routes";
import SocketComp from "./Socket"
import {Button} from './AppCSS'

function App() {
  const [loadClient, setLoadClient] = useState(true)


  return (
    <div className="App">
      <header className="App-header"></header>
      <div>
        <Routes />
        <Button onClick={() => setLoadClient(prevState => !prevState)}>
          Stop Client
        </Button>
        {loadClient && <SocketComp /> }
      </div>
    </div>
  );
}

export default App;
