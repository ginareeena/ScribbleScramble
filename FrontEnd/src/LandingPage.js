import { useState } from "react";
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
  const [gameReady, setGameReady] = useState(false);

  const createGame = () => {
    socket.emit("create new game", socket.id);
    setGameReady(true);
  };

  const joinGame = () => {
    socket.emit("player two wants to join", socket.id);
    setGameReady(false);
  };

  const handleClick = () => {
    gameReady ? joinGame() : createGame();
  };

  // const chooseDraw = () => {
  //   console.log("emitting: player chose to draw");
  //   socket.emit("player chose to draw", socket.username);
  // };

  // const chooseWrite = () => {
  //   console.log("emitting: player chose to write");
  //   socket.emit("player chose to write", socket.username);
  // };

  return (
    <div>
      <LandingPage>
        <LandingBtns>
          <StartDrawBtn onClick={handleClick}>
            <a href="/draw" style={{ color: "black" }}>
              <StartDrawImg />
              <LandingButton>Start Drawing Collab</LandingButton>
            </a>
          </StartDrawBtn>
        </LandingBtns>
        <LandingBtns>
          <StartWriteBtn onClick={handleClick}>
            <a href="/write" style={{ color: "black" }}>
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
