import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import { Button } from "./AppCSS";

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
    <div>
      <h1>Writing Canvas !</h1>
      <Button onClick={() => handleTextBtn(textCanvas)}>Add Text</Button>
      <canvas
        id="canvas"
        style={{ border: "1px solid black", width: "500px" }}
      ></canvas>
    </div>
  );
};

export default WritingCanvas;
