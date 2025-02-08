
import React, { useState } from "react";
import { Grid, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ProductCard } from "./ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface ProductSectionProps {
  products: Product[];
  viewType: "grid" | "list";
  sortBy: "name" | "price";
  onSortChange: (value: "name" | "price") => void;
  onViewChange: () => void;
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: number) => void;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  viewType,
  sortBy,
  onSortChange,
  onViewChange,
  onAddProduct,
}) => {
  const [filter, setFilter] = useState<"all" | "shoes" | "clothes" | "electronics">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<"all" | "under5k" | "5kTo20k" | "above20k">("all");

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = filter === "all" || product.category === filter;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriceRange = (() => {
        switch (priceRange) {
          case "under5k":
            return product.price < 5000;
          case "5kTo20k":
            return product.price >= 5000 && product.price <= 20000;
          case "above20k":
            return product.price > 20000;
          default:
            return true;
        }
      })();
      return matchesCategory && matchesSearch && matchesPriceRange;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return a.price - b.price;
    });

  return (
    <section className="bg-[#F1F0FB] py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Our Products</h2>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="shoes">Shoes</SelectItem>
                <SelectItem value="clothes">Clothes</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={(value: any) => setPriceRange(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under5k">Under 5,000</SelectItem>
                <SelectItem value="5kTo20k">5,000 - 20,000</SelectItem>
                <SelectItem value="above20k">Above 20,000</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="price">Sort by Price</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={onViewChange} className="flex items-center gap-2">
              {viewType === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              {viewType === "grid" ? "List View" : "Grid View"}
            </Button>

            <Button onClick={onAddProduct} className="flex items-center gap-2">
              Add Product
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div
          className={`grid gap-6 ${
            viewType === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;

