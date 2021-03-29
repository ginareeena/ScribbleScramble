import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import {
  // Button,
  Title2,
  StyledCanvas,
  PlayArea,
  CanvasBackground,
  Palette,
  PngButton,
  PaletteColors,
  SmallBrushBtn,
  MedBrushBtn,
  LargeBrushBtn,
  BrushSizesContainer,
  SelectedColor,
} from "./AppCSS";
import PaletteComp from "./Palette";

//store color in state for everything... i think actually
//

const DrawingCanvas = () => {
  const [canvas, setCanvas] = useState("");
  const [currColor, setColor] = useState("#005E7A");
  const [brushSize, setBrushSize] = useState(11);
  // const [drawing, setDrawing] = useState({});

  console.log("currColor inside drawing canvas--->", currColor);
  console.log("brushSize inside drawing canvas--->", brushSize);

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  // useEffect(()=>{
  //   setBrushSize(value)
  // })

  useEffect(() => {
    if (canvas) {
      updateBrush();
    }
  }, [canvas]);

  useEffect(() => {
    if (currColor) {
      updateBrush();
    }
  }, [currColor]);

  useEffect(() => {
    if (brushSize && canvas.freeDrawingBrush) {
      updateBrush();
    }
  }, [brushSize]);

  // SENDING DRAWINGS OVER SOCKETS:

  // useEffect(() => {
  //   if (!Object.keys(canvas).length) {
  //     setTextCanvas(initCanvas());
  //   } else {
  //     socket.on("draw", (value) => {
  //       console.log("front end heard drawing");
  //       canvas.loadFromJSON(value);
  //       setCanvas(canvas);
  //     });
  //   }
  // }, [canvas]);

  let drawingColorEl = document.getElementById("drawing-color");
  let drawingModeEl = document.getElementById("drawing-mode-selector");

  // maybe need to position with value inside canvas
  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 600,
      width: 800,
      backgroundColor: "white",
      isDrawingMode: true,
    });

  // fabric.Object.prototype.transparentCorners = false;

  function updateBrush() {
    if (canvas) {
      if (!canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush = new fabric[drawingModeEl.value + "Brush"]();
      }
      let brush = canvas.freeDrawingBrush;
      // brush.width = brushSize || parseInt(drawingLineWidthEl.value);
      // brushSizeTextEl.innerHTML = brushSize || drawingLineWidthEl.value;
      brush.width = brushSize || 11;
      // || parseInt(drawingLineWidthEl.value);
      // brushSizeTextEl.innerHTML = Number(brushSize) || 11;
      // drawingLineWidthEl.value = brushSize || 11;
      //parseInt(drawingLineWidthEl.value, 10)
      // brushSizeTextEl.innerHTML = drawingLineWidthEl.value;
      brush.color = currColor || "#005E7A";

      //
    }
  }

  return (
    <div>
      <Title2></Title2>
      <PlayArea>
        <CanvasBackground>
          <StyledCanvas
            id="canvas"
            // onClick={() => updateBrush()}
            // onMouseDown={() => updateBrush()}
          ></StyledCanvas>
        </CanvasBackground>
      </PlayArea>

      <Palette>
        <div id="drawing-mode-options" style={{ marginTop: "10px" }}>
          <label
            htmlFor="drawing-mode-selector"
            style={{ marginRight: "8px", fontWeight: "bold", fontSize: "14px" }}
          >
            Brushes:
          </label>
          <select id="drawing-mode-selector" onChange={() => updateBrush()}>
            <option value="Pencil">Pencil</option>
            <option value="Circle">Circle</option>
            <option value="Pattern">Pattern</option>
          </select>

          {/* <label htmlFor="drawing-line-width">Line width:</label>
          <span id="brushSize">11</span>
          <input
            type="range"
            defaultValue="11"
            min="0"
            max="150"
            id="drawing-line-width"
            onChange={() => setBrushSize(parseInt(drawingLineWidthEl.value))}
            // onChange={() => updateBrush()}
          /> */}

          {/* <label htmlFor="drawing-color">Line color:</label>
          <input
            type="color"
            defaultValue="#005E7A"
            id="drawing-color"
            onChange={() => setColor(drawingColorEl.value)}
          /> */}
        </div>
        <BrushSizesContainer>
          <div style={{ marginTop: "2px", marginRight: "2px" }}>
            {/* Brush Sizes: */}
          </div>
          <SmallBrushBtn
            onClick={() => {
              setBrushSize(5);
            }}
          >
            <img
              src="/images/point.png"
              style={{ width: "30%", marginBottom: "2px" }}
            />
          </SmallBrushBtn>
          <MedBrushBtn
            onClick={() => {
              setBrushSize(15);
            }}
          >
            <img
              src="/images/point.png"
              style={{ width: "90%", marginTop: "2px" }}
            />
          </MedBrushBtn>
          <LargeBrushBtn
            onClick={() => {
              setBrushSize(35);
            }}
          >
            <img src="/images/point.png" style={{ width: "155%" }} />
          </LargeBrushBtn>
        </BrushSizesContainer>
        <SelectedColor>
          <div
            id="selectedColor"
            style={{
              backgroundColor: currColor,
              height: "30px",
              width: "30px",
            }}
          ></div>
        </SelectedColor>
        <PaletteColors>
          <PaletteComp currColor={currColor} setColor={setColor} />
        </PaletteColors>

        <PngButton onClick={() => canvas.clear()}>
          <img
            src="/images/trashBtn.png"
            style={{ width: "100%", marginTop: "2px" }}
          />
        </PngButton>
        <PngButton onClick={() => setColor("white")}>
          <img
            src="/images/eraser3.png"
            style={{ width: "100%", marginTop: "2px" }}
          />
        </PngButton>
      </Palette>

      <div>test!</div>
    </div>
  );
};

export default DrawingCanvas;
