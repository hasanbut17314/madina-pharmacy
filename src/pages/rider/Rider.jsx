import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { useGetRiderOrdersQuery } from '../../api/OrderApi'; // your API hook

const Rider = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError } = useGetRiderOrdersQuery({ page, limit });

  const orders = data?.data?.orders || [];
  const pagination = data?.data?.pagination || { page: 1, limit: 5, total: 0 };
  const totalPages = Math.ceil(pagination.total / limit);

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'Open':
        return <Package className="w-4 h-4 text-yellow-500" />;
      case 'Delivered':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'Cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const handleOrderDetails = (orderId) => {
    navigate(`order/${orderId}`);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(prev => prev + 1);
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
          <CardTitle className="text-lg font-bold">My Orders</CardTitle>
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
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-semibold">{order.order_no || order.id}</td>
                      <td className="p-2">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}</td>
                      <td className="p-2">{order.orderItems.length || 0}</td>
                      <td className="p-2">{order.totalPrice?.toFixed(2)}</td>
                      <td className="p-2 flex items-center space-x-1">
                        {renderStatusIcon(order.status)}
                        <span>{order.status}</span>
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
            <span className="text-sm">
              Page {page} of {totalPages || 1}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={page >= totalPages}
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

export default Rider;
