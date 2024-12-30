import { TUser } from "./userType";

// social link
export type TSocialLink = {
  socialName: string;
  socialLink: string;
};

// vendor
export type TVendor = {
  _id: string;
  user: TUser;
  vendor: string;
  shopName: string;
  logo: string;
  description: string;
  address: string;
  contact: string;
  socialLinks: TSocialLink[];
  followers?: string[];
  status: "active" | "blocked";
  avgRating: number;
  productCount: number;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
};
