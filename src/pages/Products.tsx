import { ProductCard, type Product } from "@/components/ProductCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";

const initialProducts: Product[] = [
  {
    id: 1,
    title: "Classic Leather Shoes",
    price: 7999,
    description: "Premium leather shoes for everyday comfort",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 2,
    title: "Modern Laptop Pro",
    price: 129999,
    description: "High-performance laptop for professionals",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
  },
  {
    id: 3,
    title: "Cotton T-Shirt",
    price: 1499,
    description: "Comfortable cotton t-shirt for casual wear",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  },
  {
    id: 4,
    title: "Running Shoes",
    price: 5999,
    description: "Professional running shoes for athletes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
];

const Products = () => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "price">("name");

  const sortedProducts = [...initialProducts].sort((a, b) => {
    if (sortBy === "name") {
      return a.title.localeCompare(b.title);
    }
    return a.price - b.price;
  });

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Products</h1>
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
            {viewType === "grid" ? <List /> : <Grid />}
          </Button>
        </div>
      </div>

      <div
        className={`grid gap-6 ${
          viewType === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1"
        }`}
      >
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;