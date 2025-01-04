import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { TCartItem } from "@/types/cartType";
import { TProduct } from "@/types/productType";
import {
  addToCart,
  clearCart,
  setVendor,
} from "@/redux/features/contexts/cartsSlice";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";

export const useAddToCart = () => {
  const dispatch = useDispatch();
  const currentVendor = useAppSelector((state) => state.carts.vendor);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToAdd, setProductToAdd] = useState<TProduct | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  // Handle vendor mismatch modal action
  const handleVendorMismatch = (product: TProduct, quantity: number) => {
    setProductToAdd(product);
    setQuantity(quantity);
    setIsModalOpen(true);
  };

  // Handle user decision on modal
  const handleModalChoice = (action: "replace" | "retain") => {
    if (action === "replace") {
      // Clear cart and add new item from another vendor
      dispatch(clearCart());
      dispatch(setVendor(productToAdd?.vendor || null)); // Set new vendor
      addProductToCart(productToAdd as TProduct, quantity); // Proceed to add product
    }
    setIsModalOpen(false);
  };

  const addProductToCart = (product: TProduct, quantity: number) => {
    const cartItem: TCartItem = {
      _id: product._id,
      name: product.name,
      image: product.images[0],
      quantity,
      price: product.price,
      inventoryCount: product.inventoryCount,
    };

    // Validate the quantity against inventory
    if (quantity <= product.inventoryCount && quantity > 0) {
      dispatch(addToCart(cartItem));
      toast.success(`Added ${quantity} item(s) to cart!`);
      if (!currentVendor) {
        dispatch(setVendor(product.vendor._id)); // Set vendor if no vendor in cart
      }
    } else {
      toast.error(
        product.inventoryCount === 0 ? "Out of stock" : "Insufficient quantity!"
      );
    }
  };

  // handle add to cart
  const handleAddToCart = (product: TProduct, quantity: number) => {
    // If there's a vendor mismatch, prompt user with options
    if (currentVendor && currentVendor !== product?.vendor?._id) {
      handleVendorMismatch(product, quantity);
    } else {
      addProductToCart(product, quantity);
    }
  };

  return { handleAddToCart, isModalOpen, handleModalChoice, setIsModalOpen };
};
