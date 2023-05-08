import { FC, SetStateAction, useEffect, useState } from "react";

import Carousel from "react-bootstrap/Carousel";

import { selectProducts } from "store/selectors";
import { useAppSelector } from "hook/useSelector";
import { useAppDispatch } from "hook/useDispatch";

import "./slider.scss";
import { addActiveProducts } from "store/slices/products/productsSlices";

const Slider: FC = (): JSX.Element => {
  const [index, setIndex] = useState<number>(0);
  const { products } = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  const handleSelect = (selectedIndex: SetStateAction<number>) => {
    setIndex(selectedIndex);
    dispatch(addActiveProducts(index));
  };
  useEffect(() => {
    dispatch(addActiveProducts(index));
  }, [dispatch, index]);

  return (
    <div className="slider">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {products.map(({ id, images }) => (
          <Carousel.Item key={id}>
            <img src={images} alt="slide" />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
