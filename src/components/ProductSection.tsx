
import React, { useState } from "react";
import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category?: string;
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
  onEditProduct,
  onDeleteProduct,
}) => {
  const [filter, setFilter] = useState<"all" | "shoes" | "clothes" | "laptops">("all");

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => filter === "all" || product.category?.toLowerCase() === filter)
    .sort((a, b) => {
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return a.price - b.price;
    });

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Filtering/Sorting Options */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex gap-4 mb-4 md:mb-0">
          <Button
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "default" : "outline"}
          >
            All
          </Button>
          <Button
            onClick={() => setFilter("shoes")}
            variant={filter === "shoes" ? "default" : "outline"}
          >
            Shoes
          </Button>
          <Button
            onClick={() => setFilter("clothes")}
            variant={filter === "clothes" ? "default" : "outline"}
          >
            Clothes
          </Button>
          <Button
            onClick={() => setFilter("laptops")}
            variant={filter === "laptops" ? "default" : "outline"}
          >
            Laptops
          </Button>
        </div>
        <div className="flex gap-4">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as "name" | "price")}
            className="border rounded-md px-3 py-2"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
          </select>
          <Button variant="outline" onClick={onViewChange} className="flex items-center gap-2">
            {viewType === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
            {viewType === "grid" ? "List View" : "Grid View"}
          </Button>
          <Button onClick={onAddProduct} className="flex items-center gap-2">
            Add Product
          </Button>
        </div>
      </div>

      {/* Product Listing */}
      <div
        className={`grid gap-6 ${
          viewType === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1"
        }`}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`bg-white rounded-lg shadow-lg overflow-hidden ${
              viewType === "list" ? "flex items-center" : ""
            }`}
          >
            <img
              src={product.image}
              alt={product.title}
              className={viewType === "list" ? "w-1/3 h-48 object-cover" : "w-full h-48 object-cover"}
            />
            <div className={viewType === "list" ? "p-4 flex-1" : "p-4"}>
              <h3 className="text-xl font-semibold text-gray-800">{product.title}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <p className="text-gray-500 text-sm mt-2">{product.description}</p>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditProduct(product)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDeleteProduct(product.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
