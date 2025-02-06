import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Navbar } from "@/components/Navbar";
import { ProductCard, type Product } from "@/components/ProductCard";
import { ProductForm } from "@/components/ProductForm";

// Mock initial products
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-2">Manage your product inventory</p>
          </div>
          <Button onClick={() => openDialog()} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={(p) => openDialog(p)}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>

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
      </main>
    </div>
  );
};

export default Index;