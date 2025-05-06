import React, { useState, useEffect } from "react";
import { ChevronRight, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ChatbotSection from "../../components/sections/ChatbotSection";
import FeatureSection from "../../components/sections/FeatureSection";
import { useGetProductsForUserQuery } from "@/api/ProductApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { useAddItemToCartMutation } from "@/api/CartApi";

// Mock data for brands (unchanged)
const fetchBrands = async () => {
  return [
    { id: 1, name: "Brand A", logo: "/abbott.webp" },
    { id: 2, name: "Brand B", logo: "/nestle.png" },
    { id: 4, name: "Brand D", logo: "/reckitt.png" },
    // Add more mock brands as needed
  ];
};

const Home = () => {
  const [brands, setBrands] = useState([]);
  const [loadingItems, setLoadingItems] = useState({}); // Track loading state for each product
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addItemToCart] = useAddItemToCartMutation();

  // Use the same query hook as in Shop page, but with isFeatured set to true
  const { data, error, isLoading } = useGetProductsForUserQuery({
    page: 1,
    limit: 20,
    search: "",
    category: "",
    isFeatured: true,
  });

  const { data: productsData = {} } = data || {};
  const products = productsData.products || [];

  useEffect(() => {
    const loadBrands = async () => {
      const brandData = await fetchBrands();
      setBrands(brandData);
    };
    loadBrands();
  }, []);

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
    <div className="min-h-screen font-serif">
      {/* Banner Slider (unchanged) */}
      <section className="mb-6">
        <Carousel
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {["/2.jpg", "/banner1.png", "/3.jpg"].map(
              (image, index) => (
                <CarouselItem key={index}>
                  <div className="relative">
                    <img
                      src={image}
                      alt={`Carousel ${index}`}
                      className="w-full h-[300px] md:h-[500px] object-cover"
                    />
                  </div>
                </CarouselItem>
              )
            )}
          </CarouselContent>
          <CarouselPrevious className="left-4 z-20 bg-white/20 hover:bg-white/30" />
          <CarouselNext className="right-4 z-20 bg-white/20 hover:bg-white/30" />
        </Carousel>
      </section>

      {/* Featured Products */}
      <section className="px-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 underline">
            Featured Products
          </h2>
          <Button variant="link" className="text-red-600 text-sm">
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-500 py-8">
            Loading featured products...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            Failed to load products
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No featured products available
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {products.map((product) => (
              <Card
                key={product._id}
                className="border border-gray-100 py-0 shadow shadow-gray-200 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out"
              >
                <CardContent className="p-1 md:p-2 text-center">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-24 md:h-32 object-cover mb-2 rounded-md"
                    />
                  </div>
                  <h3 className="text-xs md:text-sm font-medium mb-1">
                    {product.name}
                  </h3>
                  <p className="text-red-600 font-bold mb-2 text-xs md:text-sm">
                    ${product.price.toFixed(2)}
                  </p>
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 h-6 md:h-8 text-xs"
                    onClick={() => handleAddToCart(product)}
                    disabled={loadingItems[product._id]}
                  >
                    <ShoppingCart className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />{" "}
                    {loadingItems[product._id] ? "Adding..." : "Add To Cart"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Chatbot Section (unchanged) */}
      <ChatbotSection />

      {/* Features Section (unchanged) */}
      <FeatureSection />

      {/* Brands Section (unchanged) */}
      <section className="px-4 mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 underline">
          Our Trusted Brands
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {brands.map((brand) => (
            <Card
              key={brand.id}
              className="flex justify-center items-center p-2 md:p-3 rounded-md cursor-pointer bg-gray-50 hover:shadow-md transition-shadow border border-gray-200"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className=" h-6 md:h-10 object-contain grayscale hover:grayscale-0 transition-all"
              />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
