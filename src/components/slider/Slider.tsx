import { FC, SetStateAction, useEffect, useState } from "react";

import Carousel from "react-bootstrap/Carousel";
import { useQuery } from "react-query";

import { selectProducts } from "store/selectors";
import { useAppSelector } from "hook/useSelector";
import { useAppDispatch } from "hook/useDispatch";

import "./slider.scss";
import { addActiveProducts } from "store/slices/products/productsSlices";

const Slider: FC = (): JSX.Element => {
  const [index, setIndex] = useState<number>(0);
  const { products } = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  const product = async () => {
    const response = await fetch("http://localhost:4000/products", { method: "GET" });
    const data = response.json();
    return data;
  };

  const { data, isSuccess } = useQuery({
    queryFn: () => product(),
    queryKey: ["products", "boths"],
  });

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
