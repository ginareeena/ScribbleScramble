import React, { useState, useEffect } from 'react'
import styled, {css} from 'styled-components'
import Routes from "./Routes";
import SocketComp from "./Socket"

const Button = styled.button`
background: transparent;
border-radius: 3px;
border: 2px solid palevioletred;
color: palevioletred;
margin: 0 1em;
padding: 0.25em 1em;`

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
      <div>
        Test Button
        <Button>Testing</Button>
      </div>
    </div>
  );
}

export default App;
