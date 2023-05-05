import { FC } from "react";

import Carousel from "react-bootstrap/Carousel";

import Slide from "assets/slider/Rectangle 4160.png";

import "./slider.scss";

const Slider: FC = (): JSX.Element => {
  return (
    <div className="slider">
      <Carousel>
        <Carousel.Item>
          <img src={Slide} alt="slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={Slide} alt="slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Slider;
