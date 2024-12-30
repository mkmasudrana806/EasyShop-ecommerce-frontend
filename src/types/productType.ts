export type TProduct = {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  tags: string[];
  inventoryCount: number;
  discount: number;
  vendor: string;
  flashSale?: boolean;
  flashSalePrice?: number;
  featured: boolean;
  isDeleted: boolean;
};
