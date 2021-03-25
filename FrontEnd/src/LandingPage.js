import React from "react";

import {
  StartDrawBtn,
  StartWriteBtn,
  LandingButton,
  LandingBtns,
  LandingPage,
  StartDrawImg,
  StartWriteImg,
} from "./AppCSS";

const LandingPageComp = () => {
  return (
    <div>
      <LandingPage>
        <LandingBtns>
          <StartDrawBtn>
            <a href="/draw" style={{ color: "black" }}>
              <StartDrawImg>
                {" "}
                {/* <img src="/images/drawBtn.png" /> */}
              </StartDrawImg>
              <LandingButton>Start Drawing Collab</LandingButton>
            </a>
          </StartDrawBtn>
        </LandingBtns>
        <LandingBtns>
          <StartWriteBtn>
            <a href="/write" style={{ color: "black" }}>
              {" "}
              <StartWriteImg>
                {/* <img src="/images/writeBtn.png" /> */}
              </StartWriteImg>
              <LandingButton>Start Writing Collab</LandingButton>
            </a>
          </StartWriteBtn>
        </LandingBtns>
      </LandingPage>
    </div>
  );
};

export default LandingPageComp;
