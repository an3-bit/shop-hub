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
import { ProductSection } from "@/components/ProductSection";

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
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-20"
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

      {/* Promotional Banner */}
      <PromotionalBanner />

      {/* Product Listing Section */}
      <ProductSection
        products={sortedProducts}
        viewType={viewType}
        sortBy={sortBy}
        onSortChange={(value) => setSortBy(value as "name" | "price")}
        onViewChange={() => setViewType(viewType === "grid" ? "list" : "grid")}
        onAddProduct={() => openDialog()}
        onEditProduct={(product) => openDialog(product)}
        onDeleteProduct={handleDeleteProduct}
      />

      {/* Testimonials */}
      <Testimonials />

      {/* Footer */}
      <Footer />

      {/* Add/Edit Product Dialog */}
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