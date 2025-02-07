import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash, Edit } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  // Fetch products from API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Handle Add/Edit Product
  const handleSaveProduct = (product: Product) => {
    if (selectedProduct) {
      // Edit existing product
      setProducts(products.map((p) => (p.id === selectedProduct.id ? product : p)));
      toast({ title: "Product Updated", description: "Changes saved successfully." });
    } else {
      // Add new product
      const newProduct = { ...product, id: Date.now() };
      setProducts([...products, newProduct]);
      toast({ title: "Product Added", description: "New product added successfully." });
    }
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  // Handle Delete Product
  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
      toast({ title: "Product Deleted", description: "Product removed successfully." });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-5 h-5 mr-2" /> Add Product
        </Button>
      </div>

      {/* Products Table */}
      <Table>
        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th>Title</Th>
            <Th>Price</Th>
            <Th>Category</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td><img src={product.image} alt={product.title} className="w-12 h-12" /></Td>
              <Td>{product.title}</Td>
              <Td>${product.price}</Td>
              <Td>{product.category}</Td>
              <Td>
                <Button variant="outline" size="icon" onClick={() => { setSelectedProduct(product); setIsDialogOpen(true); }}>
                  <Edit className="w-5 h-5" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                  <Trash className="w-5 h-5" />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedProduct ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <ProductForm product={selectedProduct} onSubmit={handleSaveProduct} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;

// Product Form Component
const ProductForm = ({ product, onSubmit }: { product: Product | null; onSubmit: (product: Product) => void }) => {
  const [formData, setFormData] = useState<Product>(product || {
    id: 0,
    title: "",
    price: 0,
    description: "",
    image: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
      <Input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} />
      <Input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
      <Input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
      <Button onClick={() => onSubmit(formData)}>Save</Button>
    </div>
  );
};
