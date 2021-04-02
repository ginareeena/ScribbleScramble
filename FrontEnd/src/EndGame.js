import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import {
  EndGamePage,
  EndGameContainer,
  PlayAgainBtn,
  Paragraph,
  DownloadBtn,
} from "./AppCSS";
import { fabric } from "fabric";

import { Link } from "react-router-dom";
import socket from "./Socket";

const EndGame = () => {
  const [canvas, setCanvas] = useState("");

  //   socket.on("send final image");
  let finalImg;

  socket.on("broadcasting final image", (value) => {
    finalImg = value;
    console.log("finalImg---->", finalImg);
  });

  const handleDownloadBtn = () => {
    console.log("clicked download");
  };

  return (
    <EndGamePage>
      <div>
        <h1>Thanks For Playing!</h1>
        <Paragraph>Save your Scribb Scrabb?</Paragraph>
        <DownloadBtn onClick={() => handleDownloadBtn()}>Download</DownloadBtn>
        <div>{finalImg}</div>
        {/* <div>
          {" "} */}
        <Link to="/">Play Again?</Link> {/* </div> */}
      </div>

      {/* <PlayAgainBtn>
        {" "}
        <Link to="/">Play Again?</Link>
      </PlayAgainBtn> */}
    </EndGamePage>
  );
};

export default EndGame;
