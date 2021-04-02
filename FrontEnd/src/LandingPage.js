import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  StartDrawBtn,
  LandingBtns,
  LandingPage,
  ChooseRoomButton,
  CreateRoomButton,
  HowToPlay,
} from "./AppCSS";
import socket from "./Socket";
import AvatarCarousel from "./AvatarCarousel";

const LandingPageComp = () => {
  const [username, setUsername] = useState("scribbling");
  const [roomToJoin, setRoomToJoin] = useState("");
  const history = useHistory();

  useEffect(() => {
    socket.on("new room created", (name) => {
      console.log("FE on: new room created:", name);
      socket.emit("join room", { username, room: name });
      history.push(`/scramble/${name}`);
    });
  });

  const handleCreate = () => {
    socket.emit("add new player", username);
    console.log("FE: emit create new room");
    socket.emit("create new room", username);
  };

  const handleJoin = () => {
    socket.emit("add new player", username);
    console.log("FE emit add new player");
    if (roomToJoin) {
      socket.emit("join room", { username, room: roomToJoin });
      history.push(`scramble/${roomToJoin}`);
    } else {
      alert("please enter a room name");
    }
  };

  return (
    <div>
      <LandingPage>
        <form>
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
                type="button"
                name="create"
                onClick={handleCreate}
              >
                {/* create new room */}
                Play!
              </ChooseRoomButton>
            </StartDrawBtn>
          </LandingBtns>

          <LandingBtns>
            <input
              style={{ marginTop: "10px", marginBottom: "10px" }}
              type="text"
              name="join-room-name"
              onChange={(evt) => setRoomToJoin(evt.target.value.trim())}
            />
            <StartDrawBtn>
              <CreateRoomButton type="button" name="join" onClick={handleJoin}>
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
          src={process.env.PUBLIC_URL + "/images/batty.png"}
          style={{ width: "36%", marginRight: "20px", marginLeft: "0px" }}
          alt="how to play"
        />
      </HowToPlay>
    </div>
  );
};

export default LandingPageComp;
