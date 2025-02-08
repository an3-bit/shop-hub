
import { useState, useEffect } from "react";
import { ProductCard, type Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "price">("name");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch products from FakeStoreAPI
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

  // ✅ Sort products dynamically
  const sortedProducts = [...products].sort((a, b) => {
    return sortBy === "name" ? a.title.localeCompare(b.title) : a.price - b.price;
  });

  // ✅ Function to delete a product
  const deleteProduct = async (id: number) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product.");
      }
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      alert("Error deleting product. Please try again.");
    }
  };

  // ✅ Function to add a new product (Fake API allows testing, but doesn't persist)
  const addProduct = async () => {
    const newProduct = {
      title: "New Sample Product",
      price: 99.99,
      description: "This is a test product",
      image: "https://via.placeholder.com/150",
      category: "electronics",
    };

    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to add product.");
      }

      const addedProduct = await response.json();
      setProducts([...products, { ...addedProduct, id: products.length + 1 }]);
    } catch (err) {
      alert("Error adding product. Please try again.");
    }
  };

  // ✅ Handle loading and errors
  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

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
          {/* ✅ Add Product Button */}
          <Button onClick={addProduct} variant="default">
            Add Product
          </Button>
        </div>
      </div>

      {/* ✅ Display products with delete functionality */}
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
            onDelete={deleteProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
