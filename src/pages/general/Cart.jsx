import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  updateQuantity,
  removeFromCart,
  setItems,
} from "@/store/slices/cartSlice";
import {
  useIncrementCartItemMutation,
  useDecrementCartItemMutation,
  useRemoveItemFromCartMutation,
  useGetUserCartQuery,
} from "@/api/CartApi";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get cart items from Redux store
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  // RTK Query hook with better destructuring
  const {
    data: cartData,
    refetch,
    isLoading: isCartLoading,
    isSuccess,
    error,
  } = useGetUserCartQuery();

  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState({});
  const [isRemovingItem, setIsRemovingItem] = useState({});

  const [incrementItem, { isLoading: isLoadingIncrement }] =
    useIncrementCartItemMutation();
  const [decrementItem, { isLoading: isLoadingDecrement }] =
    useDecrementCartItemMutation();
  const [removeItem, { isLoading: isLoadingRemove }] =
    useRemoveItemFromCartMutation();

  // Manually set cart items when data arrives from API
  useEffect(() => {
    if (isSuccess && cartData) {
      // Check for different possible data structures and adapt
      const itemsToSet = cartData.data.items;

      dispatch(setItems(itemsToSet));
    }
  }, [cartData, isSuccess, dispatch]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    } else {
      // Fetch cart items when component mounts
      refetch();
    }
  }, [navigate, refetch]);

  const handleRemoveFromCart = async (itemId) => {
    setIsRemovingItem((prev) => ({ ...prev, [itemId]: true }));
    try {
      await removeItem(itemId).unwrap();
      dispatch(removeFromCart(itemId));
      // Refetch cart after item removal to ensure UI is up to date
      refetch();
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    } finally {
      setIsRemovingItem((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  const handleUpdateQuantity = async (itemId, currentQuantity, isIncrement) => {
    setIsUpdatingQuantity((prev) => ({ ...prev, [itemId]: true }));
    try {
      // Log the itemId to debug

      if (isIncrement) {
        await incrementItem(itemId).unwrap();
        dispatch(updateQuantity({ id: itemId, quantity: currentQuantity + 1 }));
      } else if (currentQuantity > 1) {
        await decrementItem(itemId).unwrap();
        dispatch(updateQuantity({ id: itemId, quantity: currentQuantity - 1 }));
      }

      // Refetch cart after quantity update to ensure UI is up to date
      refetch();
    } catch (error) {
      console.error("Failed to update item quantity:", error);
    } finally {
      setIsUpdatingQuantity((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  // Show loading state if cart is loading
  if (isCartLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Loading your cart...
      </div>
    );
  }

  // Show error state if there's an API error
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-600">
        Error loading cart: {error.message || "Unknown error"}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-2xl font-bold">
            Madina Pharmacy - Shopping Cart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Product</TableHead>
                <TableHead className="text-center">Price</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!cartItems || cartItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    Your cart is empty.
                  </TableCell>
                </TableRow>
              ) : (
                cartItems.map((item) => (
                  <TableRow key={item.prodId || item._id}>
                    <TableCell><span className="truncate">{item.title}</span></TableCell>
                    <TableCell className="text-red-600 font-semibold">
                      {(item.price || 0).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleUpdateQuantity(
                              item._id, // Use consistent _id property
                              item.quantity,
                              false
                            )
                          }
                          className="mr-2"
                          disabled={
                            item.quantity <= 1 || isUpdatingQuantity[item._id]
                          }
                        >
                          -
                        </Button>
                        {isUpdatingQuantity[item._id] ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          item.quantity
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            handleUpdateQuantity(
                              item._id, // Use consistent _id property
                              item.quantity,
                              true
                            );
                          }}
                          className="ml-2"
                          disabled={isUpdatingQuantity[item._id]}
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-red-600 font-semibold">
                      {((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveFromCart(item._id)}
                        disabled={isRemovingItem[item._id]}
                      >
                        {isRemovingItem[item._id] ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-semibold">
              Grand Total:{" "}
              <span className="text-red-600">
                {typeof cartTotal === "number" ? cartTotal.toFixed(2) : "0.00"} Rs
              </span>
            </p>
            <Button
              disabled={!cartItems || cartItems.length === 0}
              className="w-48 bg-red-600 hover:bg-red-700 text-white"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cart;
