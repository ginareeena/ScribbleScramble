import React from "react";
import { imageSet } from "./ImageIdx";
import "pure-react-carousel/dist/react-carousel.es.css";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
} from "pure-react-carousel";

const Gallery = ({ style }) => {
  const buttonStyle = {
    background: "transparent",
    border: "none",
  };

  const scramblize = (imageSet) => {
    const max = imageSet.length;
    let randomIconIdx = Math.floor(Math.random() * max);
    return imageSet[randomIconIdx];
  };

  return (
    <CarouselProvider
      naturalSlideWidth={1}
      naturalSlideHeight={1}
      totalSlides={imageSet.length}
      infinite={true}
      style={{
        width: "155px",
        height: "116.25",
        position: "relative",
        ...style,
      }}
    >
      <ButtonBack
        style={{
          position: "absolute",
          left: "110%",
          top: "50%",
          transform: "translateY(-50%)",
          ...buttonStyle,
        }}
      >
        <img
          src="/images/GalleryImages/rightArrow.png"
          style={{ width: "22px" }}
        />
      </ButtonBack>
      <Slider>
        {imageSet.map((image) => {
          image = scramblize(imageSet);
          return (
            <Slide key={image.idx}>
              <Image
                src={image.imageURL}
                style={{
                  width: "100%",
                  height: "100%",
                  marginRight: "1rem",
                  marginLeft: "0px",
                  marginTop: "1rem",
                  padding: ".3rem",
                }}
                alt={image.alt}
              />
            </Slide>
          );
        })}
      </Slider>
      <ButtonNext
        style={{
          position: "absolute",
          right: "110%",
          top: "50%",
          transform: "translateY(-50%)",
          ...buttonStyle,
        }}
      >
        <img
          src="/images/GalleryImages/leftArrow.png"
          style={{ width: "22px" }}
        />
      </ButtonNext>
    </CarouselProvider>
  );
};

export default Gallery;
