import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Clock, CheckCircle2, Truck, X } from "lucide-react";
import { SideBar } from "../../components/basics";

// Sample order data
const orderData = {
  activeOrders: [
    {
      id: "ORD-001",
      date: "March 20",
      status: "Processing",
      totalItems: 2,
      total: 32.99,
      customerName: "John Doe",
      address: "123 Main St, Cityville",
      products: [
        { name: "Organic T-shirt", price: 19.99, quantity: 1 },
        { name: "Cotton Socks", price: 12.99, quantity: 1 },
      ],
      rider: "Mike Johnson",
      estimatedDelivery: "March 23",
    },
    {
      id: "ORD-002",
      date: "March 19",
      status: "Open",
      totalItems: 1,
      total: 45.5,
      customerName: "Jane Smith",
      address: "456 Elm St, Townsburg",
      products: [{ name: "Leather Jacket", price: 45.5, quantity: 1 }],
      rider: "Pending Assignment",
      estimatedDelivery: "March 24",
    },
    {
      id: "ORD-007",
      date: "March 19",
      status: "Open",
      totalItems: 1,
      total: 45.5,
      customerName: "Jane Smith",
      address: "456 Elm St, Townsburg",
      products: [{ name: "Winter Boots", price: 45.5, quantity: 1 }],
      rider: "Pending Assignment",
      estimatedDelivery: "March 24",
    },
    {
      id: "ORD-008",
      date: "March 19",
      status: "Processing",
      totalItems: 1,
      total: 45.5,
      customerName: "Jane Smith",
      address: "456 Elm St, Townsburg",
      products: [{ name: "Denim Jeans", price: 45.5, quantity: 1 }],
      rider: "Sarah Wilson",
      estimatedDelivery: "March 22",
    },
  ],
  deliveredOrders: [
    {
      id: "ORD-003",
      date: "March 15",
      status: "Delivered",
      totalItems: 3,
      total: 22.75,
      customerName: "Alice Johnson",
      address: "789 Oak Rd, Villagetown",
      products: [
        { name: "Coffee Mug", price: 7.99, quantity: 1 },
        { name: "Tea Infuser", price: 5.99, quantity: 1 },
        { name: "Coasters (Set of 4)", price: 8.77, quantity: 1 },
      ],
      rider: "Tom Davis",
      deliveredDate: "March 17",
    },
    {
      id: "ORD-004",
      date: "March 10",
      status: "Delivered",
      totalItems: 1,
      total: 15.99,
      customerName: "Bob Williams",
      address: "101 Pine Lane, Hamletville",
      products: [{ name: "Notebook", price: 15.99, quantity: 1 }],
      rider: "Lisa Green",
      deliveredDate: "March 12",
    },
    {
      id: "ORD-005",
      date: "March 10",
      status: "Delivered",
      totalItems: 1,
      total: 15.99,
      customerName: "Bob Williams",
      address: "101 Pine Lane, Hamletville",
      products: [{ name: "Water Bottle", price: 15.99, quantity: 1 }],
      rider: "James Brown",
      deliveredDate: "March 12",
    },
    {
      id: "ORD-006",
      date: "March 10",
      status: "Delivered",
      totalItems: 1,
      total: 15.99,
      customerName: "Bob Williams",
      address: "101 Pine Lane, Hamletville",
      products: [{ name: "Phone Case", price: 15.99, quantity: 1 }],
      rider: "Emma White",
      deliveredDate: "March 12",
    },
  ],
};

const AdminOrders = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const renderStatusIcon = (status) => {
    switch (status) {
      case "Processing":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "Open":
        return <Package className="w-4 h-4 text-yellow-500" />;
      case "Delivered":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const handleOrderDetails = (orderId) => {
    // Find the order in either active or delivered orders
    const order =
      orderData.activeOrders.find((order) => order.id === orderId) ||
      orderData.deliveredOrders.find((order) => order.id === orderId);

    if (order) {
      setSelectedOrder(order);
      setShowModal(true);
    }
  };

  const renderOrderList = (orders) => {
    return orders.map((order) => (
      <div
        key={order.id}
        className="flex md:flex-row items-start md:items-center justify-between p-2 border-b last:border-b-0 hover:bg-gray-50 border-2 border-gray-100 rounded-md my-1"
      >
        <div className="flex items-center space-x-2 mb-1 md:mb-0">
          {renderStatusIcon(order.status)}
          <div>
            <p className="font-semibold text-sm">{order.id}</p>
            <p className="text-xs text-gray-500">{order.date}</p>
          </div>
        </div>
        <div className="flex items-end md:items-center space-x-2">
          <div className="text-right">
            <p className="text-xs text-gray-500">Items: {order.totalItems}</p>
            <p className="font-semibold text-xs text-red-600">
              ${order.total.toFixed(2)}
            </p>
          </div>
          <Button
            onClick={() => handleOrderDetails(order.id)}
            variant="destructive"
            size="xs"
            className="bg-red-500 hover:bg-red-400 py-1 px-2 h-7 text-xs"
          >
            View Details
          </Button>
        </div>
      </div>
    ));
  };

  // Modal component
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
              Order Details: {selectedOrder.id}
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
              <span className="ml-2 text-sm font-medium">
                {selectedOrder.status}
              </span>
            </div>

            {/* Customer info */}
            <div className="border-t pt-2">
              <h4 className="font-medium text-sm mb-1">Customer Information</h4>
              <p className="text-sm">{selectedOrder.customerName}</p>
              <p className="text-xs text-gray-500">{selectedOrder.address}</p>
            </div>

            {/* Products */}
            <div className="border-t pt-2">
              <h4 className="font-medium text-sm mb-1">Products</h4>
              <div className="space-y-2">
                {selectedOrder.products.map((product, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>
                      {product.name} x{product.quantity}
                    </span>
                    <span className="font-medium">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between pt-1 border-t text-sm font-semibold">
                  <span>Total:</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Delivery info */}
            <div className="border-t pt-2">
              <h4 className="font-medium text-sm mb-1">Delivery Information</h4>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <span className="text-gray-500">Rider:</span>
                <span>{selectedOrder.rider}</span>

                {selectedOrder.status === "Delivered" ? (
                  <>
                    <span className="text-gray-500">Delivered On:</span>
                    <span>{selectedOrder.deliveredDate}</span>
                  </>
                ) : (
                  <>
                    <span className="text-gray-500">Est. Delivery:</span>
                    <span>{selectedOrder.estimatedDelivery}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex">
      <SideBar />

      <div className="container mx-auto p-2 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Active Orders Section */}
          <Card className="order-1 md:order-1 py-0 gap-0">
            <CardHeader className="p-3">
              <CardTitle className="text-lg font-bold">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              {renderOrderList(orderData.activeOrders)}
            </CardContent>
          </Card>

          {/* Delivered Orders Section */}
          <Card className="order-2 md:order-2 py-0 gap-0">
            <CardHeader className="p-3">
              <CardTitle className="text-lg font-bold">
                Delivered Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              {renderOrderList(orderData.deliveredOrders)}
            </CardContent>
          </Card>
        </div>

        {/* Modal */}
        {showModal && <OrderDetailsModal />}
      </div>
    </div>
  );
};

export default AdminOrders;
