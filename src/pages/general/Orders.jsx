import React, { useState, useEffect } from "react";
import { useGetUserOrdersQuery, useCancelOrderMutation } from "@/api/orderApi"; // Update if needed

const Orders = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");
  const [cancelledOrderId, setCancelledOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // ✅ New State
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ New State

  const {
    data: ordersData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUserOrdersQuery({ page, limit, status: statusFilter });

  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();

  const handleCancelOrder = async (orderId) => {
    try {
      await cancelOrder(orderId).unwrap();
      setCancelledOrderId(orderId);
      refetch();
    } catch (error) {
      console.error("Failed to cancel order:", error);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const statusOptions = [
    "",
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

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

  const orders = Array.isArray(ordersData?.data?.orders)
    ? ordersData.data.orders
    : [];
  const totalOrders = ordersData?.data?.totalOrders || 0;
  const totalPages = ordersData?.data?.totalPages || 0;

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
          {statusOptions.slice(1).map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Orders list */}
      {orders.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded">
          No orders found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Order ID</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Address</th>
                <th className="py-2 px-4 border">Contact</th>
                <th className="py-2 px-4 border">Actions</th>{" "}
                {/* 🛠️ Update Actions */}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="py-2 px-4 border">{order._id}</td>
                  <td className="py-2 px-4 border">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        order.status.toLowerCase() === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status.toLowerCase() === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : order.status.toLowerCase() === "shipped"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">{order.address}</td>
                  <td className="py-2 px-4 border">{order.contactNumber}</td>
                  <td className="py-2 px-4 border flex gap-2">
                    {/* View Button */}
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                    >
                      View
                    </button>

                    {/* Cancel Button */}
                    {order.status.toLowerCase() !== "cancelled" &&
                    order.status.toLowerCase() !== "delivered" ? (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        disabled={
                          isCancelling && cancelledOrderId === order._id
                        }
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded disabled:opacity-50"
                      >
                        {isCancelling && cancelledOrderId === order._id
                          ? "Cancelling..."
                          : "Cancel"}
                      </button>
                    ) : order.status.toLowerCase() === "cancelled" ? (
                      <span className="text-red-500">Cancelled</span>
                    ) : (
                      <span className="text-green-500">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
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

          <span className="mx-2 py-1">Page {page}</span>

          <button
            onClick={() => setPage(page + 1)}
            className="mx-1 px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      )}

      {/* Order count */}
      <div className="mt-4 text-sm text-gray-600">
        Showing {orders.length} orders
      </div>

      {/* 🛠️ Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p>
              <strong>Order ID:</strong> {selectedOrder._id}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p>
              <strong>Address:</strong> {selectedOrder.address}
            </p>
            <p>
              <strong>Contact:</strong> {selectedOrder.contactNumber}
            </p>
            {/* You can add more fields if needed */}

            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
