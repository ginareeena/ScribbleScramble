import React, { useState } from "react";
import Routes from "./Routes";
import socket from "./Socket";
import {
  Button,
  Body,
  Header,
  Title,
  StartDrawBtn,
  StartWriteBtn,
  LandingBtns,
  LandingPage,
  StartDrawImg,
} from "./AppCSS";

import LandingPageComp from "./LandingPage";

function App() {
  const [loadClient, setLoadClient] = useState(true);

  return (
    <Body className="App">
      <Header className="App-header">
        <Title>
          <a href="/">
            <img src="/images/logoSm.png" />
          </a>
        </Title>
      </Header>
      <div>
        <Routes />

        {/* <Button onClick={() => setLoadClient((prevState) => !prevState)}>
          Stop Client
        </Button> */}
        {/* {loadClient && } */}
      </div>
    </Body>
  );
}

export default App;
