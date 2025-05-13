import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Clock, CheckCircle2, Truck, X } from 'lucide-react'; // Added Truck and X icons
import { useGetAllOrdersQuery } from '../../api/OrderApi'; // Adjust if needed

const Manager = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1); // Pagination state
  const limit = 10; // Number of orders per page

  // Fetch orders from API
  const { data, isLoading, isError } = useGetAllOrdersQuery({ page, limit });

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Shipped':
        return <Truck className="w-4 h-4 text-blue-500" />;
      case 'Delivered':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'Cancelled':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return "text-yellow-500";
      case 'Shipped':
        return "text-blue-500";
      case 'Delivered':
        return "text-green-500";
      case 'Cancelled':
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const handleOrderDetails = (orderId) => {
    navigate(`order/${orderId}`);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (data?.data?.totalPages && page < data.data.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-60">Loading orders...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-60 text-red-500">Failed to load orders.</div>;
  }

  return (
    <div className="container mx-auto p-2 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left bg-gray-100">
                  <th className="p-2">Order</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Items</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.orders?.length > 0 ? (
                  data.data.orders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-semibold">{order.order_no || order._id}</td>
                      <td className="p-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="p-2">{order.orderItems?.length || 0}</td>
                      <td className="p-2">{order.totalPrice?.toFixed(2)}</td>
                      <td className="p-2 flex items-center space-x-1">
                        {renderStatusIcon(order.status)}
                        <span className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <Button 
                          onClick={() => handleOrderDetails(order._id)}
                          variant="destructive"
                          size="xs"
                          className="bg-red-500 hover:bg-red-400 py-1 px-2 h-7 text-xs"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4 text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-between items-center mt-4">
            <Button 
              onClick={handlePrevPage}
              disabled={page === 1}
              size="sm"
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              Previous
            </Button>
            <span className="text-sm">Page {page} of {data?.data?.totalPages || 1}</span>
            <Button 
              onClick={handleNextPage}
              disabled={page === (data?.data?.totalPages || 1)}
              size="sm"
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Manager;
