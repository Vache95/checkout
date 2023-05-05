interface Item {
  id: string;
  images: string;
  name: string;
  price: string;
}

export const cartItem = (Item1: string, Item2: string): Item[] => {
  return [
    {
      id: "1",
      images: Item1,
      name: "Nike sneakers",
      price: "€69.00",
    },
    {
      id: "2",
      images: Item2,
      name: "Nike sneakers",
      price: "€69.00",
    },
  ];
};
