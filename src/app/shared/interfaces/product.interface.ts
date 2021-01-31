import { ICategory } from "./category.interface";

export interface IProduct {
  name: string;
  urlName: string;
  description: string;
  price: number;
  category: ICategory;
  count: number;
  image: string;
  id?: number;
}