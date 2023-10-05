export interface IProductItem {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: IProductItemRating;
  title: string;
}

export interface IProductItemRating {
  rate: number;
  count: number;
}
