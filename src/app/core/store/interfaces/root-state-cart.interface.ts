export interface IRootStateCart {
  products: Array<IRootStateCartProduct>;
}

export interface IRootStateCartProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  count: number;
}
