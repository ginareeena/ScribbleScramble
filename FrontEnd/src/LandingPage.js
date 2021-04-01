import { useState } from "react";
import socket from "./Socket";
import { useHistory } from "react-router-dom";
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
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!username) {
      alert("please choose a valid username");
    } else {
      socket.emit("add new player", { username, role });
      history.push("/combined");
    }
  };

  //old
  // const [gameReady, setGameReady] = useState(false);

  // const createGame = () => {
  //   socket.emit("create new game", socket.id);
  //   setGameReady(true);
  // };

  // const joinGame = () => {
  //   socket.emit("player two wants to join", socket.id);
  //   setGameReady(false);
  // };

  // const handleClick = () => {
  //   gameReady ? joinGame() : createGame();
  // };

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
        <form onSubmit={handleSubmit}>
          <LandingBtns>
            <h6>Please choose a username:</h6>
            <input
              type="text"
              name="username"
              onChange={(evt) => setUsername(evt.target.value.trim())}
            />
          </LandingBtns>

          <LandingBtns>
            <StartDrawBtn>
              <StartDrawImg />

              <LandingButton type="submit" onClick={() => setRole("draw")}>
                Start Drawing Collab
              </LandingButton>
            </StartDrawBtn>
          </LandingBtns>

          <LandingBtns>
            <StartWriteBtn type="submit" onClick={() => setRole("write")}>
              <StartWriteImg />
              <LandingButton>Start Writing Collab</LandingButton>
            </StartWriteBtn>
          </LandingBtns>
        </form>
      </LandingPage>
    </div>
  );
};

export default LandingPageComp;
