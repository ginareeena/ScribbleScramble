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
  ChooseRoomButton,
  CreateRoomButton,
  HowToPlay,
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
        <form onSubmit={handleSubmit}>
          <LandingBtns>
            <input
              style={{ marginTop: "10px", marginBottom: "10px" }}
              type="text"
              name="username"
              defaultValue="Enter Name"
              onChange={(evt) => setUsername(evt.target.value.trim())}
            />
            <AvatarCarousel />
          </LandingBtns>
          {/* <AvatarCarouselStyle> */}
          {/* </AvatarCarouselStyle> */}

          <LandingBtns>
            <StartDrawBtn>
              <ChooseRoomButton
                type="submit"
                name="public"
                onClick={(evt) => setRoom(evt.target.name)}
              >
                Play!
              </ChooseRoomButton>
            </StartDrawBtn>
          </LandingBtns>
          <LandingBtns>
            <StartDrawBtn>
              <CreateRoomButton
                type="submit"
                name="private"
                onClick={(evt) => setRoom(evt.target.name)}
              >
                Go to Private Room
              </CreateRoomButton>
            </StartDrawBtn>
          </LandingBtns>
        </form>
      </LandingPage>
      <HowToPlay>
        <HowToPlay>
          <div>
            <h3>FAQ:</h3>
            <h4>What's a Scribb Scrab?</h4>
            <div style={{ width: "345px", marginRight: "0px" }}>
              A combination of words and drawings such as:
            </div>
            <div style={{ width: "345px", marginRight: "0px" }}>
              Illustrated poems, concrete poetry etc
            </div>

            <h4>How do I play?</h4>
            <div>1. Click Play to Join a Public Room</div>
            <div>2. Click Draw Mode to Draw, and Write Mode to Write</div>
            <div>3. Scramble "Mode" lets you Scramble/Move Text/Drawings! </div>
          </div>
        </HowToPlay>
        <img
          src="/images/batty.png"
          style={{ width: "36%", marginRight: "20px", marginLeft: "0px" }}
        />
      </HowToPlay>
    </div>
  );
};

export default LandingPageComp;
