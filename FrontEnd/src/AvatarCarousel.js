import React, { memo } from "react";
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

import icons from "./Icons";

const buttonStyle = {
  background: "transparent",
  border: "none",
};

const AvatarCarousel = memo(() => {
  const iconSet = icons;
  const scramblize = (iconSet) => {
    const max = iconSet.length;
    let randomIconIdx = Math.floor(Math.random() * max);
    return iconSet[randomIconIdx];
  };

  const scrambleIdx = (idx = 0) => {
    return idx++;
  };

  return (
    <CarouselProvider
      naturalSlideWidth={1}
      naturalSlideHeight={1}
      totalSlides={iconSet.length}
      infinite={true}
    >
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
          <img
            src="/images/leftArrow.png"
            style={{ width: "22px" }}
            alt="icon carousel left arrow"
          />
        </ButtonBack>
        <Slider>
          {iconSet.map((icon) => {
            icon = scramblize(iconSet);
            let idx = scrambleIdx(iconSet);
            return (
              <Slide index={idx}>
                <Image src={icon} alt="bird" />
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
          <img
            src="/images/rightArrow.png"
            style={{ width: "22px" }}
            alt="icon carousel right arrow"
          />
        </ButtonNext>
      </AvatarSelector>
    </CarouselProvider>
  );
});
export default AvatarCarousel;
