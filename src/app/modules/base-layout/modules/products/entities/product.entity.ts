import { IProductItem } from '../interfaces/product-item.interface';

export class ProductEntity {
  private _fields: IProductItem;

  get title(): string {
    return this._fields.title;
  }

  get description(): string {
    return this._fields.description;
  }

  get price(): number {
    return this._fields.price;
  }

  get image(): string {
    return this._fields.image;
  }

  constructor(fields: IProductItem, id: number) {
    this._fields = {
      ...fields,
      id,
    }
  }
}
