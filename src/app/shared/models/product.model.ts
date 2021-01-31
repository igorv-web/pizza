import { ICategory } from "../interfaces/category.interface";
import { IProduct } from "../interfaces/product.interface";

export class Product implements IProduct {
  constructor(
    public name: string,
    public urlName: string,
    public description: string,
    public price: number,
    public category: ICategory,
    public count: number = 1,
    public image: string,
    public id?: number
  ){}
}