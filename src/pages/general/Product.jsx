import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Tag, Layers } from "lucide-react";

const Product = () => {
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: 1,
    name: "Vitamin C Supplement",
    category: "Supplements",
    price: 8.5,
    description:
      "High-potency Vitamin C supplement to boost your immune system and support overall health. Supports immune function and provides antioxidant protection.",
    imageUrl: "/dummy-product-image.jpg",
  };

  const recommendedProducts = [
    {
      id: 2,
      name: "Multivitamin Tablets",
      category: "Supplements",
      price: 12.99,
      imageUrl: "/dummy-recommended-product-1.jpg",
    },
    {
      id: 3,
      name: "Zinc Supplement",
      category: "Supplements",
      price: 7.5,
      imageUrl: "/dummy-recommended-product-2.jpg",
    },
    {
      id: 4,
      name: "Omega-3 Fish Oil",
      category: "Supplements",
      price: 15.99,
      imageUrl: "/dummy-recommended-product-3.jpg",
    },
  ];

  const handleAddToCart = () => {
    // Placeholder for add to cart functionality
    alert(`Added ${quantity} ${product.name}(s) to cart`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Madina Pharmacy - Product Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-w-full h-auto object-contain rounded-lg"
              />
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h2>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="flex items-center text-gray-600">
                    <Layers className="mr-2 h-5 w-5" />
                    <span>{product.category}</span>
                  </div>
                  <div className="flex items-center text-red-600">
                    <Tag className="mr-2 h-5 w-5" />
                    <span className="font-semibold">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="mr-2"
                  >
                    -
                  </Button>
                  <span className="mx-4 font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="ml-2"
                  >
                    +
                  </Button>
                </div>

                <Button onClick={handleAddToCart} className="flex items-center">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Recommended Products Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Recommended Products</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {recommendedProducts.map((recProduct) => (
                <Card
                  key={recProduct.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center">
                      <img
                        src={recProduct.imageUrl}
                        alt={recProduct.name}
                        className="w-full h-40 object-contain mb-4 rounded-lg"
                      />
                      <h4 className="text-lg font-semibold text-center mb-2">
                        {recProduct.name}
                      </h4>
                      <div className="flex items-center text-red-600">
                        <Tag className="mr-2 h-4 w-4" />
                        <span className="font-semibold">
                          ${recProduct.price.toFixed(2)}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-4 w-full"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Product;
