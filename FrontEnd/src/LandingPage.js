import React from "react";
import socket from "./Socket";
import {
  StartDrawBtn,
  StartWriteBtn,
  LandingButton,
  LandingBtns,
  LandingPage,
  StartDrawImg,
  StartWriteImg,
} from "./AppCSS";

const LandingPageComp = () => {
  const chooseDraw = () => {
    console.log("emitting: player chose to draw");
    socket.emit("player chose to draw", socket.username);
  };

  const chooseWrite = () => {
    console.log("emitting: player chose to write");
    socket.emit("player chose to write", socket.username);
  };

  return (
    <div>
      <LandingPage>
        <LandingBtns>
          <StartDrawBtn onClick={chooseDraw}>
            <a href="/connecting" style={{ color: "black" }}>
              <StartDrawImg />
              <LandingButton>Start Drawing Collab</LandingButton>
            </a>
          </StartDrawBtn>
        </LandingBtns>
        <LandingBtns>
          <StartWriteBtn onClick={chooseWrite}>
            <a href="/connecting" style={{ color: "black" }}>
              <StartWriteImg />
              <LandingButton>Start Writing Collab</LandingButton>
            </a>
          </StartWriteBtn>
        </LandingBtns>
      </LandingPage>
    </div>
  );
};

export default LandingPageComp;
