import React from "react";
import Routes from "./Routes";
import { Body, Header, Title } from "./AppCSS";
import Footer from "./Footer";

function App() {
  return (
    <div>
      <Body className="App">
        <Header className="App-header">
          <Title>
            <a href="/">
              <img src="/images/logoSm.png" alt="scribble scramble logo" />
            </a>
          </Title>
        </Header>
        <div>
          <Routes />
        </div>
        <Footer />
      </Body>
    </div>
  );
}

export default App;
