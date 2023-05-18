import { FC, SetStateAction, useEffect, useState } from "react";

import Carousel from "react-bootstrap/Carousel";

import { useReactQuery } from "hook/useQuery";
import { useExpensesData } from "context";
import { getProducts } from "services/products";

import "./slider.scss";

const Slider: FC = (): JSX.Element => {
  
  const [index, setIndex] = useState<number>(0);
  const { setState }: any = useExpensesData();
  const { data, isSuccess } = useReactQuery(() => getProducts(), "products");

  const handleSelect = (selectedIndex: SetStateAction<number>) => {
    setIndex(selectedIndex);
    setState(index + 1);
  };

  useEffect(() => {
    setState(index + 1);
  }, [index]);

  return (
    <div className="slider">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {isSuccess &&
          data?.map(({ id, images }: any) => (
            <Carousel.Item key={id}>
              <img src={images} alt="slide" />
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
};

export default Slider;
