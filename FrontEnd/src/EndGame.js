import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import {
  EndGamePage,
  EndGameContainer,
  PlayAgainBtn,
  Paragraph,
  DownloadBtn,
  EndGameElement,
  EndGameH1,
} from "./AppCSS";
import { fabric } from "fabric";

import { Link } from "react-router-dom";
import socket from "./Socket";
import SaveScribs from './SaveScribs'

const EndGame = (props) => {
  const [canvas, setCanvas] = useState("");
  // const [scribs, setScribs] = useState("")
console.log('scribs in endgame', props)
  //   socket.on("send final image");

  let finalImg = props.scribs
  let scribs = props.scribs

  socket.on("broadcasting final image", (value) => {
    finalImg = value;
    console.log("finalImg---->", finalImg);
  });

  const handleDownloadBtn = () => {
    console.log("clicked download");

  };

  return (
    <EndGamePage>
      <EndGameContainer>
        <EndGameH1>
          <h1>Thanks For Playing!</h1>
        </EndGameH1>
        <EndGameElement>Save your Scribb Scrabb?</EndGameElement>
        <EndGameElement>
          <img
            src="/images/batty.png"
            style={{ width: "300px", margin: "10px" }}
          />
        </EndGameElement>

        <DownloadBtn onClick={() => handleDownloadBtn()}>Download</DownloadBtn>

        <div>{finalImg}</div>
        <EndGameElement>
          <Link to="/" style={{ color: "black", margin: "15px" }}>
            Play Again?
          </Link>{" "}
        </EndGameElement>
      </EndGameContainer>
      <SaveScribs scribs={scribs}/>
    </EndGamePage>
  );
};

export default EndGame;
