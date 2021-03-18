import React, { useState, useEffect } from "react";
import { fabric } from "fabric";

const CanvasComp = () => {
  const [canvas, setCanvas] = useState("");

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 800,
      width: 800,
      backgroundColor: "grey",
    });

  return (
    <div>
      <h1>Canvas!</h1>
      <canvas id="canvas"> </canvas>
    </div>
  );
};

export default CanvasComp;
