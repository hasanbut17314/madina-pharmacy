import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "@/store/slices/cartSlice";
import { useCreateOrderMutation } from "@/api/OrderApi";
import { AlertCircle, CheckCircle, ShoppingBag } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [createOrder, { isLoading, isSuccess, error }] =
    useCreateOrderMutation();

  const [formData, setFormData] = useState({
    address: "",
    contactNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [orderCreated, setOrderCreated] = useState(false);

  useEffect(() => {
    // Redirect if cart is empty
    if (!cartItems || cartItems.length === 0) {
      navigate("/cart");
    }

    // Redirect to home if order is successfully created
    if (isSuccess && orderCreated) {
      const timer = setTimeout(() => {
        dispatch(clearCart());
        navigate("/");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [cartItems, navigate, isSuccess, orderCreated, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^\d{10,12}$/.test(formData.contactNumber.trim())) {
      newErrors.contactNumber = "Please enter a valid contact number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) return;

    try {
      await createOrder(formData).unwrap();
      setOrderCreated(true);
    } catch (err) {
      console.error("Failed to create order:", err);
    }
  };

  const goBackToCart = () => {
    navigate("/cart");
  };

  if (orderCreated && isSuccess) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardContent className="pt-6 flex flex-col items-center justify-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Your order has been placed and will be processed shortly. You will
              be redirected to the homepage in a moment.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-2xl font-bold">
            Madina Pharmacy - Checkout
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Order Summary</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between mb-2">
                <span>Items ({cartItems?.length || 0}):</span>
                <span>
                  
                  {typeof cartTotal === "number"
                    ? cartTotal.toFixed(2)
                    : "0.00"}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery Fee:</span>
                <span>0.00</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                <span>Total:</span>
                <span className="text-red-600">
                  
                  {typeof cartTotal === "number"
                    ? cartTotal.toFixed(2)
                    : "0.00"}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Delivery Information</h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Enter your full delivery address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  placeholder="Enter your contact number"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className={errors.contactNumber ? "border-red-500" : ""}
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contactNumber}
                  </p>
                )}
              </div>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error.data?.message ||
                  "Failed to place your order. Please try again."}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={goBackToCart} className="w-32">
              Back to Cart
            </Button>
            <Button
              onClick={handleSubmitOrder}
              className="w-48 bg-red-600 hover:bg-red-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Checkout;
