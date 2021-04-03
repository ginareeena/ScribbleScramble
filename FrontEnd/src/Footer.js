import React, { useState } from "react";
import Routes from "./Routes";
import { Body, FooterStyle, Title3, MasterScramblers } from "./AppCSS";
import { cotton, crab, whale, firefly, cat, creature } from "./Icons";

function Footer() {
  return (
    <div>
      <FooterStyle>
        <MasterScramblers>
          <a href="https://www.linkedin.com/in/meghan-mcfarland/">
            <img src={crab} style={{ width: "120px" }} />
          </a>
          <Title3>Meghan McFarland</Title3>
        </MasterScramblers>
        <MasterScramblers>
          <a href="https://www.linkedin.com/in/studiosok/">
            <img src={creature} style={{ width: "120px" }} />
          </a>
          <Title3>Kristen Studioso</Title3>
        </MasterScramblers>
        <MasterScramblers>
          <a href="https://www.linkedin.com/in/ginamoffit/">
            <img src={cat} style={{ width: "120px" }} />
          </a>
          <Title3>Gina Moffit</Title3>
        </MasterScramblers>
        <MasterScramblers>
          <a href="https://www.linkedin.com/in/kelseygreene17/">
            <img src={firefly} style={{ width: "120px" }} />
          </a>
          <Title3>Kelsey Greene</Title3>
        </MasterScramblers>
        <MasterScramblers>
          <a href="https://github.com/AthenaCapstone/ScribbleScramble">
            <img src="/images/github.png" style={{ width: "120px" }} />
          </a>
          <Title3>Scribble Scramble © 2021</Title3>
        </MasterScramblers>
      </FooterStyle>
    </div>
  );
}

export default Footer;
