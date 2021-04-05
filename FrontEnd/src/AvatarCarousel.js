import React from "react";
import "pure-react-carousel/dist/react-carousel.es.css";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from "pure-react-carousel";

import { AvatarSelector } from "./AppCSS";

import {
  bird,
  cake,
  catzoom,
  cotton,
  crab,
  deer,
  firefly,
  fish,
  icecream,
  pizza,
  sandwich,
  spiderman,
  storm,
  taxi,
  tomato,
  violin,
  whale,
  beet,
  cat,
  coffee,
  creature,
  flower,
  horse,
  link,
  wasp,
  ski,
  alien,
  unicorn,
  fly,
  egg,
  pika,
  pretzel,
  monster,
  exercise,
  watermelon,
} from "./Icons";

const buttonStyle = {
  background: "transparent",
  border: "none",
};

const AvatarCarousel = () => {
  const iconSet = [
    bird,
    cake,
    catzoom,
    cotton,
    crab,
    deer,
    firefly,
    fish,
    icecream,
    pizza,
    sandwich,
    spiderman,
    storm,
    taxi,
    tomato,
    violin,
    whale,
    horse,
    link,
    wasp,
    ski,
    flower,
    alien,
    beet,
    cat,
    coffee,
    creature,
    unicorn,
    fly,
    egg,
    pika,
    pretzel,
    monster,
    exercise,
    watermelon,
  ];
  const scramblize = (iconSet) => {
    const max = iconSet.length;
    let randomIconIdx = Math.floor(Math.random() * max);
    return iconSet[randomIconIdx];
  };

  const max = iconSet.length;
  
console.log('max', max)
  const scrambleIdx = (idx = 0) => {
    if(idx < max) {
      return idx++;
    } else {
      idx = 1
      return idx
    } 
  };

  return (
    <CarouselProvider
      naturalSlideWidth={1}
      naturalSlideHeight={1}
      totalSlides={35}
      infinite={true}
    >
      {" "}
      {/* <span> */}
      <AvatarSelector>
        <ButtonBack
          style={{
            position: "absolute",
            right: "110%",
            top: "50%",
            transform: "translateY(-50%)",
            ...buttonStyle,
          }}
        >
          <img src="/images/leftArrow.png" style={{ width: "22px" }} />
        </ButtonBack>
        <Slider>
          {iconSet.map((icon) => {
            icon = scramblize(iconSet);
            let idx = 0
            return (
              <Slide key={idx++}>
                <Image src={icon} alt={icon} />
              </Slide>
            );
          })}
        </Slider>
        <ButtonNext
          style={{
            position: "absolute",
            left: "110%",
            top: "50%",
            transform: "translateY(-50%)",
            ...buttonStyle,
          }}
        >
          <img src="/images/rightArrow.png" style={{ width: "22px" }} />
        </ButtonNext>
      </AvatarSelector>
    </CarouselProvider>
  );
};
export default AvatarCarousel;
