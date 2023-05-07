import { FC } from 'react';

import Carousel from 'react-bootstrap/Carousel';

import { SliderData } from './config';

import Slide from 'assets/slider/Rectangle 4160.png';

import './slider.scss';

const Slider: FC = (): JSX.Element => {
  return (
    <div className="slider">
      <Carousel>
        {SliderData(Slide).map(({ id, images }) => (
          <Carousel.Item key={id}>
            <img src={images} alt="slide" />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
