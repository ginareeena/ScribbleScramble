import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import { Button, Title2, Body } from "./AppCSS";
import { StyledCanvas } from "./AppCSS";
import { PlayArea } from "./AppCSS";
import { CanvasBackground } from "./AppCSS";
import socket from "./Socket";

const WritingCanvas = () => {
  const [textCanvas, setTextCanvas] = useState("");
  const [font, setFont] = useState("arial");
  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 600,
      width: 800,
      isContentEditable: true,
    });

  /*
    Removed 'canvas' as a parameter in the initCanvas function, set add and renderAll
    methods to act on textCanvas. 

    */
  useEffect(() => {
    setTextCanvas(initCanvas());
    socket.on("create new text box", (value) => {
      // bringing back dataUrl and converting to image with src of the data url
      let textImage = new Image();
      textImage.onload = () => {
        return fabric.Image(textImage, 0, 0);
      };
      textImage.src = value;
      console.log("front end heard create new text box");
      console.log('text image string: ', textImage)
    });
    const newText = new fabric.IText("Type here...", {
      left: 150,
      top: 100,
      isContentEditable: true,
      // fontFamily: font,
    });
    // POSSIBLY UNNECESSARY: 
    // textCanvas.add(newText);
    // textCanvas.renderAll();
  }, []);

  const handleTextBtn = () => {
    const newText = new fabric.IText("Type here...", {
      left: 150,
      top: 100,
      isContentEditable: true,
      fontFamily: font,
    });

    textCanvas.add(newText);
    textCanvas.renderAll();
    let dataUrl = textCanvas.toDataURL();
    // sending data url to back end via socket
    socket.emit("add text box", dataUrl);
  };

  const changeFont = (evt) => {
    setFont(evt.target.value);
    textCanvas.getActiveObject().setSelectionStyles({
      fontFamily: font,
    });
    textCanvas.renderAll();
  };

  return (
    <Body>
      <Title2>Writing Canvas !</Title2>
      <Button onClick={() => handleTextBtn()}>Add Text</Button>
      <div id="text-options">
        <label htmlFor="font-family">Font:</label>
        <select id="font-family" value={font} onChange={changeFont}>
          <option value="arial">Arial</option>
          <option value="comic sans ms">Comic Sans MS</option>
          <option value="impact">Impact</option>
          <option value="monaco">Monaco</option>
        </select>
      </div>
      <PlayArea>
        <CanvasBackground>
          <StyledCanvas id="canvas"></StyledCanvas>
        </CanvasBackground>
      </PlayArea>
    </Body>
  );
};

export default WritingCanvas;
