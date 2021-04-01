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
} from "./Icons";
import { LandingPage } from "./AppCSS";

const AvatarCarousel = () => {
  return (
    <LandingPage>
      <CarouselProvider
        naturalSlideWidth={1}
        naturalSlideHeight={1}
        totalSlides={17}
        infinite={true}
      >
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
        </Slider>

        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>
    </LandingPage>
  );
};
export default AvatarCarousel;
