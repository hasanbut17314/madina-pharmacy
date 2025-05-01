import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

import {
  useGetUserOrdersQuery,
  useCancelOrderMutation,
  useAddFeedbackMutation, // ✅ Import feedback mutation
} from "@/api/orderApi";

const Orders = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  const {
    data: ordersData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUserOrdersQuery({ page, limit, status: statusFilter });

  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();
  const [addFeedback, { isLoading: isSubmittingFeedback }] = useAddFeedbackMutation(); // ✅ Hook for feedback

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to cancel order:", error);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleFeedbackClick = (order) => {
    setSelectedOrder(order);
    setFeedbackText("");
    setIsFeedbackModalOpen(true);
  };

  const handleSubmitFeedback = async () => {
    if (!selectedOrder?._id || !feedbackText.trim()) return;

    try {
      await addFeedback({
        orderId: selectedOrder._id,
        feedback: feedbackText.trim(),
      }).unwrap();

      setIsFeedbackModalOpen(false);
      setFeedbackText("");
      refetch();
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  if (isLoading) {
    return <div className="p-4 text-center">Loading orders...</div>;
  }

  if (isError) {
    return (
      <div className="p-4 text-center text-red-500">
        Error: {error?.message || "Failed to load orders"}
      </div>
    );
  }

  const orders = ordersData?.data?.orders || [];
  const totalOrders = ordersData?.data?.pagination?.total || 0;
  const totalPages = Math.ceil(totalOrders / limit) || 1;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {/* Status filter */}
      <div className="mb-4">
        <label className="mr-2">Filter by status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">All Status</option>
          {["pending", "shipped", "delivered", "cancelled"].map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Orders list */}
      {orders.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded">No orders found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Order No</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Address</th>
                <th className="py-2 px-4 border">Contact</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const orderStatus = order.status.toLowerCase();
                const isActivatable = !["cancelled", "delivered"].includes(orderStatus);

                return (
                  <tr key={order._id} className="border-b">
                    <td className="py-2 px-4 border">{order.order_no}</td>
                    <td className="py-2 px-4 border">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          orderStatus === "delivered"
                            ? "bg-green-100 text-green-800"
                            : orderStatus === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : orderStatus === "shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-2 px-4 border">{order.address}</td>
                    <td className="py-2 px-4 border">{order.contactNumber}</td>
                    <td className="py-2 px-4 border flex gap-2">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                      >
                        View
                      </button>

                      {isActivatable ? (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          disabled={isCancelling}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded disabled:opacity-50"
                        >
                          {isCancelling ? "Cancelling..." : "Cancel"}
                        </button>
                      ) : (
                        <>
                          <span
                            className={
                              orderStatus === "cancelled"
                                ? "text-red-500"
                                : "text-green-500"
                            }
                          >
                            {orderStatus === "cancelled" ? "Cancelled" : "Completed"}
                          </span>

                          {orderStatus === "delivered" && order.feedback === null && (
                            <button
                              onClick={() => handleFeedbackClick(order)}
                              className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded ml-2"
                            >
                              Feedback
                            </button>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {orders.length > 0 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="mx-1 px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="mx-2 py-1">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
            className="mx-1 px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">Showing {orders.length} orders</div>

      {/* Order Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Order #{selectedOrder?.order_no}
            </DialogTitle>
            <DialogDescription>
              Placed on:{" "}
              {selectedOrder && new Date(selectedOrder.createdAt).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="mt-4 space-y-4 text-sm text-gray-800">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Status:</p>
                  <p>{selectedOrder.status}</p>
                </div>
                <div>
                  <p className="font-semibold">Contact:</p>
                  <p>{selectedOrder.contactNumber}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-semibold">Address:</p>
                  <p>{selectedOrder.address}</p>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-1">Products:</p>
                {selectedOrder.orderItems?.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {selectedOrder.orderItems.map((item, i) => (
                      <li key={i}>
                        {item.prodId?.name || "Unnamed"} – Qty: {item.quantity} – Price: {item.price}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No product details found.</p>
                )}
              </div>
            </div>
          )}

          <DialogClose className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" />
        </DialogContent>
      </Dialog>

      {/* Feedback Modal */}
      <Dialog open={isFeedbackModalOpen} onOpenChange={setIsFeedbackModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Order Feedback</DialogTitle>
            <DialogDescription>
              Share your experience with order #{selectedOrder?.order_no}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
                Your Feedback
              </label>
              <textarea
                id="feedback"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Please share your thoughts about this order..."
                className="w-full rounded-md border border-gray-300 p-3 h-32 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsFeedbackModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitFeedback}
                disabled={isSubmittingFeedback}
                className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmittingFeedback ? "Submitting..." : "Submit Feedback"}
              </button>
            </div>
          </div>

          <DialogClose className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
