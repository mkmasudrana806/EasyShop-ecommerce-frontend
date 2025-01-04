// shipping information
export type TShippingInfo = {
  name: string;
  address: string;
  city: string;
  contact: string;
  country: string;
};

// order interface
type TOrder = {
  vendor: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  shippingInfo: TShippingInfo;
  couponCode: string | null;
};

export default TOrder;
