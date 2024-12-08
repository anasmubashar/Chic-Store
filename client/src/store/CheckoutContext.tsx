import React, { createContext, useContext, useState, ReactNode } from "react";

interface ShippingAddress {
  street: string;
  city: string;
  province: string;
  phoneNumber: string;
  zipCode: string;
  country: string;
}

interface CheckoutContextType {
  shippingAddress: ShippingAddress;
  setShippingAddress: (address: ShippingAddress) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    street: "",
    city: "",
    province: "",
    phoneNumber: "",
    zipCode: "",
    country: "",
  });

  return (
    <CheckoutContext.Provider value={{ shippingAddress, setShippingAddress }}>
      {children}
    </CheckoutContext.Provider>
  );
};
