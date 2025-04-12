import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Shop = () => {
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

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "All" || product.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-[#f9f6f1] px-2 py-4">
      <div className="max-w-6xl mx-auto mb-4">
        <div className="bg-white rounded-md shadow px-4 py-3 border border-[#e2dfdc]">
          <h2 className="text-base font-serif font-semibold text-[#2c2c2c] mb-2">
            Browse Products
          </h2>
          <div className="flex flex-col md:flex-row md:items-end gap-2">
            <div className="w-full md:w-64">
              <Label className="text-xs font-medium text-[#555]">Filter by Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="mt-1 h-8 text-xs">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="text-xs">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-sm font-serif">
            No products found.
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="bg-white border border-[#e4e4e4] rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <CardContent className="p-2">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-36 object-cover rounded mb-1"
                />
                <h3 className="text-sm font-serif font-medium text-[#333] mb-0.5">
                  {product.name}
                </h3>
                <div className="text-[#b33] text-sm font-semibold mb-1">
                  ${product.price.toFixed(2)}
                </div>
                <div className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-3 border-[#b33] text-[#b33] text-xs hover:bg-[#f7eaea]"
                  >
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
