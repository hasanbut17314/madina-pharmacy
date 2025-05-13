import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { useGetProductsForUserQuery } from "@/api/ProductApi";
import { useAddItemToCartMutation } from "@/api/CartApi";
import { addToCart } from "@/store/slices/cartSlice";
import { useGetAllCategoriesQuery } from "@/api/CatApi";

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loadingItems, setLoadingItems] = useState({});
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");

  const selectedCategory = useSelector(
    (state) => state.shop?.selectedCategory || "All"
  );

  // Fetch categories for the dropdown
  const { data: categoriesData, isLoading: categoriesLoading, error } =
    useGetAllCategoriesQuery({
      page: 1,
      limit: 100,
      search: "",
    });


  useEffect(() => {
    if (categoriesData?.data?.categories) {
      const categoryList = [{ _id: "All", name: "All" }];
      categoriesData.data.categories.forEach((category) => {
        categoryList.push(category);
      });

      setCategories(categoryList);
    }
  }, [categoriesData]);

  // Update current category when the Redux state changes
  useEffect(() => {
    setCurrentCategory(selectedCategory);
  }, [selectedCategory]);

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  // Fetch products based on category and search query
  const {
    data: productsData,
    isLoading: productsLoading,
    isError,
  } = useGetProductsForUserQuery({
    page: 1,
    limit: 30,
    search: searchQuery,
    category: currentCategory === "All" ? "" : currentCategory,
  });

  const [addItemToCart] = useAddItemToCartMutation();

  // Handle adding items to the cart
  const handleAddToCart = async (productId) => {
    if (loadingItems[productId]) return;

    try {
      setLoadingItems((prev) => ({ ...prev, [productId]: true }));
      await addItemToCart(productId).unwrap();
      dispatch(addToCart(productId));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  // Handle category change
  const handleCategoryChange = (value) => {
    dispatch(setSelectedCategory(value));
    setCurrentCategory(value);
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-8 px-4 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Label className="text-2xl font-semibold">Shop</Label>
        </div>
        <Select
          value={currentCategory}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category._id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsLoading ? (
          <p>Loading products...</p>
        ) : isError ? (
          <p>Error loading products.</p>
        ) : (
          productsData?.data?.products?.map((product) => (
            <Card key={product._id} className="bg-white shadow-lg">
              <CardContent className="p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover mb-4"
                />
                <h3 className="font-semibold text-xl mb-2">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="mt-4 text-lg font-semibold">{product.price}.00 Rs</p>
                <Button
                  onClick={() => handleAddToCart(product._id)}
                  className="mt-4 w-full"
                  disabled={loadingItems[product._id]}
                >
                  {loadingItems[product._id]
                    ? "Adding..."
                    : "Add to Cart"}
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Shop;