"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, ChevronLeft } from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import useCartStore from "@/store/useCartStore";
import { useCheckout } from "@/store/CheckoutContext";

export default function CheckoutPayment() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, getCartTotal, clearCart } = useCartStore();
  const { shippingAddress } = useCheckout();
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const orderData = {
        items: items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
        shippingAddress: shippingAddress,
        totalAmount: getCartTotal(),
      };

      const response = await axios.post("/api/orders", orderData);

      if (response.status === 201) {
        toast({
          title: "Order placed successfully",
          description: `Your order #${response.data._id} has been placed.`,
        });
        clearCart();
        navigate("/order-confirmation", {
          state: { orderId: response.data._id },
        });
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast({
        title: "Error",
        description:
          "There was a problem placing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Payment
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credit card details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center space-x-4 mb-6">
              <img
                src="https://www.logo.wine/a/logo/Mastercard/Mastercard-Logo.wine.svg"
                alt="Mastercard"
                className="h-12 w-auto"
              />
              <img
                src="https://w7.pngwing.com/pngs/308/426/png-transparent-visa-logo-credit-card-visa-logo-payment-visa-blue-text-trademark-thumbnail.png"
                alt="Visa"
                className="h-12 w-auto"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardInfo.number}
                    onChange={(e) =>
                      setCardInfo({ ...cardInfo, number: e.target.value })
                    }
                    required
                    className="pl-10"
                  />
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expMonth">Expiry Month</Label>
                  <Input
                    id="expMonth"
                    placeholder="MM"
                    value={cardInfo.expMonth}
                    onChange={(e) =>
                      setCardInfo({ ...cardInfo, expMonth: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expYear">Expiry Year</Label>
                  <Input
                    id="expYear"
                    placeholder="YY"
                    value={cardInfo.expYear}
                    onChange={(e) =>
                      setCardInfo({ ...cardInfo, expYear: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardInfo.cvv}
                    onChange={(e) =>
                      setCardInfo({ ...cardInfo, cvv: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </motion.div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-gray-600 text-center">
            By clicking "Pay and Place Order" you agree to make your purchase
            from Global-E as merchant of record for this transaction, subject to
            Global-E's Terms of Sale and Privacy Policy.
          </p>
          <div className="flex justify-between items-center w-full">
            <Button
              variant="outline"
              onClick={() => navigate("/checkout/info")}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Return to Info</span>
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSubmit}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Pay and Place Order"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
