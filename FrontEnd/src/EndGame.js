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

  //   function handleEndGame() {
  //     setCanvas(canvas);
  //     let finalDrawing = canvas.toJSON();
  //     socket.emit("send final image", finalDrawing);
  //   }

  const handleDownloadBtn = () => {
    console.log("clicked download");
    //grab image json data from local storage
    //send json data to dataURL method with type jpeg
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
