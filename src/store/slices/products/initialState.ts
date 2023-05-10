import Slide from "assets/slider/Rectangle 4160.png";

type ProdutsItem = {
  id: string;
  images: string;
  code: string;
  price: string;
  name: string;
  count: number | string;
};
type InformationData = {
  address: string;
  apartment: string;
  checkbox: boolean | string;
  city: string;
  code: string;
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
};
interface Products {
  products: ProdutsItem[];
  activeProducts: number | undefined | null | string;
  cart: ProdutsItem[];
  information: InformationData;
}

export const initialState: Products = {
  products: [
    {
      id: "1",
      images: Slide,
      code: "1111",
      price: "€69",
      name: "Nike sneakers",
      count: "",
    },
    {
      id: "2",
      images: Slide,
      code: "2222",
      price: "€79",
      name: "Puma sneakers",
      count: "",
    },
    {
      id: "3",
      images: Slide,
      code: "2222",
      price: "€29",
      name: "Adidas sneakers",
      count: "",
    },
  ],
  activeProducts: "",
  cart: [],
  information: {
    address: "",
    apartment: "",
    checkbox: "",
    city: "",
    code: "",
    country: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  },
};
