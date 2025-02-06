import { useState } from "react";
import { Plus, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Navbar } from "@/components/Navbar";
import { ProductCard, type Product } from "@/components/ProductCard";
import { ProductForm } from "@/components/ProductForm";
import { PromotionalBanner } from "@/components/PromotionalBanner";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const initialProducts: Product[] = [
  {
    id: 1,
    title: "Nike Air Max 270",
    price: 12000,
    description: "Premium comfort and style with Nike's latest Air technology.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 2,
    title: "MacBook Pro M2",
    price: 250000,
    description: "Powerful laptop for professionals with the latest M2 chip.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
  },
  {
    id: 3,
    title: "Designer T-Shirt",
    price: 2500,
    description: "Premium cotton t-shirt with modern design patterns.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  },
  {
    id: 4,
    title: "Wireless Earbuds",
    price: 8000,
    description: "High-quality wireless earbuds with noise cancellation.",
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
  },
];

const Index = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "price">("name");

  const handleAddProduct = (newProduct: Omit<Product, "id">) => {
    const product = {
      ...newProduct,
      id: Math.max(0, ...products.map((p) => p.id)) + 1,
    };
    setProducts([...products, product]);
    setIsDialogOpen(false);
    toast({
      title: "Success",
      description: "Product added successfully",
    });
  };

  const handleEditProduct = (updatedProduct: Omit<Product, "id">) => {
    if (!selectedProduct) return;
    const updatedProducts = products.map((p) =>
      p.id === selectedProduct.id ? { ...updatedProduct, id: p.id } : p
    );
    setProducts(updatedProducts);
    setIsDialogOpen(false);
    setSelectedProduct(undefined);
    toast({
      title: "Success",
      description: "Product updated successfully",
    });
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    toast({
      title: "Success",
      description: "Product deleted successfully",
    });
  };

  const openDialog = (product?: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "name") {
      return a.title.localeCompare(b.title);
    }
    return a.price - b.price;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Welcome to ShopHub</h1>
            <p className="text-xl mb-8">
              Discover amazing products at unbeatable prices. Shop with confidence
              and enjoy our exclusive deals.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <a href="/products">Shop Now</a>
            </Button>
          </div>
        </div>
      </div>

      <PromotionalBanner />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Our Products</h2>
              <p className="text-gray-600 mt-2">Discover our amazing collection</p>
            </div>
            <div className="flex items-center gap-4">
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
                onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}
                className="flex items-center gap-2"
              >
                {viewType === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                {viewType === "grid" ? "List View" : "Grid View"}
              </Button>
              <Button onClick={() => openDialog()} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Product
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
                onEdit={(p) => openDialog(p)}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        </div>

        <Testimonials />
      </main>

      <Footer />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <ProductForm
            product={selectedProduct}
            onSubmit={selectedProduct ? handleEditProduct : handleAddProduct}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;