import { useEffect, useState } from "react";
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

  useEffect(() => {
    socket.on("new room created", (name) => {
      console.log("FE on: new room created:", name);
      socket.emit("join room", { username, room: name });
      history.push(`/scramble/${name}`);
    });
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    socket.emit("add new player", username);
    socket.emit("create new room", username);
  };
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

          <LandingBtns>
            <StartDrawBtn>
              <StartDrawImg />
              <LandingButton type="submit">
                MY SCRAMBLES ARE SCRIBBLED
              </LandingButton>
            </StartDrawBtn>
          </LandingBtns>
        </form>
      </LandingPage>
    </div>
  );
};

export default LandingPageComp;
