import React, { useEffect } from "react";
import { FooterStyle, Title3, MasterScramblers } from "./AppCSS";
import {
  cotton,
  crab,
  whale,
  firefly,
  cat,
  creature,
  cake,
  storm,
  beet,
  wasp,
  flower,
  unicorn,
  watermelon,
  egg,
} from "./Icons";

function Footer() {
  const krIcons = [creature, storm];
  const mIcons = [crab, wasp, whale, creature, cotton]
  const gIcons = [cat, whale, watermelon, egg, unicorn];
  const keIcons = [firefly, flower, wasp];
  const generalIcons = [
    cotton,
    crab,
    whale,
    firefly,
    cat,
    creature,
    cake,
    storm,
    beet,
  ];

  const scramblize = (iconSet) => {
    const max = iconSet.length;
    let randomIconIdx = Math.floor(Math.random() * max);
    return iconSet[randomIconIdx];
  };

  useEffect((iconSet) => {
    scramblize((iconSet = generalIcons));
  }, []);

  return (
    <div>
      <FooterStyle>
        <MasterScramblers>
          <a href="https://www.linkedin.com/in/meghan-mcfarland/">
            <img
              src={scramblize(mIcons)}
              style={{ width: "120px", borderRadius: "50%" }}
              alt="developer icon: meghan mcfarland"
            />
          </a>
          <Title3>Meghan McFarland</Title3>
        </MasterScramblers>
        <MasterScramblers>
          <a href="https://www.linkedin.com/in/studiosok/">
            <img
              src={scramblize(krIcons)}
              style={{ width: "120px", borderRadius: "50%" }}
              alt="developer icon: Kristen Studioso"
            />
          </a>
          <Title3>Kristen Studioso</Title3>
        </MasterScramblers>
        <MasterScramblers>
          <a href="https://www.linkedin.com/in/ginamoffit/">
            <img
              src={scramblize(gIcons)}
              style={{ width: "120px", borderRadius: "50%" }}
              alt="developer icon: Gina Moffitt"
            />
          </a>
          <Title3>Gina Moffit</Title3>
        </MasterScramblers>
        <MasterScramblers>
          <a href="https://www.linkedin.com/in/kelseygreene17/">
            <img
              src={scramblize(keIcons)}
              style={{ width: "120px", borderRadius: "50%" }}
              alt="developer icon: Kelsey Greene"
            />
          </a>
          <Title3>Kelsey Greene</Title3>
        </MasterScramblers>
        <MasterScramblers>
          <a href="https://github.com/AthenaCapstone/ScribbleScramble">
            <img
              src="/images/github.png"
              style={{ width: "120px" }}
              alt="github repository"
            />
          </a>
          <Title3>Scribble Scramble © 2021</Title3>
        </MasterScramblers>
      </FooterStyle>
    </div>
  );
}

export default Footer;
