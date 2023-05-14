import { FC, SetStateAction, useEffect, useState } from 'react';

import Carousel from 'react-bootstrap/Carousel';
import { useQuery } from 'react-query';

// import { selectProducts } from 'store/selectors';
// import { useAppSelector } from 'hook/useSelector';
import { useAppDispatch } from 'hook/useDispatch';
import { products } from 'services/products';
import { addActiveProducts } from 'store/slices/products/productsSlices';

import './slider.scss';
import { useReactQuery } from 'hook/useQuery';

const Slider: FC = (): JSX.Element => {
  const [index, setIndex] = useState<number>(0);
  // const { products } = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  // const { data, isSuccess } = useQuery({

  //   queryFn: () => products(),
  //   queryKey: ['products', 'boths'],
  // });
  
  const { data, isSuccess } = useReactQuery(products, 'products');

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
