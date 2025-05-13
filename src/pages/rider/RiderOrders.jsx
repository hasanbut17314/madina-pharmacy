import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetRiderOrdersQuery, useUpdateOrderStatusByRiderMutation } from '../../api/OrderApi';
import { ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const RiderOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetRiderOrdersQuery({ page: 1, limit: 10 });
  const [updateOrderStatus, { isLoading: isUpdating, isSuccess }] = useUpdateOrderStatusByRiderMutation();
  const [showDeliveryAlert, setShowDeliveryAlert] = useState(false);

  const order = data?.data?.orders.find((order) => order._id === orderId);

  const handleMarkDelivered = async () => {
    try {
      await updateOrderStatus({ id: order._id, status: 'Delivered' }).unwrap();
      setShowDeliveryAlert(true);
      setTimeout(() => setShowDeliveryAlert(false), 3000);
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError || !order) return <div className="p-4 text-red-600">Failed to fetch order.</div>;

  return (
    <div className="container mx-auto max-w-5xl md:max-w-3xl px-4 py-6">
      {/* Back Button */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => navigate(-1)}
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

      {/* Delivery Success Alert */}
      {showDeliveryAlert && (
        <div className="mb-4">
          <Alert>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertTitle>Order Delivered</AlertTitle>
            <AlertDescription>
              Order #{order.order_no} has been successfully marked as delivered.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Order Details Card */}
      <div className="bg-white border rounded-lg overflow-hidden">
        {/* Order Header */}
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h1 className="text-base font-bold text-gray-800">Order #{order.order_no}</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 p-4">
          {/* Customer Info */}
          <div>
            <h2 className="text-sm font-semibold mb-2 text-gray-700">Customer Details</h2>
            <div className="space-y-2 bg-gray-50 p-3 rounded-lg border">
              <div>
                <p className="text-[10px] text-gray-500">Name</p>
                <p className="text-xs font-medium">
                  {order.userId?.firstName} {order.userId?.lastName}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500">Phone</p>
                <p className="text-xs">{order.contactNumber}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500">Delivery Address</p>
                <p className="text-xs">{order.address}</p>
              </div>
            </div>

            
          </div>

          {/* Order Items */}
          <div>
            <h2 className="text-sm font-semibold mb-2 text-gray-700">Order Items</h2>
            <ScrollArea className="h-48 border rounded-lg">
              <div className="space-y-3 p-1 pr-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 border flex justify-between items-start">
                    <div>
                      <h3 className="text-xs font-medium text-gray-800">
                        {item.prodId?.name || item.name}
                      </h3>
                      <p className="text-[10px] text-gray-500">QTY: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-red-600">{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Mark as Delivered Button */}
        {order.status !== 'Delivered' && (
          <div className="p-4">
            <Button 
              onClick={handleMarkDelivered}
              className="w-full mt-3 bg-green-600 hover:bg-green-700 transition-colors"
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Mark as Delivered'}
            </Button>
          </div>
        )}

        {/* Total Price */}
        <div className="bg-gray-50 px-4 py-3 border-t">
          <div className="flex justify-between pt-2 font-bold">
            <span className="text-sm text-gray-800">Total</span>
            <span className="text-sm text-red-600">{order.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/* Map Preview */}
      {order.address && (
              <div className="mt-4">
                <h2 className="text-sm font-semibold mb-2 text-gray-700">Delivery Location</h2>
                <div className="border rounded-lg overflow-hidden h-64">
                  <iframe
                    title="Google Map"
                    width="100%"
                    height="100%"
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps?q=${encodeURIComponent(order.address)}&output=embed`}
                  ></iframe>
                </div>
              </div>
            )}
    </div>
    
  );
};

export default RiderOrder;
