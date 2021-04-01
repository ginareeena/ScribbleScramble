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

  return (
    <div>
      <LandingPage>
        <AvatarCarousel />
        <br />
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
