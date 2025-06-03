import React from "react";
import {
  Users,
  Package,
  DollarSign,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SideBar } from "../../components/basics";

import {
  useGetTotalAnalyticsQuery,
  useGetRecentOrdersQuery,
  useGetMonthlySalesOverviewQuery,
  useGetSalesByCategoryQuery,
} from "@/api/productApi";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

function AdminDashboard() {
  const { data: totalAnalyticsData, isLoading: isAnalyticsLoading } =
    useGetTotalAnalyticsQuery();

  const { data: recentOrdersData, isLoading: isRecentOrdersLoading } =
    useGetRecentOrdersQuery();

  const { data: monthlySalesData, isLoading: isMonthlySalesLoading } =
    useGetMonthlySalesOverviewQuery();

  const { data: categorySalesData, isLoading: isCategorySalesLoading } =
    useGetSalesByCategoryQuery();

  const total = totalAnalyticsData?.data ?? {};

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 p-4 md:p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Madina Pharmacy Dashboard
          </h1>
          <p className="text-sm text-gray-500">Welcome back, Admin!</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview" className="text-xs">
              Overview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-1">
                  <CardTitle className="text-xs font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-3 w-3 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">
                    {isAnalyticsLoading ? "..." : total.totalRevenue ?? 0} Pkr
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-1">
                  <CardTitle className="text-xs font-medium">Customers</CardTitle>
                  <Users className="h-3 w-3 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">
                    {isAnalyticsLoading ? "..." : total.totalUsers ?? 0}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-1">
                  <CardTitle className="text-xs font-medium">Orders</CardTitle>
                  <Package className="h-3 w-3 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">
                    {isAnalyticsLoading ? "..." : total.totalOrders ?? 0}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-1">
                  <CardTitle className="text-xs font-medium">Products</CardTitle>
                  <Calendar className="h-3 w-3 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">
                    {isAnalyticsLoading ? "..." : total.totalProducts ?? 0}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Monthly Sales Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">Monthly Sales Overview</CardTitle>
                  <CardDescription className="text-xs text-gray-500">
                    Sales, Orders and Average Order Value per Month
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[250px]">
                  {isMonthlySalesLoading ? (
                    <p className="text-xs text-gray-400">Loading chart...</p>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlySalesData?.data ?? []}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" fill="#8884d8" name="Sales" />
                        <Bar dataKey="orders" fill="#82ca9d" name="Orders" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              {/* Sales by Category */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">Sales by Category</CardTitle>
                  <CardDescription className="text-xs text-gray-500">
                    Total revenue generated per category
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[250px]">
                  {isCategorySalesLoading ? (
                    <p className="text-xs text-gray-400">Loading chart...</p>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          dataKey="totalSales"
                          data={categorySalesData?.data ?? []}
                          nameKey="_id"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          {(categorySalesData?.data ?? []).map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders Table */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Recent Orders</CardTitle>
                <CardDescription className="text-xs">
                  Last few transactions from your pharmacy
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isRecentOrdersLoading ? (
                  <p className="text-xs text-gray-400">Loading orders...</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left pb-2">Order No</th>
                          <th className="text-left pb-2">Customer</th>
                          <th className="text-left pb-2">Date</th>
                          <th className="text-left pb-2">Total</th>
                          <th className="text-left pb-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrdersData?.data?.slice(0, 5).map((order) => (
                          <tr key={order._id} className="border-b last:border-0">
                            <td className="py-2">{order.order_no}</td>
                            <td className="py-2">
                              {order.userId?.firstName} {order.userId?.lastName}
                            </td>
                            <td className="py-2">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-2">Rs.{order.totalPrice}</td>
                            <td className="py-2">
                              <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminDashboard;
