"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useAppSelector } from "@/redux/hooks";

type TShippingInfoError = {
  name: string;
  address: string;
  city: string;
  contact: string;
  country: string;
};

const ShippingInfoForm = forwardRef((props, ref) => {
  // ----------------- redux ----------------
  const user = useAppSelector((state) => state.auth.user);
  const [errors, setErrors] = useState<TShippingInfoError | any>({
    name: "",
    address: "",
    city: "",
    contact: "",
    country: "",
  });

  // Handle form submit
  const handleSubmit = () => {
    const formElement = document.getElementById(
      "shippingForm"
    ) as HTMLFormElement;
    const formData = new FormData(formElement);
    const values = Object.fromEntries(formData.entries());

    // Validate if any field is empty
    const newErrors: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(values)) {
      if (!value) {
        newErrors[key] = `${key} is required`;
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return { success: false, missingFields: Object.keys(newErrors) };
    }

    return { success: true, values };
  };

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="shippingForm" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input
                defaultValue={user?.name}
                id="name"
                name="name"
                placeholder="Masud"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="email"
                defaultValue={user?.email}
                readOnly
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              defaultValue={"Dhaka"}
              id="address"
              name="address"
              placeholder="123 Main St"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                defaultValue={"dhaka"}
                id="city"
                name="city"
                placeholder="Dhaka"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>
            <div>
              <Label htmlFor="contact">Contact No</Label>
              <Input
                defaultValue={"98329834892"}
                id="contact"
                name="contact"
                placeholder="01712345678"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm">{errors.contact}</p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              defaultValue={"Bangladesh"}
              id="country"
              name="country"
              placeholder="Bangladesh"
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country}</p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
});

ShippingInfoForm.displayName = "ShippingInfoForm";

export default ShippingInfoForm;
