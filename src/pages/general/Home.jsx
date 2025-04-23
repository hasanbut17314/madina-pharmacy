import React, { useState, useEffect } from "react";
import { ChevronRight, ShoppingCart, Plus, Minus } from "lucide-react";
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

// Fetch data from API
const fetchProducts = async () => {
  const response = await fetch("/api/products");
  const data = await response.json();
  return data;
};

// Mock data for brands
const fetchBrands = async () => {
  return [
    { id: 1, name: "Brand A", logo: "/path/to/logoA.png" },
    { id: 2, name: "Brand B", logo: "/path/to/logoB.png" },
    // Add more mock brands as needed
  ];
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchAndSetData = async () => {
      const [productData, brandData] = await Promise.all([
        fetchProducts(),
        fetchBrands(),
      ]);
      setProducts(productData.filter((product) => product.isFeatured));
      setQuantities(
        productData.reduce((acc, product) => {
          acc[product.id] = 1;
          return acc;
        }, {})
      );
      setBrands(brandData);
    };
    fetchAndSetData();
  }, []);

  const decreaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, prevQuantities[productId] - 1),
    }));
  };

  const increaseQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  return (
    <div className="min-h-screen font-serif">
      {/* Banner Slider */}
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
            {products.map((product) => (
              <CarouselItem key={product.id}>
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[300px] md:h-[500px] object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
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
                <div className="flex justify-center items-center">
                  <Button
                    size="xs"
                    className="bg-red-600 mr-2"
                    onClick={() => decreaseQuantity(product.id)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">{quantities[product.id]}</span>
                  <Button
                    size="xs"
                    className="bg-red-600 ml-2"
                    onClick={() => increaseQuantity(product.id)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 h-6 md:h-8 text-xs mt-2"
                >
                  <ShoppingCart className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />{" "}
                  Add To Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Chatbot Section */}
      <ChatbotSection />

      {/* Features Section */}
      <FeatureSection />

      {/* Brands Section */}
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
                className="w-16 h-6 md:w-24 md:h-10 object-contain grayscale hover:grayscale-0 transition-all"
              />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
