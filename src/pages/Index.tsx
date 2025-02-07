import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import PromotionalBanner from "@/components/PromotionalBanner";
import { Testimonials } from "@/components/Testimonials";
import ProductSection from "@/components/ProductSection";
import { type Product } from "@/components/ProductCard";

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "price">("name");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    return sortBy === "name" ? a.title.localeCompare(b.title) : a.price - b.price;
  });

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

      {/* Product Listing Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <div className="flex gap-4">
            <select
              className="border rounded-md px-3 py-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "name" | "price")}
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}
            >
              {viewType === "grid" ? "📃" : "🔲"}
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading products...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <ProductSection
            products={sortedProducts}
            viewType={viewType}
            sortBy={sortBy}
            onSortChange={(value) => setSortBy(value as "name" | "price")}
            onViewChange={() => setViewType(viewType === "grid" ? "list" : "grid")}
          />
        )}
      </div>

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
};

export default Index;
