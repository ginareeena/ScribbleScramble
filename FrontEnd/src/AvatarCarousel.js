import React, { useState } from "react";
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
  horse,
  link,
  wasp,
  ski,
} from "./Icons";
import { LandingPage } from "./AppCSS";

const buttonStyle = {
  background: "transparent",
  border: "none",
};

const AvatarCarousel = () => {
  return (
    <CarouselProvider
      naturalSlideWidth={1}
      naturalSlideHeight={1}
      totalSlides={24}
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
          <Slide index={0}>
            <Image src={bird} alt="bird" />
          </Slide>
          <Slide index={1}>
            <Image src={cake} alt="cake" />
          </Slide>
          <Slide index={2}>
            <Image src={catzoom} alt="catzoom" />
          </Slide>
          <Slide index={3}>
            <Image src={cotton} alt="cotton" />
          </Slide>
          <Slide index={4}>
            <Image src={crab} alt="crab" />
          </Slide>
          <Slide index={5}>
            <Image src={deer} alt="deer" />
          </Slide>
          <Slide index={6}>
            <Image src={firefly} alt="firefly" />
          </Slide>
          <Slide index={7}>
            <Image src={fish} alt="fish" />
          </Slide>
          <Slide index={8}>
            <Image src={icecream} alt="icecream" />
          </Slide>
          <Slide index={9}>
            <Image src={pizza} alt="pizza" />
          </Slide>
          <Slide index={10}>
            <Image src={sandwich} alt="sandwich" />
          </Slide>
          <Slide index={11}>
            <Image src={spiderman} alt="spiderman" />
          </Slide>
          <Slide index={12}>
            <Image src={storm} alt="storm" />
          </Slide>
          <Slide index={13}>
            <Image src={taxi} alt="taxi" />
          </Slide>
          <Slide index={14}>
            <Image src={tomato} alt="tomato" />
          </Slide>
          <Slide index={15}>
            <Image src={violin} alt="violin" />
          </Slide>
          <Slide index={16}>
            <Image src={whale} alt="whale" />
          </Slide>
          <Slide index={17}>
            <Image src={beet} alt="beet" />
          </Slide>
          <Slide index={18}>
            <Image src={cat} alt="cat" />
          </Slide>
          <Slide index={19}>
            <Image src={coffee} alt="coffee" />
          </Slide>
          <Slide index={20}>
            <Image src={horse} alt="horse" />
          </Slide>
          <Slide index={21}>
            <Image src={link} alt="link" />
          </Slide>
          <Slide index={22}>
            <Image src={wasp} alt="wasp" />
          </Slide>
          <Slide index={23}>
            <Image src={ski} alt="ski" />
          </Slide>
        </Slider>

        {/* beet, cat, coffee, creature, horse, link, wasp, ski, */}
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
