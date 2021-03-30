import { useState } from "react";
// import {useHistory} from 'react-router-dom'
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
  // const history = useHistory()

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (username) {
      socket.emit("add new player", username);
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
              <a href="/draw" style={{ color: "black" }}>
                <StartDrawImg />
                <LandingButton type="submit">
                  Start Drawing Collab
                </LandingButton>
              </a>
            </StartDrawBtn>
          </LandingBtns>

          <LandingBtns>
            <StartWriteBtn type="submit">
              <a href="/write" style={{ color: "black" }}>
                <StartWriteImg />
                <LandingButton>Start Writing Collab</LandingButton>
              </a>
            </StartWriteBtn>
          </LandingBtns>
          {/* <StartDrawBtn>
          <a href="/combined" style={{ color: "black" }}>
            <StartDrawImg />
            <LandingButton>Combined Canvas</LandingButton>
          </a>
        </StartDrawBtn> */}
        </LandingPage>
      </form>
    </div>
  );
};

export default LandingPageComp;
