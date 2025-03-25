import React, { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const orderDetails = {
  'ORD-001': {
    id: 'ORD-001',
    date: 'March 20, 2024',
    status: 'Processing',
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    customerPhone: '+1 (555) 123-4567',
    deliveryAddress: '123 Main St, Cityville, State 12345',
    items: [
      { 
        name: 'Amoxicillin', 
        quantity: 1, 
        dosage: '500mg', 
        price: 15.99,
        description: 'Broad-spectrum antibiotic'
      },
      { 
        name: 'Ibuprofen', 
        quantity: 2, 
        dosage: '200mg', 
        price: 8.50,
        description: 'Non-steroidal anti-inflammatory'
      },
      { 
        name: 'Paracetamol', 
        quantity: 1, 
        dosage: '500mg', 
        price: 5.99,
        description: 'Pain and fever medication'
      },
      { 
        name: 'Vitamin C', 
        quantity: 3, 
        dosage: '1000mg', 
        price: 7.50,
        description: 'Immune system support'
      }
    ],
    subtotal: 32.99,
    deliveryFee: 5.00,
    total: 37.99,
    isDelivered: false
  }
};

const RiderOrders = ({ 
  orderId = 'ORD-001', 
  onBack, 
  orderData = orderDetails 
}) => {
  const [order, setOrder] = useState(orderData[orderId]);
  const [showDeliveryAlert, setShowDeliveryAlert] = useState(false);

  const handleMarkDelivered = () => {
    setOrder(prevOrder => ({
      ...prevOrder,
      status: 'Delivered',
      isDelivered: true
    }));
    setShowDeliveryAlert(true);
    
    // Hide alert after 3 seconds
    setTimeout(() => {
      setShowDeliveryAlert(false);
    }, 3000);
  };

  if (!order) {
    return <div className="container mx-auto p-4">Order not found</div>;
  }

  return (
    <div className="container mx-auto max-w-5xl md:max-w-3xl px-4 py-6">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={onBack}
          className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back
        </button>
        <div className="flex items-center space-x-1.5 text-gray-600">
          <Clock className="w-4 h-4 text-blue-500" />
          <span className="text-xs">{order.status}</span>
        </div>
      </div>

      {/* Delivery Alert */}
      {showDeliveryAlert && (
        <div className="mb-4">
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Order Delivered</AlertTitle>
            <AlertDescription>
              Order #{order.id} has been successfully marked as delivered.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h1 className="text-base font-bold text-gray-800">
            Order #{order.id}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Placed on {order.date}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-4 p-4">
          {/* Customer Information */}
          <div>
            <h2 className="text-sm font-semibold mb-2 text-gray-700">
              Customer Details
            </h2>
            <div className="space-y-2 bg-gray-50 p-3 rounded-lg border">
              <div>
                <p className="text-[10px] text-gray-500">Name</p>
                <p className="text-xs font-medium">{order.customerName}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500">Phone</p>
                <p className="text-xs">{order.customerPhone}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500">Delivery Address</p>
                <p className="text-xs">{order.deliveryAddress}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h2 className="text-sm font-semibold mb-2 text-gray-700">
              Order Items
            </h2>
            {/* Scrollable Area */}
            <ScrollArea className="h-48 border rounded-lg">
              <div className="space-y-3 p-1 pr-4">
                {order.items.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-50 rounded-lg p-3 border flex justify-between items-start"
                  >
                    <div>
                      <h3 className="text-xs font-medium text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-[10px] text-gray-500">
                        {item.quantity} x {item.dosage}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-red-600">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Mark as Delivered Button */}
            {!order.isDelivered && (
              <Button 
                onClick={handleMarkDelivered}
                className="w-full mt-3 bg-green-600 hover:bg-green-700 transition-colors flex items-center justify-center text-xs"
              >
                <CheckCircle2 className="mr-1.5 h-3 w-3" />
                Mark as Delivered
              </Button>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 px-4 py-3 border-t">
          <div className="flex justify-between mb-1">
            <span className="text-xs text-gray-600">Subtotal</span>
            <span className="text-xs font-medium text-red-600">${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-xs text-gray-600">Delivery Fee</span>
            <span className="text-xs font-medium text-red-600">${order.deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t font-bold">
            <span className="text-sm text-gray-800">Total</span>
            <span className="text-sm text-red-600">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderOrders;