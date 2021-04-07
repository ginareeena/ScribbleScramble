import React from "react";
import { Body, Header, Title } from "./AppCSS";
import Footer from "./Footer";
import Routes from "./Routes";

function App() {
  return (
    <div>
      <Body className="App">
        <Header className="App-header">
          <Title>
            <a href="/">
              <img
                style={{ width: "800px" }}
                src="/images/logoBig.png"
                alt="scribble scramble logo"
              />
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
