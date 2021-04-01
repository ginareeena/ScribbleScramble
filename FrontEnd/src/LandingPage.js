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
  const [room, setRoom] = useState("");

  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    socket.emit("add new player", { username });
    socket.emit("create-room", room);
    socket.emit("join-room", { room, id: socket.id });
    console.log("joining room", room);
    history.push("/combined");
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
              <LandingButton
                type="submit"
                name="private"
                onClick={(evt) => setRoom(evt.target.name)}
              >
                SCRIBBLE MY Private SCRAMBLES
              </LandingButton>
            </StartDrawBtn>
          </LandingBtns>

          <LandingBtns>
            <StartDrawBtn>
              <StartDrawImg />
              <LandingButton
                type="submit"
                name="public"
                onClick={(evt) => setRoom(evt.target.name)}
              >
                SCRAMBLE MY Public SCRIBBLES
              </LandingButton>
            </StartDrawBtn>
          </LandingBtns>

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
