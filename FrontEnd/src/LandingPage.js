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

const LandingPageComp = () => {
  const [username, setUsername] = useState("");
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (username) {
      socket.emit("add new player", username);
      history.push("/combined");
    } else {
      //MM: may be better option here!
      alert("please choose a valid username");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <LandingPage>
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
              <LandingButton type="submit">Start Drawing Collab</LandingButton>
            </StartDrawBtn>
          </LandingBtns>

          <LandingBtns>
            <StartWriteBtn type="submit">
              <StartWriteImg />
              <LandingButton>Start Writing Collab</LandingButton>
            </StartWriteBtn>
          </LandingBtns>
        </LandingPage>
      </form>
    </div>
  );
};

export default LandingPageComp;
