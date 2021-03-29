import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import {
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
import socket from "./Socket";

//storing color, brush size and canvas in state

const DrawingCanvas = () => {
  const [canvas, setCanvas] = useState("");
  const [currColor, setColor] = useState("#005E7A");
  const [brushSize, setBrushSize] = useState(11);

  //creates initial canvas
  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  // when canvas is first created we initialize the brush
  // if canvas changes we convert it to JSON
  //and send that over sockets
  // however UseEffect does not know when we're drawing
  // because we don't have need a change handler to draw so we don't set the canvas
  // when we do, so the canvas in state doesn't update

  useEffect(() => {
    if (canvas) {
      updateBrush();

      socket.on("load new lines", (value) => {
        console.log("drawing received in front end: ", value);
        canvas.loadFromJSON(value);
        setCanvas(canvas);
      });
    }
  }, [canvas]);

  useEffect(() => {
    console.log("canvas is updating", canvas);
    if (canvas) {
      let drawingCanvasJSON = canvas.toJSON();
      console.log("front end emiting drawingtoJSON:", drawingCanvasJSON);
      socket.emit("send new lines", drawingCanvasJSON);
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

  let drawingModeEl = document.getElementById("drawing-mode-selector");

  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      height: 600,
      width: 800,
      backgroundColor: "white",
      isDrawingMode: true,
    });

  function updateBrush() {
    if (canvas) {
      if (!canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush = new fabric[drawingModeEl.value + "Brush"]();
      }
      let brush = canvas.freeDrawingBrush;
      brush.width = brushSize || 11;
      brush.color = currColor || "#005E7A";
      setCanvas(canvas);
    }
  }

  return (
    <div>
      <Title2></Title2>
      <PlayArea>
        <CanvasBackground>
          <StyledCanvas id="canvas"></StyledCanvas>
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
            <img src="/images/point.png" style={{ width: "30%" }} />
          </SmallBrushBtn>
          <MedBrushBtn
            onClick={() => {
              setBrushSize(15);
            }}
          >
            <img src="/images/point.png" style={{ width: "90%" }} />
          </MedBrushBtn>
          <LargeBrushBtn
            onClick={() => {
              setBrushSize(35);
            }}
          >
            <img src="/images/point.png" style={{ height: "90%" }} />
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
