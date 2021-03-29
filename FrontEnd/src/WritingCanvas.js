import React, { useState, useEffect } from "react";
import { fabric } from "fabric";

import {
  Title2,
  Palette,
  AddTxtBtn,
} from "./AppCSS";

import { StyledCanvas } from "./AppCSS";
import { PlayArea } from "./AppCSS";
import { CanvasBackground } from "./AppCSS";
import socket from "./Socket";

const WritingCanvas = () => {
  const initCanvas = () => {
    const newCanvas = new fabric.Canvas("canvas", {
      height: 600,
      width: 800,
      isContentEditable: true,
    });

    return newCanvas;
  };
  const [textCanvas, setTextCanvas] = useState({});
  const [font, setFont] = useState("arial");

  useEffect(() => {
    if (!Object.keys(textCanvas).length) {
      setTextCanvas(initCanvas());
    } else {
      socket.on("create new text box", (value) => {
        console.log("front end heard create new text box");
        textCanvas.loadFromJSON(value);
        setTextCanvas(textCanvas);
      });
    }
  }, [textCanvas]);

  const handleTextBtn = () => {
    const newText = new fabric.IText("Type here...", {
      left: 150,
      top: 100,
      isContentEditable: true,
      fontFamily: font,
    });

    setTextCanvas(textCanvas.add(newText).renderAll());
    let canvasJSON = textCanvas.toJSON();
    socket.emit("add text box", canvasJSON);
  };

  const changeFont = (evt) => {
    setFont(evt.target.value);
    textCanvas.getActiveObject().setSelectionStyles({
      fontFamily: font,
    });
    textCanvas.renderAll();
  };

  return (
    <div>
      <Title2></Title2>

      <PlayArea>
        <CanvasBackground>
          <StyledCanvas id="canvas"></StyledCanvas>
        </CanvasBackground>
      </PlayArea>
      <Palette>
        <div id="text-options" style={{ marginTop: "10px" }}>
          <label htmlFor="font-family">Font:</label>
          <select id="font-family" value={font} onChange={changeFont}>
            <option value="Arial">Arial</option>
            <option value="comic sans ms">Comic Sans MS</option>
            <option value="impact">Impact</option>
            <option value="monaco">Monaco</option>
          </select>
        </div>
        <AddTxtBtn onClick={() => handleTextBtn()}>Add Text</AddTxtBtn>
      </Palette>
    </div>
  );
};

export default WritingCanvas;
