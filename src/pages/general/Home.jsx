import React from 'react';
import { ChevronRight, ShoppingCart, Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

// Placeholder data (you'd typically fetch this from an API)
const banners = [
  { 
    id: 1, 
    image: "banner1.png", 
    alt: "Summer Health Sale"
  },
  { 
    id: 2, 
    image: "banner1.png", 
    alt: "New Wellness Products"
  }
];

const featuredProducts = [
  { 
    id: 1, 
    name: "Vitamin C Supplement pack", 
    price: 19.99, 
    image: "product1.webp"
  },
  { 
    id: 2, 
    name: "Immunity Booster Pack ", 
    price: 29.99, 
    image: "product1.webp"
  },
  { 
    id: 3, 
    name: "Herbal Stress Relief pack", 
    price: 15.50, 
    image: "product1.webp"
  },
  { 
    id: 4, 
    name: "Omega-360 Fish Oil pack", 
    price: 22.99, 
    image: "product1.webp"
  },
  { 
    id: 5, 
    name: "Multivitamin Complex pack", 
    price: 24.50, 
    image: "product1.webp"
  },
  { 
    id: 6, 
    name: "Probiotic Supplement pack", 
    price: 18.75, 
    image: "product1.webp"
  }
];

const brands = [
  { id: 1, name: "Pharma Plus", logo: "abbott.webp" },
  { id: 2, name: "Wellness Co", logo: "abbott.webp" },
  { id: 3, name: "Natural Health", logo: "abbott.webp" },
  { id: 4, name: "Vital Care", logo: "abbott.webp" },
  { id: 5, name: "Medix", logo: "abbott.webp" },
  { id: 6, name: "HealthGuard", logo: "abbott.webp" }
];

const Home = () => {
  return (
    <div className="min-h-screen font-serif">

      {/* Banner Slider */}
      <section className="mb-6">
        <Carousel>
          <CarouselContent>
            {banners.map(banner => (
              <CarouselItem key={banner.id}>
                <div className="relative">
                  <img 
                    src={banner.image} 
                    alt={banner.alt} 
                    className="w-full h-[300px] md:h-[500px] object-cover rounded-md"
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
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Featured Products
          </h2>
          <Button variant="link" className="text-red-600 text-sm">
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {featuredProducts.map(product => (
            <Card 
              key={product.id} 
              className="border border-gray-100 py-0"
            >
              <CardContent className="p-1 md:p-2 text-center">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-24 md:h-32 object-cover mb-2 rounded-md"
                  />
                </div>
                <h3 className="text-xs md:text-sm font-medium mb-1">{product.name}</h3>
                <div className="flex justify-center items-center">
                  <span className="text-red-600 font-bold mr-2 text-xs md:text-sm">
                    ${product.price.toFixed(2)}
                  </span>
                  <Button 
                    size="sm" 
                    className="bg-red-600 hover:bg-red-700 h-6 md:h-8 text-xs"
                  >
                    <ShoppingCart className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" /> Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Brands Section */}
      <section className="px-4 mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          Our Trusted Brands
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {brands.map(brand => (
            <Card 
              key={brand.id} 
              className="flex justify-center items-center p-2 md:p-3 hover:shadow-md transition-shadow border border-gray-200"
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