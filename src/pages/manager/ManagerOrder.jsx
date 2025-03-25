import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Package, Clock, CheckCircle2 } from 'lucide-react';

// Sample order data (in a real app, this would come from an API)
const orderDetails = {
  'ORD-001': {
    id: 'ORD-001',
    date: 'March 20, 2024',
    status: 'Processing',
    customerName: 'John Doe',
    customerPhone: '+1 (555) 123-4567',
    deliveryAddress: '123 Main St, Cityville, State 12345',
    items: [
      { 
        name: 'Amoxicillin', 
        quantity: 1, 
        dosage: '500mg', 
        price: 15.99,
        description: 'Broad-spectrum antibiotic for bacterial infections',
        manufacturer: 'PharmaCo Labs',
        batchNumber: 'AMX-2024-001'
      },
      { 
        name: 'Ibuprofen', 
        quantity: 2, 
        dosage: '200mg', 
        price: 8.50,
        description: 'Non-steroidal anti-inflammatory pain reliever',
        manufacturer: 'MedCare Pharmaceuticals',
        batchNumber: 'IBP-2024-002'
      }
    ],
    subtotal: 32.99,
    deliveryFee: 5.00,
    total: 37.99
  }
};

const ManagerOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = orderDetails[orderId];

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'Open':
        return <Package className="w-5 h-5 text-yellow-500" />;
      case 'Delivered':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const handleDownloadInvoice = () => {
    // In a real app, this would trigger an invoice download
    alert('Downloading Invoice for ' + order.id);
  };

  if (!order) {
    return <div className="container mx-auto p-4">Order not found</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Details Column */}
        <div>
          <Card className="h-full">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-xl font-bold">Product Details</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {order.items.map((item, index) => (
                <div 
                  key={index} 
                  className="mb-6 pb-6 border-b last:border-b-0"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.quantity} x {item.dosage}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-red-600">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Description</p>
                      <p className="text-sm">{item.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-gray-500">Manufacturer</p>
                        <p className="text-sm">{item.manufacturer}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Batch Number</p>
                        <p className="text-sm">{item.batchNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Order Details Column */}
        <div>
          <Card className="h-full">
            <CardHeader className="p-4 flex flex-row items-center justify-between border-b">
              <CardTitle className="text-xl font-bold">Order Information</CardTitle>
              <div className="flex items-center space-x-2">
                {renderStatusIcon(order.status)}
                <span className="text-sm">{order.status}</span>
              </div>
            </CardHeader>
            
            <CardContent className="p-4">
              {/* Order Information */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-500">Order Number</p>
                  <p className="text-sm font-semibold">{order.id}</p>
                  
                  <p className="text-xs text-gray-500 mt-4">Order Date</p>
                  <p className="text-sm">{order.date}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500">Customer Name</p>
                  <p className="text-sm font-semibold">{order.customerName}</p>
                  
                  <p className="text-xs text-gray-500 mt-4">Contact Number</p>
                  <p className="text-sm">{order.customerPhone}</p>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="mb-6 pb-6 border-b">
                <p className="text-xs text-gray-500">Delivery Address</p>
                <p className="text-sm">{order.deliveryAddress}</p>
              </div>

              {/* Order Summary */}
              <div>
                <div className="flex justify-between text-sm py-2">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm py-2">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span>${order.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold py-2 border-t mt-2">
                  <span>Total</span>
                  <span className="text-red-600">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Download Invoice Button */}
      <div className="mt-6">
        <Button 
          variant="destructive" 
          size="lg"
          onClick={handleDownloadInvoice}
          className="w-full flex items-center justify-center bg-red-500 hover:bg-red-400"
        >
          <Download className="mr-3 h-5 w-5" /> Download Complete Invoice
        </Button>
      </div>
    </div>
  );
};

export default ManagerOrder;