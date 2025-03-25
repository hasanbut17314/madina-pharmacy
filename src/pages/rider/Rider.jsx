import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Clock, CheckCircle2, Truck } from 'lucide-react';

// Sample order data
const orderData = {
  activeOrders: [
    {
      id: 'ORD-001',
      date: 'March 20',
      status: 'Processing',
      totalItems: 2,
      total: 32.99,
      customerName: 'John Doe',
      address: '123 Main St, Cityville'
    },
    {
      id: 'ORD-002',
      date: 'March 19',
      status: 'Open',
      totalItems: 1,
      total: 45.50,
      customerName: 'Jane Smith',
      address: '456 Elm St, Townsburg'
    },
    {
      id: 'ORD-007',
      date: 'March 19',
      status: 'Open',
      totalItems: 1,
      total: 45.50,
      customerName: 'Jane Smith',
      address: '456 Elm St, Townsburg'
    },
    {
      id: 'ORD-008',
      date: 'March 19',
      status: 'Processing',
      totalItems: 1,
      total: 45.50,
      customerName: 'Jane Smith',
      address: '456 Elm St, Townsburg'
    }
  ],
  deliveredOrders: [
    {
      id: 'ORD-003',
      date: 'March 15',
      status: 'Delivered',
      totalItems: 3,
      total: 22.75,
      customerName: 'Alice Johnson',
      address: '789 Oak Rd, Villagetown'
    },
    {
      id: 'ORD-004',
      date: 'March 10',
      status: 'Delivered',
      totalItems: 1,
      total: 15.99,
      customerName: 'Bob Williams',
      address: '101 Pine Lane, Hamletville'
    },
    {
      id: 'ORD-005',
      date: 'March 10',
      status: 'Delivered',
      totalItems: 1,
      total: 15.99,
      customerName: 'Bob Williams',
      address: '101 Pine Lane, Hamletville'
    },
    {
      id: 'ORD-006',
      date: 'March 10',
      status: 'Delivered',
      totalItems: 1,
      total: 15.99,
      customerName: 'Bob Williams',
      address: '101 Pine Lane, Hamletville'
    }
  ]
};

const Rider = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'Open':
        return <Package className="w-4 h-4 text-yellow-500" />;
      case 'Delivered':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const handleOrderDetails = (orderId) => {
    navigate(`order/${orderId}`);
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
            <p className="font-semibold text-xs text-red-600">${order.total.toFixed(2)}</p>
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

  return (
    <div className="container mx-auto p-2">
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
            <CardTitle className="text-lg font-bold">Delivered Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            {renderOrderList(orderData.deliveredOrders)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Rider;