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
import { useNavigate } from "react-router-dom";

function Rider() {
  const navigate = useNavigate();

  return (
    <div className="p-2 sm:p-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-3 sm:p-4">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-700">
          Rider Orders
        </h2>
        <Table className="border border-gray-200 rounded-lg overflow-hidden text-sm sm:text-base">
          
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[100px] text-gray-600 text-left">
                Order ID
              </TableHead>
              <TableHead className="text-gray-600 text-center">Date</TableHead>
              <TableHead className="text-gray-600 text-center">Status</TableHead>
              <TableHead className="text-gray-600 text-center">QTY</TableHead>
              <TableHead className="text-gray-600 text-right">Amount</TableHead>
              <TableHead className="text-gray-600 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((num) => (
              <TableRow key={num} className="hover:bg-gray-50 transition-all">
                <TableCell className="font-medium text-left">INV00{num}</TableCell>
                <TableCell className="text-center">22/02/2025</TableCell>
                <TableCell className="text-center">
                  <span className="px-2 py-1 rounded-md bg-green-100 text-green-700 text-xs sm:text-sm">
                    delivered
                  </span>
                </TableCell>
                <TableCell className="text-center">{10 + num}</TableCell>
                <TableCell className="text-right">${250 + num * 10}.00</TableCell>
                <TableCell className="text-right">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm sm:text-base"
                    onClick={() => navigate(`order/INV00${num}`)}
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

export default Rider;
