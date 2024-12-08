import React, { createContext, useContext, useState, ReactNode } from "react";

interface ShippingAddress {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
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
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
  });

  return (
    <CheckoutContext.Provider value={{ shippingAddress, setShippingAddress }}>
      {children}
    </CheckoutContext.Provider>
  );
};
