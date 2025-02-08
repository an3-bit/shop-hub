
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import PromotionalBanner from "@/components/PromotionalBanner";
import { Testimonials } from "@/components/Testimonials";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const categoryCards = [
  {
    id: 1,
    title: "Men's Clothing",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=2070&auto=format&fit=crop",
    category: "men's clothing"
  },
  {
    id: 2,
    title: "Women's Clothing",
    image: "https://images.unsplash.com/photo-1525845859779-54d477ff291f?q=80&w=1887&auto=format&fit=crop",
    category: "women's clothing"
  },
  {
    id: 3,
    title: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop",
    category: "electronics"
  }
];

const Index = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 py-32 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to ShopHub</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices. Shop with confidence
            and enjoy our exclusive deals.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href="/products">Explore Now</a>
          </Button>
        </div>
      </div>

      <PromotionalBanner />

      {/* Category Cards Section */}
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {categoryCards.map((card) => (
            <Card 
              key={card.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow group overflow-hidden"
              onClick={() => handleCategoryClick(card.category)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
};

export default Index;
