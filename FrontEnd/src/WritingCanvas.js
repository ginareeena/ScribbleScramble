import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import { Button, Title2, Body, Palette, AddTxtBtn } from "./AppCSS";
import { StyledCanvas } from "./AppCSS";
import { PlayArea } from "./AppCSS";
import { CanvasBackground } from "./AppCSS";
import socket from "./Socket";

const WritingCanvas = () => {
  const initCanvas = () => {
    const newCanvas = new fabric.Canvas("canvas", {
      height: 600,
      width: 800,
      isContentEditable: true,
    
    })
    // newCanvas.setBackgroundColor("rgb(0, 191, 255)", newCanvas.renderAll.bind(newCanvas))
    return newCanvas
  }
  const [textCanvas, setTextCanvas] = useState({});
  const [font, setFont] = useState("arial");
  
  /*
    Removed 'canvas' as a parameter in the initCanvas function, set add and renderAll
    methods to act on textCanvas.


    Thought: we're getting a data url value now from backend (value) —> maybe need to convert
    back to an object for display?

    */
    // useEffect(() => {
    //   console.log('Inside setTextCanvas')
    //   console.log('am i working ? textcanvas', textCanvas)
    //   if (!Object.keys(textCanvas).length){
    //   setTextCanvas(initCanvas());
    //   }
    // }, [textCanvas]);

  useEffect(() => {
    if (!Object.keys(textCanvas).length){
        setTextCanvas(initCanvas());
        }
    else {
    socket.on("create new text box", (value, textBox) => {
      // console.log('useEffect value', value)
      
      
      // bringing back dataUrl and converting to image with src of the data url
      let textImage = new Image();
      // textImage.onload = () => {
      //   return new fabric.Image(textImage, 0, 0);
      // };

      textImage.src = value;
      console.log("front end heard create new text box");
      // console.log('text image string: ', textImage)
      let socketText = textBox.objects[0]
      console.log('useEffect socketText', socketText)
      console.log('textCanvas', textCanvas)
      console.log('textCanvas.add', textCanvas.add)
      
      textCanvas.add.bind(textCanvas, socketText)
      console.log('after binding', textCanvas)
      setTextCanvas(textCanvas)
      //dummy url to see if there is an issue with our dataURL that fabric isn't liking
      // fabric.loadSVGFromURL(textCanvas, function (val) {
       //why is this undefined
        // if (textCanvas){
        //   textCanvas.add(val)
        // }
    })
    }}, [textCanvas]);
    // const newText = new fabric.IText("Type here...", {
    //   left: 150,
    //   top: 100,
    //   isContentEditable: true,
      // fontFamily: font,
    
    // POSSIBLY UNNECESSARY: 
    // if (textCanvas) 
    //   {textCanvas.add(newText);
    //   textCanvas.renderAll();}
  

  const handleTextBtn = () => {
    const newText = new fabric.IText("Type here...", {
      left: 150,
      top: 100,
      isContentEditable: true,
      fontFamily: font,
    });
console.log("I am in handleTextButton!")
    setTextCanvas(textCanvas.add(newText).renderAll())
    // textCanvas.renderAll();
    let dataUrl = textCanvas.toDataURL();
    // sending data url to back end via socket
    socket.emit("add text box", dataUrl, textCanvas)

  const changeFont = (evt) => {
    setFont(evt.target.value);
    textCanvas.getActiveObject().setSelectionStyles({
      fontFamily: font,
    });
    textCanvas.renderAll();
  };

  return (
    <div>
      <Title2></Title2>

      <PlayArea>
        <CanvasBackground>
          <StyledCanvas id="canvas"></StyledCanvas>
        </CanvasBackground>
      </PlayArea>
      <Palette>
        <div id="text-options" style={{ marginTop: "10px" }}>
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
    </div>
  );
};

export default WritingCanvas;
