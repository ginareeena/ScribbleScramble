import React, { useState } from 'react'
import Routes from "./Routes";
import SocketComp from "./Socket"
import {Button, Body, Header, Title} from './AppCSS'

function App() {
  const [loadClient, setLoadClient] = useState(true)


  return (
    <Body className="App">
      <Header className="App-header"><Title>Scribble Scramble</Title></Header>
      <div>
        <Routes />
        <Button onClick={() => setLoadClient(prevState => !prevState)}>
          Stop Client
        </Button>
        {loadClient && <SocketComp /> }
      </div>
    </Body>
  );
}

export default App;
