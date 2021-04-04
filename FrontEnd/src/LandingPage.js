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
  DrawerTitle,
  FAQdiv,
} from "./AppCSS";
import socket from "./Socket";
import AvatarCarousel from "./AvatarCarousel";
import Drawer from "./Drawer";

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
                style={{ marginTop: "5px", marginBottom: "5px" }}
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
        <div>
          <img
            src={process.env.PUBLIC_URL + "/images/batty.png"}
            style={{
              width: "36%",
              marginRight: "20px",
              marginLeft: "0px",
              marginTop: "24px",
              float: "right",
            }}
            alt="batty"
          />
          <h3>FAQ:</h3>

          <Drawer title={"What's a Scribb Scrab?"}>
            <div
              style={{
                width: "345px",
                marginRight: "0px",
                marginTop: "5px",
                marginBottom: "3px",
              }}
            >
              A combination of words and drawings such as:
            </div>
            <div
              style={{
                width: "345px",
                marginRight: "0px",
                marginBottom: "10px",
              }}
            >
              Illustrated poems, concrete poetry etc
            </div>
          </Drawer>

          <div>
            <Drawer title={"How Do I Play?"}>
              <ol style={{ marginTop: "2px", marginBottom: "5px" }}>
                <li>Click "Play" to Create A Room</li>
                <li>
                  Enter A Name and Click "Join Room" to Join A Friend's Room.
                </li>
                <li>Give Your Room Name To Friends You Want To Join.</li>

                <li>Draw Or Write Whatever You Want!</li>
                <li>
                  Click The Scramble Button to Grab and Move Drawings or Text.
                </li>
                <li> When You're Done Click "I'm Done"</li>
                <li>Download Your Scribb Scrabb to Share With Friends!</li>
              </ol>
            </Drawer>
          </div>

          <Drawer title={"What Is Scramble Mode?"}>
            <div style={{ marginTop: "5px" }}>
              <span>Clicking </span>
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Scramble
              </span>{" "}
              <span>
                allows you to grab and move drawings and text around the canvas.
              </span>
              <div>
                <img
                  style={{ width: "400px", marginTop: "15px" }}
                  src="/images/scramblePic.png"
                />
              </div>
              <FAQdiv>
                First draw your drawing then click{" "}
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Scramble
                </span>{" "}
                to enable scrambling
              </FAQdiv>
              <div>
                {" "}
                <img
                  style={{ width: "400px", marginTop: "15px" }}
                  src="/images/demo1.png"
                />
              </div>
              <FAQdiv>
                Click on the line you want to move or drag to select multiple
                lines to move at once{" "}
              </FAQdiv>
              <div>
                {" "}
                <img
                  style={{ width: "400px", marginTop: "15px" }}
                  src="/images/demo2.png"
                />
              </div>
              {/* <div>First draw your drawing </div> */}
              <div>
                {" "}
                <img
                  style={{ width: "400px", marginTop: "15px" }}
                  src="/images/demo3.png"
                />
              </div>
              <FAQdiv>You can also move rotate/edit/scale text</FAQdiv>
              <div>
                {" "}
                <img
                  style={{ width: "400px", marginTop: "15px" }}
                  src="/images/demo9.png"
                />
              </div>
              <FAQdiv>
                When you're ready to draw again click anywhere on the brush
                tools to renable drawing.
              </FAQdiv>
              <div>
                {" "}
                <img
                  style={{ width: "400px", marginTop: "15px" }}
                  src="/images/demo9b.png"
                />
              </div>
              <FAQdiv>
                You can also edit text that's already been placed by clicking{" "}
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Scramble
                </span>{" "}
                or Edit Text
                <div>and then clicking inside the text you want to edit.</div>
              </FAQdiv>
              <div>
                {" "}
                <img
                  style={{ width: "400px", marginTop: "15px" }}
                  src="/images/demo9e.png"
                />
              </div>
            </div>
          </Drawer>
        </div>
      </HowToPlay>
    </div>
  );
};

export default LandingPageComp;
