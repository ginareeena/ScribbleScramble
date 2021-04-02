import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  ScrambleBtn,
  DrawBtn,
  WriteModeBtn,
  EndGameBtn,
} from "./AppCSS";
import { Link } from "react-router-dom";

import PaletteComp from "./Palette";
import socket from "./Socket";

// Canvas:
// Writing Mode/ Scramble Mode
// DrawingButton

//storing color, brush size, font and canvas in state

const CombinedCanvas = () => {
  const [canvas, setCanvas] = useState("");
  const [currColor, setColor] = useState("#005E7A");
  const [brushSize, setBrushSize] = useState(11);
  const [font, setFont] = useState("arial");
  const params = useParams();
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
    } else if (canvas) {
      socket.on("create new text box", (value) => {
        console.log("front end heard create new text box");
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

  // function toggleDrawingMode() {
  //   canvas.isDrawingMode = !canvas.isDrawingMode;
  // }

  function startDrawMode() {
    canvas.isDrawingMode = true;
  }
  function startWriteMode() {
    canvas.isDrawingMode = false;
  }

  function handleDraworWrite() {
    console.log("handleDraworWrite triggered!");
    setCanvas(canvas);
    let canvasJSON = canvas.toJSON();
    console.log("front end emiting combinedCanvas:", canvasJSON);
    // socket.emit("send new lines", drawingCanvasJSON);
    socket.emit("send new lines", canvasJSON);
  }

  // write a randomizer that randomizers the text functionality

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
    canvas.add(newText).renderAll();
    setCanvas(canvas);
    let canvasJSON = canvas.toJSON();
    console.log("emitting inside handleText");
    socket.emit("send new lines", canvasJSON);
  };

  let finalDrawing;

  function handleEndGame() {
    setCanvas(canvas);

    finalDrawing = canvas.toDataURL();
    // finalDrawing = canvas.discardActiveObject().renderAll().toDataURL("png");
    // finalDrawing = canvas.toSVG();
    //  finalDrawing = canvas.toJSON();
    // finalDrawing = canvas.toJSON({format: 'png'});

    socket.emit("send final image", finalDrawing);
  }

  const changeFont = (evt) => {
    setFont(evt.target.value);
    canvas.getActiveObject().setSelectionStyles({
      fontFamily: font,
    });
    canvas.renderAll();
  };

  return (
    <div>
      <Title2>ROOM: {params.room}</Title2>
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
        <ScrambleBtn onClick={() => startWriteMode()}>Scramble</ScrambleBtn>
        <DrawBtn onClick={() => startDrawMode()}>Draw</DrawBtn>
        <WriteModeBtn onClick={() => startWriteMode()}>Write</WriteModeBtn>

        {/* <div id="drawing-mode-options">
          <label
            htmlFor="drawing-mode-selector"
            style={{ marginRight: "8px", fontWeight: "bold", fontSize: "14px" }}
          >
            Drawing Modes:
          </label>
          <select id="drawing-mode-selector">
            <option value="Drawing">Draw Mode</option>
            <option value="Writing">Write Mode</option>
            <option value="Scramble">Scramble Mode</option>
          </select>
        </div> */}
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
          <img src="/images/trashBtn.png" style={{ width: "100%" }} />
        </PngButton>
        <PngButton onClick={() => setColor("white")}>
          <img src="/images/eraser3.png" style={{ width: "100%" }} />
        </PngButton>
      </Palette>
      <Palette>
        {/* <WriteModeBtn onClick={() => startWriteMode()}>Write Mode</WriteModeBtn> */}
        <div id="text-options">
          <span style={{ fontWeight: "bold" }}>Text Palette:{"  "}</span>

          <label htmlFor="font-family">Font:</label>
          <select id="font-family" value={font} onChange={changeFont}>
            <option value="Arial">Arial</option>
            <option value="comic sans ms">Comic Sans MS</option>
            <option value="impact">Impact</option>
            <option value="monaco">Monaco</option>
          </select>
        </div>
        <AddTxtBtn onClick={() => handleTextBtn()}>Add Text</AddTxtBtn>
        <EndGameBtn onClick={() => handleEndGame()}>
          <Link to="/endgame" style={{ color: "white" }}>
            I'm Done!
          </Link>
        </EndGameBtn>
      </Palette>
    </div>
  );
};

export default CombinedCanvas;
