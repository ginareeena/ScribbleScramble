import React from "react";
import { Link } from "react-router-dom";
import {
  EndGamePage,
  EndGameContainer,
  DownloadAhref,
  EndGameElement,
  EndGameH1,
} from "./AppCSS";

const EndGame = (props) => {
  let finalScribs = props.location.state.scribs;
  return (
    <EndGamePage>
      <EndGameContainer>
        <EndGameH1>Thanks For Playing!</EndGameH1>
        <EndGameElement>What a Beautiful Scrib Scrabb!</EndGameElement>
        <EndGameElement>
          <img
            src={finalScribs}
            style={{ width: "480px", margin: "10px" }}
            alt="final canvas drawing"
          />
        </EndGameElement>
        <DownloadAhref href={finalScribs} download="ScribScrab.png">
          Download
        </DownloadAhref>
        <EndGameElement>
          <Link to="/" style={{ color: "black", margin: "15px" }}>
            Play Again?
          </Link>
        </EndGameElement>
      </EndGameContainer>
    </EndGamePage>
  );
};

export default EndGame;
