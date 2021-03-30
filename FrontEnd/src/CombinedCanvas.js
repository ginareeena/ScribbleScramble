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
  AddTxtBtn,
} from "./AppCSS";
import PaletteComp from "./Palette";
import socket from "./Socket";

//storing color, brush size, font and canvas in state

const CombinedCanvas = () => {
  const [canvas, setCanvas] = useState("");
  const [currColor, setColor] = useState("#005E7A");
  const [brushSize, setBrushSize] = useState(11);
  const [font, setFont] = useState("arial");

  //creates initial canvas
  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

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

  function toggleDrawingMode() {
    canvas.isDrawingMode = !canvas.isDrawingMode;
  }

  function handleDraworWrite() {
    console.log("handleDraw triggered!");
    setCanvas(canvas);
    let canvasJSON = canvas.toJSON();
    console.log("front end emiting combinedCanvas:", canvasJSON);
    // socket.emit("send new lines", drawingCanvasJSON);
    socket.emit("send new lines", canvasJSON);
  }

  // text logic
  const handleTextBtn = () => {
    //remove this when add logic to room/player
    canvas.isDrawingMode = false;
    const newText = new fabric.IText("Type here...", {
      left: 150,
      top: 100,
      isContentEditable: true,
      fontFamily: font,
    });

    setCanvas(canvas.add(newText).renderAll());
    let canvasJSON = canvas.toJSON();
    socket.emit("add text box", canvasJSON);
  };

  const changeFont = (evt) => {
    setFont(evt.target.value);
    canvas.getActiveObject().setSelectionStyles({
      fontFamily: font,
    });
    canvas.renderAll();
  };

  return (
    <div>
      <Title2></Title2>
      <PlayArea
        onClick={() => {
          handleDraworWrite();
        }}
      >
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
              height: "35px",
              width: "35px",
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
      <Palette>
        <div id="text-options" style={{ marginTop: "10px" }}>
          <span style={{ fontWeight: "bold" }}>Mess/Text Palette:{"  "}</span>
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
      <div>test!</div>
    </div>
  );
};

export default CombinedCanvas;
