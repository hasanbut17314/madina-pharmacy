import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Clock, CheckCircle2, X, Truck } from "lucide-react";
import { SideBar } from "../../components/basics";
import { useGetAllOrdersQuery } from "../../api/OrderApi";

const AdminOrders = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useGetAllOrdersQuery({ page, limit });

  const renderStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "Shipped":
        return <Truck className="w-4 h-4 text-blue-500" />;
      case "Delivered":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "Cancelled":
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-500";
      case "Shipped":
        return "text-blue-500";
      case "Delivered":
        return "text-green-500";
      case "Cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const handleOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (data?.data?.totalPages && page < data.data.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const OrderDetailsModal = () => {
    if (!selectedOrder) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Blurred backdrop */}
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white bg-opacity-30"
          onClick={() => setShowModal(false)}
        ></div>

        {/* Modal content */}
        <div className="bg-white rounded-lg p-4 max-w-md w-full max-h-[80vh] overflow-y-auto z-10 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">
              Order Details: {selectedOrder.order_no || selectedOrder._id}
            </h3>
            <Button
              onClick={() => setShowModal(false)}
              variant="ghost"
              size="sm"
              className="p-1 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {/* Status */}
            <div className="flex items-center">
              {renderStatusIcon(selectedOrder.status)}
              <span className={`ml-2 text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                {selectedOrder.status}
              </span>
            </div>

            {/* Customer info */}
            <div className="border-t pt-2">
              <h4 className="font-medium text-sm mb-1">Customer Information</h4>
              <p className="text-sm">{selectedOrder.userId?.firstName} {selectedOrder.userId?.lastName}</p>
              <p className="text-xs text-gray-500">{selectedOrder?.address || "N/A"}</p>
            </div>

            {/* Products */}
            <div className="border-t pt-2">
              <h4 className="font-medium text-sm mb-1">Products</h4>
              <div className="space-y-2">
                {selectedOrder.orderItems?.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>
                      {item.prodId.name} x {item.quantity}
                    </span>
                    <span className="font-medium">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between pt-1 border-t text-sm font-semibold">
                  <span>Total:</span>
                  <span>${selectedOrder.totalPrice?.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Feedback */}
            {selectedOrder.feedback && (
              <div className="border-t pt-2">
                <h4 className="font-medium text-sm mb-1">Customer Feedback</h4>
                <p className="text-sm text-gray-700 italic">"{selectedOrder.feedback}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-60">Loading orders...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-60 text-red-500">Failed to load orders.</div>;
  }

  return (
    <div className="flex">
      <SideBar />
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
                        <td className="p-2">${order.totalPrice?.toFixed(2)}</td>
                        <td className="p-2 flex items-center space-x-1">
                          {renderStatusIcon(order.status)}
                          <span className={getStatusColor(order.status)}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-2">
                          <Button
                            onClick={() => handleOrderDetails(order)}
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
                Page {page} of {data?.data?.totalPages || 1}
              </span>
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

        {/* Modal */}
        {showModal && <OrderDetailsModal />}
      </div>
    </div>
  );
};

export default AdminOrders;
