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
        <AvatarCarousel />
        <LandingBtns>
          <h6>Please choose a username:</h6>
          <input
            type="text"
            name="username"
            onChange={(evt) => setUsername(evt.target.value.trim())}
          />
        </LandingBtns>

        <LandingBtns>
          <h6>create a room</h6>
          <StartDrawBtn>
            <StartDrawImg />
            <LandingButton type="button" onClick={handleCreate}>
              SCRIBBLE MY SCRAMBLES
            </LandingButton>
          </StartDrawBtn>
        </LandingBtns>

        <LandingBtns>
          <h6>have a room name?</h6>
          <input
            type="text"
            name="join-a-room"
            onChange={(evt) => setRoomToJoin(evt.target.value.trim())}
          />
          <StartDrawBtn>
            <StartDrawImg />
            <LandingButton type="button" onClick={handleJoin}>
              MY SCRAMBLES ARE SCRIBBLED
            </LandingButton>
          </StartDrawBtn>
        </LandingBtns>
      </LandingPage>
    </div>
  );
};

export default LandingPageComp;
