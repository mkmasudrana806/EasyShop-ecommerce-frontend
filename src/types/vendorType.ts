
// social link
export type TSocialLink = {
  platform: string;
  url: string;
};

// vendor
export type TVendor = {
  _id: string;
  user: string;
  vendor: string;
  shopName: string;
  logo: string;
  description: string;
  address: string;
  contact: string;
  socialLinks: TSocialLink[];
  followers: string[];
  status: "active" | "blocked";
  avgRating: number;
  productCount: number;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
};
