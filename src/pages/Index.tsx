import { useState } from "react";
import { Plus } from "lucide-react";
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
    title: "Smartphone X",
    price: 999.99,
    description: "Latest smartphone with amazing features and powerful camera system.",
    image: "https://picsum.photos/400/400",
  },
  {
    id: 2,
    title: "Laptop Pro",
    price: 1499.99,
    description: "Professional laptop with high performance and long battery life.",
    image: "https://picsum.photos/400/401",
  },
  {
    id: 3,
    title: "Wireless Earbuds",
    price: 199.99,
    description: "Premium wireless earbuds with noise cancellation technology.",
    image: "https://picsum.photos/400/402",
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
      <PromotionalBanner />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Products Section */}
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
              <Button onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}>
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

      {/* Product Form Dialog */}
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
