import React from 'react';
import { 
  Activity, 
  Users, 
  Package, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  PieChart, 
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function AdminDashboard() {
  // Sample data for charts and statistics
  const revenueData = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 10800 },
    { month: 'Mar', revenue: 14200 },
    { month: 'Apr', revenue: 15800 },
    { month: 'May', revenue: 16900 },
    { month: 'Jun', revenue: 18200 }
  ];

  const inventoryAlerts = [
    { id: 1, medication: 'Amoxicillin 500mg', status: 'Low Stock', remaining: 15 },
    { id: 2, medication: 'Lisinopril 10mg', status: 'Low Stock', remaining: 8 },
    { id: 3, medication: 'Metformin 850mg', status: 'Expiring Soon', remaining: 120 },
    { id: 4, medication: 'Amlodipine 5mg', status: 'Out of Stock', remaining: 0 }
  ];

  const topSellingMeds = [
    { id: 1, medication: 'Paracetamol 500mg', sales: 234, revenue: 1170 },
    { id: 2, medication: 'Metformin 500mg', sales: 187, revenue: 1496 },
    { id: 3, medication: 'Ibuprofen 400mg', sales: 154, revenue: 924 },
    { id: 4, medication: 'Amoxicillin 250mg', sales: 132, revenue: 1584 }
  ];

  // Generate simple revenue chart using div heights
  const maxRevenue = Math.max(...revenueData.map(item => item.revenue));

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Madina Pharmacy Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, Admin!</p>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-1">
                <CardTitle className="text-xs font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-3 w-3 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">$88,400</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-1">
                <CardTitle className="text-xs font-medium">Customers</CardTitle>
                <Users className="h-3 w-3 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">1,245</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +3.2% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-1">
                <CardTitle className="text-xs font-medium">Orders</CardTitle>
                <Package className="h-3 w-3 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">932</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.1% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-1">
                <CardTitle className="text-xs font-medium">Prescriptions</CardTitle>
                <Calendar className="h-3 w-3 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">512</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5.3% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Revenue Trend</CardTitle>
                <CardDescription className="text-xs">Last 6 months of pharmacy revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-48 pt-2">
                  {revenueData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-blue-500 rounded-t-md" 
                        style={{ height: `${(item.revenue / maxRevenue) * 160}px` }}
                      ></div>
                      <span className="text-xs mt-1">{item.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Sales Distribution</CardTitle>
                <CardDescription className="text-xs">Product category breakdown</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  {/* Simple pie chart representation */}
                  <div className="absolute inset-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="16" strokeDasharray="75 25" transform="rotate(-90 50 50)" />
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="16" strokeDasharray="35 65" transform="rotate(75 50 50)" />
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f97316" strokeWidth="16" strokeDasharray="23 77" transform="rotate(202 50 50)" />
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8b5cf6" strokeWidth="16" strokeDasharray="17 83" transform="rotate(290 50 50)" />
                    </svg>
                  </div>
                  <PieChart className="h-6 w-6 text-gray-400" />
                </div>
              </CardContent>
              <div className="px-4 pb-3 grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                  <span>Prescription (42%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                  <span>OTC (28%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mr-1"></div>
                  <span>Supplements (18%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-1"></div>
                  <span>Health Items (12%)</span>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Secondary Stats Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-sm">
                  <AlertTriangle className="h-4 w-4 mr-1 text-amber-500" />
                  Inventory Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-2">Medication</th>
                        <th className="text-left pb-2">Status</th>
                        <th className="text-right pb-2">Remaining</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventoryAlerts.map(item => (
                        <tr key={item.id} className="border-b last:border-0">
                          <td className="py-2">{item.medication}</td>
                          <td className="py-2">
                            <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                              item.status === 'Low Stock' ? 'bg-amber-100 text-amber-800' :
                              item.status === 'Out of Stock' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-2 text-right">{item.remaining} units</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Top Selling Medications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-2">Medication</th>
                        <th className="text-right pb-2">Sales</th>
                        <th className="text-right pb-2">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topSellingMeds.map(item => (
                        <tr key={item.id} className="border-b last:border-0">
                          <td className="py-2">{item.medication}</td>
                          <td className="py-2 text-right">{item.sales} units</td>
                          <td className="py-2 text-right">${item.revenue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="inventory">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Inventory Management</CardTitle>
              <CardDescription className="text-xs">Control and monitor your pharmacy's stock</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-xs text-gray-500">Inventory tab content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sales">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Sales Analytics</CardTitle>
              <CardDescription className="text-xs">Detailed sales and transaction data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-xs text-gray-500">Sales tab content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Customer Management</CardTitle>
              <CardDescription className="text-xs">Patient records and customer analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-xs text-gray-500">Customers tab content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminDashboard;