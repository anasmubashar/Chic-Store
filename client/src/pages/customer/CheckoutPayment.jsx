import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPayment() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission
    console.log("Processing payment...");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>

      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          <img src="/amex.svg" alt="American Express" className="h-8" />
          <img src="/visa.svg" alt="Visa" className="h-8" />
          <img src="/mastercard.svg" alt="Mastercard" className="h-8" />
          <img src="/paypal.svg" alt="PayPal" className="h-8" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <input
            type="text"
            value={cardInfo.number}
            onChange={(e) =>
              setCardInfo({ ...cardInfo, number: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={cardInfo.expMonth}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, expMonth: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="MM"
                required
              />
              <input
                type="text"
                value={cardInfo.expYear}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, expYear: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="YY"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Security Code
            </label>
            <input
              type="text"
              value={cardInfo.cvv}
              onChange={(e) =>
                setCardInfo({ ...cardInfo, cvv: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="CVV"
              required
            />
          </div>
        </div>

        <div className="border-t pt-6">
          <p className="text-sm text-gray-600">
            By clicking "Pay and Place Order" you agree to make your purchase
            from Global-E as merchant of record for this transaction, subject to
            Global-E's Terms of Sale and Privacy Policy.
          </p>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate("/checkout/shipping")}
            className="text-green-800 hover:underline"
          >
            Return to shipping
          </button>
          <button
            type="submit"
            className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Pay and Place Order
          </button>
        </div>
      </form>
    </div>
  );
}
