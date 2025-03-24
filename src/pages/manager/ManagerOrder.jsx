import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function ManagerOrder() {
  const [rider, setRider] = useState("NONE");

  const orderDetails = {
    orderId: "ORD12345",
    location: "123 Main Street, City",
    totalAmount: "$150.00",
  };

  const availableRiders = ["Ali Khan", "Sara Ahmed", "David Smith", "Emily Johnson"];

  return (
    <div className="p-2 sm:p-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-3 sm:p-4">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-700">
          Order Details
        </h2>

        {/* Order Info Section */}
        <div className="mb-3 sm:mb-4 p-3 sm:p-4 border border-gray-200 rounded-lg bg-gray-50 text-sm sm:text-base">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-24 sm:w-32">Order ID:</span>
              <span className="text-gray-600">{orderDetails.orderId}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-24 sm:w-32">Rider:</span>
              {rider === "NONE" ? (
                <Select onValueChange={(value) => setRider(value)}>
                  <SelectTrigger className="w-40 bg-white border border-gray-300 rounded-md p-2">
                    <SelectValue placeholder="Assign Rider" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 rounded-md shadow-md">
                    {availableRiders.map((r, index) => (
                      <SelectItem key={index} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <span className="text-gray-600">{rider}</span>
              )}
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-24 sm:w-32">Location:</span>
              <span className="text-gray-600">{orderDetails.location}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-24 sm:w-32">Total Amount:</span>
              <span className="text-gray-600">{orderDetails.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Table of Ordered Items */}
        <Table className="border border-gray-200 rounded-lg overflow-hidden text-sm sm:text-base">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[60px] sm:w-[80px] text-gray-600 text-center">#</TableHead>
              <TableHead className="text-gray-600">Image</TableHead>
              <TableHead className="text-center text-gray-600">Name</TableHead>
              <TableHead className="text-right text-gray-600">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((num) => (
              <TableRow key={num} className="hover:bg-gray-50 transition-all">
                <TableCell className="font-medium text-center py-1 sm:py-0">{num}</TableCell>
                <TableCell className="text-center py-1 sm:py-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-md my-1"></div>
                </TableCell>
                <TableCell className="text-center py-1 sm:py-0">Medicine Name</TableCell>
                <TableCell className="text-right py-1 sm:py-0">10</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ManagerOrder;
