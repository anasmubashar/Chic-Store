import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutShipping() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [shippingMethod, setShippingMethod] = useState("standard");

  const handleContinue = () => {
    navigate("/checkout/payment");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shipping Method</h1>

      <div className="space-y-6">
        <div className="border rounded-md p-4">
          <h2 className="font-semibold mb-2">Express Courier (Air)</h2>
          <p className="text-sm text-gray-600">3 to 4 Business Days</p>
          <p className="text-green-800 font-semibold mt-2">Free</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Expected Date:</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              "Monday, August 14",
              "Wednesday, August 16",
              "Tuesday, August 22",
              "Friday, August 25",
            ].map((date) => (
              <label
                key={date}
                className={`border rounded-md p-3 flex items-center cursor-pointer ${
                  selectedDate === date ? "border-green-800" : ""
                }`}
              >
                <input
                  type="radio"
                  name="deliveryDate"
                  value={date}
                  checked={selectedDate === date}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="mr-2"
                />
                {date}
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Guaranteed By:</h3>
          <div className="space-y-2">
            {[
              {
                id: "standard",
                label: "Wednesday, August 11th By 8 PM",
                price: 24.0,
              },
              {
                id: "express",
                label: "Wednesday, August 11th By Noon",
                price: 24.0,
              },
            ].map((option) => (
              <label
                key={option.id}
                className={`border rounded-md p-3 flex items-center justify-between cursor-pointer ${
                  shippingMethod === option.id ? "border-green-800" : ""
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="shippingMethod"
                    value={option.id}
                    checked={shippingMethod === option.id}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="mr-2"
                  />
                  {option.label}
                </div>
                <span>${option.price.toFixed(2)}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => navigate("/checkout/info")}
            className="text-green-800 hover:underline"
          >
            Return to information
          </button>
          <button
            onClick={handleContinue}
            className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Continue to payment
          </button>
        </div>
      </div>
    </div>
  );
}
