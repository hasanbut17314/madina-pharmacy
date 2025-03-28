import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Shop = () => {
  // Initial products state
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Paracetamol",
      price: 5.99,
      category: "Medicine",
      img: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      name: "Vitamin C Supplement",
      price: 8.5,
      category: "Supplements",
      img: "https://picsum.photos/200/301",
    },
    {
      id: 3,
      name: "Hand Sanitizer",
      price: 3.75,
      category: "Hygiene",
      img: "https://picsum.photos/200/302",
    },
    {
      id: 4,
      name: "Multivitamin Tablets",
      price: 12.99,
      category: "Supplements",
      img: "https://picsum.photos/200/303",
    },
    {
      id: 5,
      name: "Antiseptic Cream",
      price: 4.5,
      category: "Medicine",
      img: "https://picsum.photos/200/304",
    },
    {
      id: 6,
      name: "Face Mask",
      price: 2.99,
      category: "Hygiene",
      img: "https://picsum.photos/200/305",
    },
  ]);

  // State for filtering
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter products
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-6xl mx-auto mb-6">
        <CardContent className="pt-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label>Search Products</Label>
              <Input
                placeholder="Search by product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label>Filter by Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No products found.
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-4">
                <div className="text-sm text-gray-500 mb-4">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-56 object-cover"
                  />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <span className="text-red-600 font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-center">
                  <Button variant="destructive" size="sm">
                    Add To Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Shop;
