import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import { Button, Title2, Body } from "./AppCSS";
import { StyledCanvas } from "./AppCSS"
import { PlayArea } from "./AppCSS"
import { CanvasBackground } from "./AppCSS"

const WritingCanvas = () => {
  const [textCanvas, setTextCanvas] = useState("");

  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 600,
      width: 800,
      isContentEditable: true,
    });

  useEffect(() => {
    setTextCanvas(initCanvas());
  }, []);

  const handleTextBtn = (canvas) => {
    const newText = new fabric.IText("Type here...", {
      left: 150,
      top: 100,
      isContentEditable: true,
    });
    canvas.add(newText);
    canvas.renderAll();
  };

  return (
    <Body>
      <Title2>Writing Canvas !</Title2>
      <Button onClick={() => handleTextBtn(textCanvas)}>Add Text</Button>
      <div id="text-options">
        <label htmlFor="font-selector">Font:</label>
        <select id="font-selector">
          <option>Comic Sans</option>
          <option>Literally anything but Comic Sans</option>
        </select>
      </div>
      <PlayArea>
      <CanvasBackground>
      <StyledCanvas
        id="canvas"
      ></StyledCanvas>
      </CanvasBackground>
      </PlayArea>
    </Body>
  );
};

export default WritingCanvas;
