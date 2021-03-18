import React, { useState, useEffect } from "react";
import { fabric } from "fabric";

const DrawingCanvas = () => {
  const [canvas, setCanvas] = useState("");

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 600,
      width: 800,
      backgroundColor: "lightgrey",
      isDrawingMode: true,
    });

  //   function isDrawing() {
  //     canvas.isDrawingMode();
  //     let context = canvas.getContext("2d");
  //   }

  let brush = new fabric.PatternBrush(canvas);
  return (
    <div>
      <h1>Drawing Canvas !</h1>
      <canvas
        // onMouseDown={isDrawing}
        // onMouseMove={isDrawing}
        // onMouseUp={isDrawing}

        id="canvas"
      ></canvas>
    </div>
  );
};

export default DrawingCanvas;
