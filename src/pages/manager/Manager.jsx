import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

function Manager() {
  const navigate = useNavigate();
  const orders = [
    { id: "INV001", date: "22/02/2025", status: "open", qty: 10, amount: 250.0 },
    { id: "INV002", date: "20/02/2025", status: "open", qty: 17, amount: 300.0 },
    { id: "INV003", date: "18/02/2025", status: "delivered", qty: 12, amount: 180.0 },
    { id: "INV004", date: "15/02/2025", status: "Cancelled", qty: 22, amount: 500.0 },
    { id: "INV005", date: "12/02/2025", status: "process", qty: 15, amount: 275.0 },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-500 text-white px-2 py-1">delivered</Badge>;
      case "process":
        return <Badge className="bg-yellow-500 text-white px-2 py-1">process</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-500 text-white px-2 py-1">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-400 text-white px-2 py-1">open</Badge>;
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Management</h2>

        <Table className="border border-gray-200 rounded-lg text-sm">
          <TableHeader>
            <TableRow className="bg-gray-100 text-gray-700">
              <TableHead className="w-[120px] text-left">Order ID</TableHead>
              <TableHead className="text-center">Date</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">QTY</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index} className="hover:bg-gray-50 transition">
                <TableCell className="font-medium text-gray-700">{order.id}</TableCell>
                <TableCell className="text-center text-gray-600">{order.date}</TableCell>
                <TableCell className="text-center">{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-center text-gray-700">{order.qty}</TableCell>
                <TableCell className="text-right font-semibold text-gray-700">${order.amount.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                    onClick={() => navigate(`order/${order.id}`)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Manager;
