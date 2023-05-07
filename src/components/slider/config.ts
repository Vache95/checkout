interface Item {
  id: string;
  images: string;
  code: string;
  price: string;
}

export const SliderData = (Slide: string): Item[] => {
  return [
    {
      id: '1',
      images: Slide,
      code: '1111',
      price: '50',
    },
    {
      id: '2',
      images: Slide,
      code: '2222',
      price: '50',
    },
    {
      id: '3',
      images: Slide,
      code: '2222',
      price: '50',
    },
  ];
};
