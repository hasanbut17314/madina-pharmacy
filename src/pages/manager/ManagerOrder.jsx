import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetOrderByIdQuery, useAssignRiderMutation } from '../../api/OrderApi';
import { useGetAllUsersQuery } from '../../api/AuthApi';
import { ArrowLeft, Download, Clock, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog } from '@headlessui/react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

const ManagerOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useGetOrderByIdQuery(orderId);
  const [assignRider] = useAssignRiderMutation();
  const { data: ridersData, isLoading: ridersLoading } = useGetAllUsersQuery({
    page: 1,
    limit: 20,
    role: 'rider',
    search: '',
  });

  const [showInvoice, setShowInvoice] = useState(false);
  const invoiceRef = useRef();

  const order = data?.data;

  const handleDownloadInvoice = () => {
    setShowInvoice(true);
  };

  const generatePDF = async () => {
    const canvas = await toPng(invoiceRef.current);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(canvas);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(canvas, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice_${order.order_no}.pdf`);
  };

  const handleRiderAssignment = async (riderId) => {
    try {
      await assignRider({ orderId, riderId }).unwrap();
      alert('Rider assigned successfully!');
      refetch();
    } catch (error) {
      console.error('Failed to assign rider:', error);
      alert('Failed to assign rider');
    }
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError || !data) return <div className="p-4 text-red-600">Failed to fetch order.</div>;

  return (
    <div className="container mx-auto max-w-5xl md:max-w-3xl px-4 py-6">
      {/* Invoice Modal */}
      <Dialog open={showInvoice} onClose={() => setShowInvoice(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Invoice Preview</h2>
              <button onClick={() => setShowInvoice(false)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div ref={invoiceRef} className="p-4 border rounded-md bg-gray-50">
              <h1 className="text-2xl font-bold text-center mb-6">INVOICE</h1>

              <div className="mb-4">
                <h2 className="text-md font-semibold">Customer Details</h2>
                <p>Name: {order.userId?.firstName} {order.userId?.lastName}</p>
                <p>Phone: {order.contactNumber}</p>
                <p>Address: {order.address}</p>
              </div>

              <div className="mb-4">
                <h2 className="text-md font-semibold">Order Details</h2>
                <p>Order #: {order.order_no}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Status: {order.status}</p>
              </div>

              <table className="w-full text-sm mb-6">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-3 text-left">Product</th>
                    <th className="py-2 px-3 text-right">Qty</th>
                    <th className="py-2 px-3 text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2 px-3">{item.name}</td>
                      <td className="py-2 px-3 text-right">{item.quantity}</td>
                      <td className="py-2 px-3 text-right">${item.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end">
                <div>
                  <p className="text-lg font-semibold">
                    Total: <span className="text-red-600">${order.totalPrice.toFixed(2)}</span>
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={generatePDF}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Download PDF
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Main Order Details */}
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

      {/* Order Info */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h1 className="text-base font-bold text-gray-800">Order #{order.order_no}</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 p-4">
          {/* Customer Details */}
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

            <div className="mt-4">
              <h2 className="text-sm font-semibold mb-2 text-gray-700">Rider Assignment</h2>

              {order.assignedRider ? ( // <-- ✅ If assigned, show rider details
                <div className="space-y-2 bg-gray-50 p-3 rounded-lg border">
                  <div>
                    <p className="text-[10px] text-gray-500">Name</p>
                    <p className="text-xs font-medium">
                      {order.assignedRider.firstName} {order.assignedRider.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500">Email</p>
                    <p className="text-xs">{order.assignedRider.email}</p>
                  </div>
                </div>
              ) : ( // Else show select box
                ridersLoading ? (
                  <div className="text-xs text-gray-500">Loading riders...</div>
                ) : (
                  <Select onValueChange={handleRiderAssignment}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Rider" />
                    </SelectTrigger>
                    <SelectContent>
                      <ScrollArea className="h-48">
                        {ridersData?.data?.users?.length > 0 ? (
                          ridersData.data.users.map((rider) => (
                            <SelectItem key={rider._id} value={rider._id}>
                              <div>
                                <p>{rider.firstName} {rider.lastName}</p>
                                <p className="text-[10px] text-gray-500">{rider.phone}</p>
                              </div>
                            </SelectItem>
                          ))
                        ) : (
                          <div className="text-center text-xs text-gray-400 p-2">
                            No riders found.
                          </div>
                        )}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                )
              )}
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h2 className="text-sm font-semibold mb-2 text-gray-700">Order Items</h2>
            <ScrollArea className="h-48 border rounded-lg">
              <div className="space-y-3 p-1 pr-4">
                {order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-3 border flex justify-between items-start"
                  >
                    <div>
                      <h3 className="text-xs font-medium text-gray-800">{item.prodId.name}</h3>
                      <p className="text-[10px] text-gray-500">
                        QTY: {item.quantity}
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

            <button
              onClick={handleDownloadInvoice}
              className="w-full mt-3 bg-red-600 text-white py-1.5 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center text-xs"
            >
              <Download className="mr-1.5 h-3 w-3" />
              View Invoice & Download
            </button>
          </div>
        </div>

        <div className="bg-gray-50 px-4 py-3 border-t">
          <div className="flex justify-between pt-2 font-bold">
            <span className="text-sm text-gray-800">Total</span>
            <span className="text-sm text-red-600">${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerOrder;
