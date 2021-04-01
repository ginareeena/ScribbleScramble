import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import { LandingPage, Paragraph, DownloadBtn } from "./AppCSS";
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
    <LandingPage>
      <h1>Thanks For Playing!</h1>
      <Paragraph>Save your ScribScrab?</Paragraph>
      <DownloadBtn onClick={() => handleDownloadBtn()}>Download</DownloadBtn>
      <Link to="/">Play Again?</Link>
      <div>{finalImg}</div>
    </LandingPage>
  );
};

export default EndGame;
