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
  FAQdiv,
  GalleryDiv,
} from "./AppCSS";
import socket from "./Socket";
import AvatarCarousel from "./AvatarCarousel";
import Drawer from "./Drawer";
import Gallery from "./Gallery";

const LandingPageComp = () => {
  const [username, setUsername] = useState("random");
  const [roomToJoin, setRoomToJoin] = useState("");
  const history = useHistory();

  useEffect(() => {
    socket.on("scramble time", (name) => {
      history.push(`/${name}`);
      socket.emit("get room players", name);
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
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
                style={{ marginTop: "5px", marginBottom: "5px" }}
                type="text"
                placeholder="Know your room?"
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
            width: "115px",
            marginTop: "200px",
            marginLeft: "25px",
          }}
          alt="how"
        />
      </LandingPageHeader>
      <HowToPlay>
        <div>
          <Gallery
            style={{ float: "right", marginRight: "40px", marginTop: "38px", marginBottom: ".2rem" }}
          />
          <h3>FAQ:</h3>

          <GalleryDiv>
            <Drawer title={"What's a Scribb Scrabb?"}>
              <div
                style={{
                  width: "500px",
                  
                  marginTop: "5px",
                  marginBottom: "3px",
                  paddingLeft: "1rem"
                }}
              >
                Any combination of words <br /> and
                scribbles:
                
              </div>
              <div
                style={{
                  width: "200px",
                  
                  marginBottom: "10px",
                  paddingLeft: "2rem"
                }}
              >
                - Illustrated poetry <br />
                - Concrete poems, etc.
              </div>
            </Drawer>
            <div>
              <Drawer title={"How Do I Play?"}>
                <ol style={{ marginTop: ".5rem", marginBottom: ".3rem" }}>
                  <li style={{ lineHeight: "1.5rem" }}>Click "Play" to create a room</li>
                  <li>
                    Enter a name and click "Join Room" to join a friend's room.
                  </li>
                  <li style={{ lineHeight: "1.5rem" }}>Give your room mame to friends you want to join.</li>
                  <li>Draw or write whatever you want!</li>
                  <li style={{ lineHeight: "1.5rem" }}>
                    Click the Scramble button to grab and move <br /> drawings or text.
                  </li>
                  <li style={{ lineHeight: "1.5rem" }}> When you're done, click "I'm Done"</li>
                  <li style={{ lineHeight: "1.5rem" }}>Download your Scribb Scrabb to share with friends!</li>
                </ol>
              </Drawer>
            </div>
            <Drawer title={"What Is Scramble Mode?"}>
              <div style={{ marginTop: "6px" }}>
                <span>
                  Clicking <strong>Scramble </strong>
                  allows you to grab and move drawings and text around the
                  canvas.
                </span>
                <div>
                  <img
                    style={{ width: "400px", marginTop: "15px" }}
                    src="/images/scramblePic.png"
                  />
                </div>
                <FAQdiv>
                  First draw your scribble then click
                  <strong> Scramble </strong> <br />
                  to enable scrambling
                </FAQdiv>
                <div>
                  <img
                    style={{ width: "400px", marginTop: "15px" }}
                    src="/images/demo1.png"
                  />
                </div>
                <FAQdiv>
                  Click on the line you want to move or drag to select multiple
                  lines to move at once
                </FAQdiv>
                <div>
                  <img
                    style={{ width: "400px", marginTop: "15px" }}
                    src="/images/demo2.png"
                  />
                </div>
                <div>
                  <img
                    style={{ width: "400px", marginTop: "15px" }}
                    src="/images/demo3.png"
                  />
                </div>
                <FAQdiv>You can also move rotate/edit/scale text</FAQdiv>
                <div>
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
                  <img
                    style={{ width: "400px", marginTop: "15px" }}
                    src="/images/demo9b.png"
                  />
                </div>
                <FAQdiv>
                  You can also edit text that's already been placed by clicking
                  <strong> Scramble </strong>
                  or Edit Text and then clicking inside the text you want to
                  edit.
                </FAQdiv>
                <div>
                  <img
                    style={{ width: "400px", marginTop: "15px" }}
                    src="/images/demo9e.png"
                  />
                </div>
              </div>
            </Drawer>
          </GalleryDiv>
        </div>
      </HowToPlay>
    </div>
  );
};

export default LandingPageComp;
