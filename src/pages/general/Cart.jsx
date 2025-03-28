import React, { useState } from "react";
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
import { Trash2, PlusCircle } from "lucide-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Paracetamol", price: 5.99, quantity: 2 },
    { id: 2, name: "Vitamin C Supplement", price: 8.5, quantity: 1 },
    { id: 3, name: "Antiseptic Hand Sanitizer", price: 3.75, quantity: 3 },
    { id: 4, name: "Multivitamin Tablets", price: 12.99, quantity: 1 },
  ]);

  // Calculate grand total
  const grandTotal = cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  // Function to remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  // Function to update quantity
  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

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
              {cartItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    Your cart is empty.
                  </TableCell>
                </TableRow>
              ) : (
                cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-red-600 font-semibold">
                      ${item.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="mr-2"
                        >
                          -
                        </Button>
                        {item.quantity}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="ml-2"
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-red-600 font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-semibold">
              Grand Total: <span className="text-red-600">${grandTotal}</span>
            </p>
            <Button
              disabled={cartItems.length === 0}
              className="w-48 bg-red-600 hover:bg-red-700 text-white"
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
