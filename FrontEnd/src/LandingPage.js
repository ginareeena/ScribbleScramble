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

const LandingPageComp = () => {
  const [username, setUsername] = useState("random");
  const [roomToJoin, setRoomToJoin] = useState("");
  const history = useHistory();

  useEffect(() => {
    socket.on("scramble time", (name) => {
      history.push(`scramble/${name}`);
      return () => socket.off("scramble time");
    });
  }, [history]);

  const startScribbling = (evt) => {
    evt.preventDefault();
    socket.emit("scribble time", {
      username,
      room: roomToJoin,
    });
  };

  return (
    <div>
      <LandingPageHeader>
        <LandingPage>
          <div>
            <LandingBtns>
              <input
                style={{ marginTop: "10px", marginBottom: "10px" }}
                type="text"
                name="username"
                placeholder="Enter a username"
                minLength={1}
                maxLength={30}
                autoComplete="false"
                onChange={(evt) => {
                  setUsername(evt.target.value.trim());
                }}
              />

              <AvatarCarousel />

              <StartDrawBtn>
                <PublicRoomButton
                  type="button"
                  name="create"
                  onClick={(evt) => startScribbling(evt)}
                >
                  Play!
                </PublicRoomButton>
              </StartDrawBtn>

              <input
                style={{ marginTop: "10px", marginBottom: "10px" }}
                type="text"
                onChange={(evt) => setRoomToJoin(evt.target.value)}
              />
              <StartDrawBtn>
                <CreateRoomButton
                  type="button"
                  name="join"
                  onClick={(evt) => startScribbling(evt)}
                >
                  Join Room
                </CreateRoomButton>
              </StartDrawBtn>
            </LandingBtns>
          </div>
        </LandingPage>
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
                <li>Download Your Scribb Scrab to Share with friends!</li>
              </ol>
            </Drawer>
          </div>

          <Drawer title={<h4>What Is Scramble Mode?</h4>}>
            <div>
              Scribble Scramble Has Three Modes:
              <span style={{ fontWeight: "bold" }}>Draw,</span>
              <span style={{ fontWeight: "bold" }}>Write</span> or
              <span style={{ fontWeight: "bold" }}>Scramble!</span>
            </div>

            <ul>
              <li>
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
