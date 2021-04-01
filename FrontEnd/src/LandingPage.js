import { useState } from "react";
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
import socket from "./Socket";
import AvatarCarousel from "./AvatarCarousel";

const LandingPageComp = () => {
  const [username, setUsername] = useState("scribbling");

  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    socket.emit("add new player", { username });
    socket.emit("create-room", "private");
    socket.emit("join-room", { room: "private", id: socket.id });
    console.log("landing page emit: add new player + private room");
    history.push("/combined");
  };

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

  return (
    <div>
      <LandingPage>
        <AvatarCarousel />
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
              <LandingButton type="submit">SCRIBBLE MY SCRAMBLES</LandingButton>
            </StartDrawBtn>
          </LandingBtns>

          {/* <LandingBtns>
            <StartDrawBtn>
              <StartDrawImg />
              <LandingButton type="submit">SCRAMBLE MY SCRIBBLES</LandingButton>
            </StartDrawBtn>
          </LandingBtns> */}

          {/* <LandingBtns>
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
          </LandingBtns> */}
        </form>
      </LandingPage>
    </div>
  );
};

export default LandingPageComp;
