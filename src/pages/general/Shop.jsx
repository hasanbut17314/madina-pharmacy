import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCategory } from "@/store/slices/shopSlice";
import { useGetProductsForUserQuery } from "@/api/productApi";
import { useAddItemToCartMutation } from "@/api/CartApi";
import { addToCart } from "@/store/slices/cartSlice";
import { useGetAllCategoriesQuery } from "@/api/catApi";

const Shop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Track loading state for each product individually
  const [loadingItems, setLoadingItems] = useState({});
  const [categoryMapping, setCategoryMapping] = useState({});
  const [categories, setCategories] = useState([]);

  const selectedCategory = useSelector(
    (state) => state.shop?.selectedCategory || "All"
  );

  // Fetch all categories
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetAllCategoriesQuery({
      page: 1,
      limit: 100, // Get a large number to ensure we get all categories
      search: "",
    });

  // Create a mapping of category IDs to names when categoriesData changes
  useEffect(() => {
    if (categoriesData?.data?.categories) {
      const mapping = { All: "All" };
      const categoryList = [{ _id: "All", name: "All" }];

      categoriesData.data.categories.forEach((category) => {
        mapping[category._id] = category.name;
        categoryList.push(category);
      });

      setCategoryMapping(mapping);
      setCategories(categoryList);
    }
  }, [categoriesData]);

  const { data, error, isLoading } = useGetProductsForUserQuery({
    page: 1,
    limit: 20,
    search: "",
    category: selectedCategory === "All" ? "" : selectedCategory,
    isFeatured: false,
  });

  const [addItemToCart] = useAddItemToCartMutation();

  const { data: productsData = {} } = data || {};
  const products = productsData.products || [];

  const handleAddToCart = async (product) => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {
      // Set loading state for this specific product
      setLoadingItems((prev) => ({ ...prev, [product._id]: true }));

      // Call the API to add the item to cart
      await addItemToCart(product._id).unwrap();

      // Update the Redux store
      dispatch(addToCart({ product, quantity: 1 }));
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    } finally {
      // Clear loading state for this specific product
      setLoadingItems((prev) => ({ ...prev, [product._id]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f6f1] px-2 py-4">
      <div className="max-w-6xl mx-auto mb-4">
        <div className="bg-white rounded-md shadow px-4 py-3 border border-[#e2dfdc]">
          <h2 className="text-base font-serif font-semibold text-[#2c2c2c] mb-2">
            Browse Products
          </h2>
          <div className="flex flex-col md:flex-row md:items-end gap-2">
            <div className="w-full md:w-64">
              <Label className="text-xs font-medium text-[#555]">
                Filter by Category
              </Label>
              <Select
                value={selectedCategory}
                onValueChange={(value) => dispatch(setSelectedCategory(value))}
              >
                <SelectTrigger className="mt-1 h-8 text-xs">
                  <SelectValue placeholder="Select Category">
                    {categoryMapping[selectedCategory] || "Select Category"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category._id}
                      value={category._id}
                      className="text-xs"
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
        {isLoading || categoriesLoading ? (
          <div className="col-span-full text-center text-gray-500 text-sm font-serif">
            Loading...
          </div>
        ) : error ? (
          <div className="col-span-full text-center text-red-500 text-sm font-serif">
            Failed to fetch products.
          </div>
        ) : products.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-sm font-serif">
            No products found.
          </div>
        ) : (
          products.map((product) => (
            <Card
              key={product._id}
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
                    onClick={() => handleAddToCart(product)}
                    disabled={loadingItems[product._id]}
                  >
                    {loadingItems[product._id] ? "Adding..." : "Add To Cart"}
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
