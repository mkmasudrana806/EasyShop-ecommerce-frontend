import { TProduct } from "./productType";
import { TUser } from "./userType";
import { TVendor } from "./vendorType";

export type TReview = {
  _id: string;
  user: TUser;
  product: TProduct;
  vendor: TVendor;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
};
