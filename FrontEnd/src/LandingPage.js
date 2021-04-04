import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  StartDrawBtn,
  LandingBtns,
  LandingPage,
  PublicRoomButton,
  CreateRoomButton,
  HowToPlay,
  LandingPageHeader,
} from "./AppCSS";
import socket from "./Socket";
import AvatarCarousel from "./AvatarCarousel";
import Drawer from "./Drawer";
import Gallery from "./Gallery"

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
      <LandingPageHeader>
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

              <StartDrawBtn>
                <PublicRoomButton
                  type="button"
                  name="create"
                  onClick={handleCreate}
                >
                  Play!
                </PublicRoomButton>
              </StartDrawBtn>

              <input
                style={{ marginTop: "10px", marginBottom: "10px" }}
                type="text"
                name="join-room-name"
                onChange={(evt) => setRoomToJoin(evt.target.value.trim())}
              />
              <StartDrawBtn>
                <CreateRoomButton
                  type="button"
                  name="join"
                  onClick={handleJoin}
                >
                  Join Room
                </CreateRoomButton>
              </StartDrawBtn>
            </LandingBtns>
          </form>
        </LandingPage>{" "}
        <img
          src={"/images/howPlay.png"}
          style={{
            width: "115px", //246 //124
            // marginRight: "20px",
            marginTop: "200px",
            marginLeft: "25px",
          }}
          alt="how"
        />
      </LandingPageHeader>

      <HowToPlay>
        <Drawer />
        <Drawer />
        <div>
          <Gallery />
          <h3>FAQ:</h3>
          <h4>What's a Scribb Scrab?</h4>
          <div style={{ width: "345px", marginRight: "0px" }}>
            A combination of words and drawings such as:
          </div>
          <div style={{ width: "345px", marginRight: "0px" }}>
            Illustrated poems, concrete poetry etc
          </div>

          <div>
            {/* DRAWER 1 Start */}
            <Drawer title={<h4>How Do I Play?</h4>}>
              <ol>
                <li>Click "Play" to Create A Room</li>
                <li>
                  Enter A Name and Click "Join Room" to Join A Friend's Room
                </li>
                <li>Give Your Room Name To Friends You Want To Join</li>
                <li>
                  Select Your Mode:{" "}
                  <span style={{ fontWeight: "bold" }}>Draw</span>,{" "}
                  <span style={{ fontWeight: "bold" }}>Write</span>, or{" "}
                  <span style={{ fontWeight: "bold" }}>Scramble</span>
                </li>
                <li>
                  Draw, Add Text, and Scramble Your Own and Others' Images.
                </li>
                <li> When You're Done Click "I'm Done"</li>
                <li>Download Your Scribb Scrabb to Share with friends!</li>
              </ol>
            </Drawer>
          </div>

          <Drawer title={<h4>What Is Scramble Mode?</h4>}>
            <div>
              Scribble Scramble Has Three Modes:{" "}
              <span style={{ fontWeight: "bold" }}>Draw,</span>{" "}
              <span style={{ fontWeight: "bold" }}>Write</span> or{" "}
              <span style={{ fontWeight: "bold" }}>Scramble!</span>
            </div>

            <ul>
              <li>
                {" "}
                <span style={{ fontWeight: "bold" }}>Draw Mode</span> lets you
                draw
              </li>
              <li>
                <span style={{ fontWeight: "bold" }}> Write Mode</span> lets you
                write + edit text
              </li>
              <li>
                <span style={{ fontWeight: "bold" }}>Scramble Mode</span> lets
                you scramble/move drawings or text!
              </li>
            </ul>
          </Drawer>
          {/* <div>
            Scribble Scramble Has Three Modes:{" "}
            <span style={{ fontWeight: "bold" }}>Draw,</span>{" "}
            <span style={{ fontWeight: "bold" }}>Write</span> or{" "}
            <span style={{ fontWeight: "bold" }}>Scramble!</span>
          </div>

          <ul>
            <li>
              {" "}
              <span style={{ fontWeight: "bold" }}>Draw Mode</span> lets you
              draw
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}> Write Mode</span> lets you
              write + edit text
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>Scramble Mode</span> lets you
              scramble/move drawings or text!
            </li>
          </ul> */}
          {/* DRAWER 2 end */}
        </div>
      </HowToPlay>
    </div>
  );
};

export default LandingPageComp;
