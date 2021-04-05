import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { fabric } from "fabric";
import {
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
  WriteModeBtn,
  EndGameBtn,
  RoomHeader,
  ChatBoxStyle,
  CanvasAllContainer,
  ChatBoxPlacement,
} from "./AppCSS";
import ChatBox from "./ChatBox";
import PaletteComp from "./Palette";
import socket from "./Socket";

const CombinedCanvas = () => {
  const [canvas, setCanvas] = useState("");
  const [currColor, setColor] = useState("#005E7A");
  const [brushSize, setBrushSize] = useState(11);
  const [font, setFont] = useState("arial");
  const [players, setPlayers] = useState([]);
  const room = useParams().room;
  const history = useHistory();

  useEffect(() => {
    socket.on("all players", (playerList) => {
      setPlayers(playerList);
    });
  });

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  useEffect(() => {
    if (canvas) {
      updateBrush();
      socket.on("load new lines", (value) => {
        canvas.loadFromJSON(value);
        setCanvas(canvas);
      });
    } else if (canvas) {
      socket.on("create new text box", (value) => {
        canvas.loadFromJSON(value);
        setCanvas(canvas);
      });
    }
  }, [canvas]);

  useEffect(() => {
    if (currColor) {
      updateBrush();
      if (canvas) {
        startDrawMode();
      }
    }
  }, [currColor]);

  useEffect(() => {
    if (brushSize && canvas.freeDrawingBrush) {
      updateBrush();
    }
    if (canvas) {
      startDrawMode();
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

  function clearCanvas() {
    if (canvas) {
      canvas.clear();
      canvas.backgroundColor = "white";
    }
  }

  function startDrawMode() {
    canvas.isDrawingMode = true;
  }
  function startWriteMode() {
    canvas.isDrawingMode = false;
  }

  function handleDraworWrite() {
    setCanvas(canvas);
    let canvasJSON = canvas.toJSON();
    if (!canvas.isDrawingMode) {
      socket.emit("add new text box", { room, canvasJSON });
    } else {
      socket.emit("send new lines", { room, canvasJSON });
    }
  }

  const handleTextBtn = () => {
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
    socket.emit("send new lines", { room, canvasJSON });
  };

  let finalDrawing;

  function handleEndGame() {
    setCanvas(canvas);
    finalDrawing = canvas.toDataURL("image/png");
    socket.emit("send final image", finalDrawing);
    history.push("/endgame", { scribs: finalDrawing });
  }

  const changeFont = (evt) => {
    setFont(evt.target.value);
    canvas.getActiveObject().setSelectionStyles({
      fontFamily: font,
    });
    canvas.renderAll();
  };

  return (
    <div style={{ marginBottom: "100px" }}>
      <CanvasAllContainer>
        <RoomHeader>
          <span
            style={{ fontWeight: "bold", color: "white", marginRight: "5px" }}
          >
            Room:
          </span>
          <span style={{ color: "white" }}> {room} </span>
          <span
            style={{ fontWeight: "bold", color: "white", marginRight: "5px" }}
          >
            Players:
          </span>
          <span style={{ color: "white" }}>{players.join(", ")}</span>
        </RoomHeader>
        <PlayArea
          onClick={() => {
            handleDraworWrite();
          }}
        >
          <CanvasBackground>
            <StyledCanvas id="canvas"></StyledCanvas>
            <ChatBoxPlacement>
              <ChatBoxStyle>
                <ChatBox room={room} />
              </ChatBoxStyle>
            </ChatBoxPlacement>
          </CanvasBackground>
        </PlayArea>
        <Palette>
          <ScrambleBtn
            title="Click me to move drawings!"
            onClick={() => startWriteMode()}
          >
            Scramble!
          </ScrambleBtn>
          <WriteModeBtn onClick={() => startWriteMode()}>
            Edit Text
          </WriteModeBtn>
          <BrushSizesContainer>
            <div style={{ marginTop: "2px", marginRight: "2px" }}></div>
            <SmallBrushBtn
              onClick={() => {
                setBrushSize(5);
              }}
            >
              <img
                src="/images/point.png"
                style={{ width: "30%" }}
                alt="choose small paint brush"
              />
            </SmallBrushBtn>
            <MedBrushBtn
              onClick={() => {
                setBrushSize(15);
              }}
            >
              <img
                src="/images/point.png"
                style={{ width: "90%" }}
                alt="choose medium paint brush"
              />
            </MedBrushBtn>
            <LargeBrushBtn
              onClick={() => {
                setBrushSize(35);
              }}
            >
              <img
                src="/images/point.png"
                style={{ height: "90%" }}
                alt="choose large paint brush"
              />
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
          <PngButton onClick={() => clearCanvas()}>
            <img src="/images/trashBtn.png" style={{ width: "100%" }} />
          </PngButton>
          <PngButton onClick={() => setColor("white")}>
            <img
              src="/images/eraser3.png"
              style={{ width: "100%" }}
              alt="eraser"
            />
          </PngButton>
        </Palette>
        <Palette>
          <div id="text-options">
            <span style={{ fontWeight: "bold" }}>Text Palette:</span>
            <label htmlFor="font-family">Font:</label>
            <select
              id="font-family"
              value={font}
              onChange={changeFont}
              style={{ width: "90px", marginLeft: "5px" }}
            >
              <option value="Arial">Arial</option>
              <option value="comic sans ms">Comic Sans MS</option>
              <option value="impact">Impact</option>
              <option value="monaco">Monaco</option>
            </select>
          </div>
          <AddTxtBtn onClick={() => handleTextBtn()}>Add Text</AddTxtBtn>
          <EndGameBtn onClick={() => handleEndGame()}>I'm Done!</EndGameBtn>
        </Palette>
      </CanvasAllContainer>
    </div>
  );
};

export default CombinedCanvas;
