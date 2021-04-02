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
              <StartDrawImg />
              <ChooseRoomButton
                type="submit"
                name="private"
                onClick={(evt) => setRoom(evt.target.name)}
              >
                Go to Private Room
              </ChooseRoomButton>
            </StartDrawBtn>
          </LandingBtns>

          <LandingBtns>
            <StartDrawBtn>
              <StartDrawImg />
              <ChooseRoomButton
                type="submit"
                name="public"
                onClick={(evt) => setRoom(evt.target.name)}
              >
                Go to Public Room
              </ChooseRoomButton>
            </StartDrawBtn>
          </LandingBtns>
        </form>
      </LandingPage>
    </div>
  );
};

export default LandingPageComp;
