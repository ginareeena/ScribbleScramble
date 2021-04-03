import React, { useState } from "react";
import {
  EndGamePage,
  EndGameContainer,
  DownloadAhref,
  EndGameElement,
  EndGameH1,
} from "./AppCSS";

import { Link } from "react-router-dom";
import socket from "./Socket";

const EndGame = (props) => {
  const [canvas, setCanvas] = useState("");
  const [scribs, setScribs] = useState("");
  //   socket.on("send final image");

  let finalImg = props.location.state.scribs;
  let finalScribs = props.location.state.scribs;

  socket.on("broadcasting final image", (value) => {
    finalImg = value;
    console.log("finalImg---->", finalImg);
  });

  return (
    <EndGamePage>
      <EndGameContainer>
        <EndGameH1>Thanks For Playing!</EndGameH1>
        <EndGameElement>What a Beautiful Scribb Scrabb!</EndGameElement>
        <EndGameElement>
          <img src={finalScribs} style={{ width: "450px", margin: "10px" }} alt="final canvas drawing" />
        </EndGameElement>
        <DownloadAhref href={finalScribs} download="ScribScrab.png">
          Download
        </DownloadAhref>

        <EndGameElement>
          <Link to="/" style={{ color: "black", margin: "15px" }}>
            Play Again?
          </Link>{" "}
        </EndGameElement>
      </EndGameContainer>
    </EndGamePage>
  );
};

export default EndGame;
