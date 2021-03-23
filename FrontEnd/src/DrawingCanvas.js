import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
// import { copiedText } from "fabric/fabric-impl";
import { Button, Title2 } from "./AppCSS";
import { StyledCanvas } from "./AppCSS";
import { PlayArea } from "./AppCSS";
import { CanvasBackground } from "./AppCSS";

// import { clientSocket } from "./Socket";

// clientSocket.on("connect", () => {
//   console.log("client socket!");
// });

const DrawingCanvas = () => {
  const [canvas, setCanvas] = useState("");

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  // useEffect(() => {
  //   clientSocket.on("connect", () => {
  //     console.log("client socket!");
  //   });
  // });

  let drawingColorEl = document.getElementById("drawing-color");
  let drawingModeEl = document.getElementById("drawing-mode-selector");
  let drawingLineWidthEl = document.getElementById("drawing-line-width");
  let brushSizeText = document.getElementById("brushSize");
  // maybe need to position with value inside canvas
  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 600,
      width: 800,
      backgroundColor: "white",
      isDrawingMode: true,
      // freeDrawingBrush: new fabric.PencilBrush(),
    });

  // canvas.freeDrawingBrush.width = drawingLineWidthEl.value;

  // let getElement = function (id) {
  //   return document.getElementById("id");
  // };

  // var cursor = new fabric.StaticCanvas("cursor");

  // canvas.freeDrawingBrush.width = 20;
  // canvas.freeDrawingBrush.color = "#ff0000";

  // let canvasEl = document.getElementById("canvas");

  // let drawingModeEl = getElement("drawing-mode-selector");
  // let drawingColorEl = getElement("drawing-color");
  // // let drawingLineWidthEl = getElement("drawing-line-width");

  // function updateBrush(canvas){
  //   if(canvas.freeDrawingBrush){
  //     let brush=canvas.freeDrawingBrush
  //     brush.width
  //   }
  // }
  // canvas.freeDrawingBrush = new fabric[drawingModeEl.value + "Brush"](canvas);
  // canvas.freeDrawingBrush = new fabric[drawingModeEl.value + "Brush"](canvas);

  // canvasEl.onclick(updateBrush(canvas));

  fabric.Object.prototype.transparentCorners = false;

  // let pencil = new fabric.PencilBrush(canvas);
  // let brush = canvas.freeDrawingBrush;

  // let brush = canvas.freeDrawingBrush;
  function updateBrush(canvas) {
    // console.log("updateBrush");
    if (!canvas.freeDrawingBrush) {
      // console.log("no free drawing brush");
      canvas.freeDrawingBrush = new fabric[drawingModeEl.value + "Brush"]();
    }
    // console.log("after free drawing brush");

    let brush = canvas.freeDrawingBrush;
    brush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
    brushSizeText.innerHTML = drawingLineWidthEl.value;
    brush.color = drawingColorEl.value;
    // canvas.renderAll();
  }

  // updateBrush(canvas);

  return (
    <div>
      <div id="drawing-mode-options">
        <label htmlFor="drawing-mode-selector">Mode:</label>
        <select id="drawing-mode-selector" onChange={() => updateBrush(canvas)}>
          <option value="Pencil">Pencil</option>
          <option value="Circle">Circle</option>
          <option value="Pattern">Pattern</option>
        </select>

        <label htmlFor="drawing-line-width">Line width:</label>
        <span id="brushSize">11</span>
        <input
          type="range"
          defaultValue="11"
          min="0"
          max="150"
          id="drawing-line-width"
          onChange={() => updateBrush(canvas)}
        />

        <label htmlFor="drawing-color">Line color:</label>
        <input
          type="color"
          defaultValue="#005E7A"
          id="drawing-color"
          onChange={() => updateBrush(canvas)}
        />
      </div>

      <Title2>Drawing Canvas !</Title2>
      <PlayArea>
        <CanvasBackground>
          <StyledCanvas
            id="canvas"
            onClick={() => updateBrush(canvas)}
            onMouseDown={() => updateBrush(canvas)}
          ></StyledCanvas>
        </CanvasBackground>
      </PlayArea>
      <Button onClick={() => canvas.clear()}>clear</Button>
    </div>
  );
};

export default DrawingCanvas;

// Other code i tried
//could be useful for other brushes

//Brushes to make->
// Clear All X
// Width  X
// Color   X
// Eraser
// Fill Tool
// Fun Brushes

// function changeBrush(canvas, value) {
//   canvas.freeDrawingBrush = new fabric[value + "Brush"](canvas);
//   let brush = canvas.freeDrawingBrush;
//   brush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
// }

// let pencil = new fabric.PencilBrush(canvas);
// pencil.color = "blue";

// function changeColor(canvas, value) {
//   if (canvas.freeDrawingBrush) {
//     let brush = canvas.freeDrawingBrush;
//     // console.log("drawingColorEl", drawingColorEl);
//     brush.color = value;
//     brush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
//     console.log("value", value);
//     // console.log("this", this);
//   } else {
//     // canvas.freeDrawingBrush = new fabric[value + "Brush"](canvas);
//     // let brush = canvas.freeDrawingBrush;
//     // brush.color = drawingColorEl.value;
//     // console.log("drawingColorEl", drawingColorEl);
//   }
// }

// let brushColor;
// let brushWidth;
// let clear;

//   var brush = canvas.freeDrawingBrush=

// Can save current brush like this:
// canvas.freeDrawingBrush = brush
// canvas.freeDrawingBrush = diamondBrush? for ex

// let brush = new fabric.PatternBrush(canvas);

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
