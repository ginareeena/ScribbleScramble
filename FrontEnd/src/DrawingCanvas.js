import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
// import { copiedText } from "fabric/fabric-impl";
import {Button} from './AppCSS'
import { StyledCanvas } from "./AppCSS"
import { PlayArea } from "./AppCSS"

const DrawingCanvas = () => {
  const [canvas, setCanvas] = useState("");

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  // maybe need to position with value inside canvas
  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 600,
      width: 800,
      backgroundColor: "white",
      isDrawingMode: true,
    });

  let selectElement = function (id) {
    return document.getElementById("id");
  };

  // let brushColor;
  // let brushWidth;
  // let clear;

  //   var brush = canvas.freeDrawingBrush=

  // Can save current brush like this:
  // canvas.freeDrawingBrush = brush
  // canvas.freeDrawingBrush = diamondBrush? for ex

  let brush = new fabric.PatternBrush(canvas);

  //   let ctx = brush.getContext("2d");
  //   ctx.fillStyle = "blue";
  //   .width(20);
  //   brush.color = "000FFF";
  //   brush.getPatternSrc = function () {};
  //   brush.strokeStyle = "blue";

  // ADDS SQUARE:
  //   var rect = new fabric.Rect({
  //     width: 200,
  //     height: 200,
  //     // angle: 45,
  //     fill: "blue",
  //   });
  //   canvas.add(rect);

  //   function isDrawing() {
  //     canvas.isDrawingMode();
  //   let context = canvas.getContext("2d");
  //   context.strokeStyle = "blue";
  //   context.lineWidth = 5;

  //   }

  //Brushes->
  // Clear All
  // Eraser
  // Width
  // Color
  // Fun Brushes

  return (
    <div>
      <div id="drawing-mode-options">
        <label htmlFor="drawing-mode-selector">Mode:</label>
        <select id="drawing-mode-selector">
          <option>Pencil</option>
          <option>Circle</option>
          <option>Pattern</option>
        </select>

        <label htmlFor="drawing-line-width">Line width:</label>
        <span className="info">30</span>
        <input
          type="range"
          defaultValue="30"
          min="0"
          max="150"
          id="drawing-line-width"
        />

        <label htmlFor="drawing-color">Line color:</label>
        <input type="color" defaultValue="#005E7A" id="drawing-color" />
      </div>

      <h1>Drawing Canvas !</h1>
      <PlayArea>
      <StyledCanvas
        id="canvas"
      ></StyledCanvas>
      </PlayArea>
      <Button onClick={() => canvas.clear()}>clear</Button>
    </div>
  );
};

export default DrawingCanvas;
