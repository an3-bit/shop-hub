import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

// Admin Login Component (unchanged)
export const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("adminUser");
    if (isAdminLoggedIn) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const validEmail = "admin@example.com";
    const validPassword = "admin123";

    if (credentials.email.trim() === validEmail && credentials.password.trim() === validPassword) {
      localStorage.setItem("adminUser", "true");
      toast({ title: "Success", description: "Logged in successfully!" });
      navigate("/admin/dashboard");
    } else {
      toast({ title: "Error", description: "Invalid email or password" });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="space-y-4 w-full max-w-md p-8 border rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
          />
        </div>
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
  );
};

// Admin Dashboard Component with Analytics Section
export const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    const isAdminLoggedIn = localStorage.getItem("adminUser");
    if (!isAdminLoggedIn) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleSaveProduct = (product: Product) => {
    if (selectedProduct) {
      setProducts(products.map((p) => (p.id === selectedProduct.id ? product : p)));
      toast({ title: "Product Updated", description: "Changes saved successfully." });
    } else {
      const newProduct = { ...product, id: Date.now() };
      setProducts([...products, newProduct]);
      toast({ title: "Product Added", description: "New product added successfully." });
    }
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
      toast({ title: "Product Deleted", description: "Product removed successfully." });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  // Mock data for analytics
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales ($)",
        data: [5000, 7000, 4500, 8000, 6000, 9000],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const productComparisonData = {
    labels: products.map((p) => p.title),
    datasets: [
      {
        label: "Price ($)",
        data: products.map((p) => p.price),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const inventoryStatusData = {
    labels: ["In Stock", "Out of Stock"],
    datasets: [
      {
        label: "Inventory",
        data: [products.length, 5], // Mock data: 5 out of stock items
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <Button variant="destructive" onClick={handleLogout}>Logout</Button>
      </div>

      {/* Analytics Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4 text-center">Sales Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="text-lg font-semibold mb-4">Sales Performance</h4>
            <Line data={salesData} />
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="text-lg font-semibold mb-4">Product Comparison</h4>
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                <Bar
                  data={productComparisonData}
                  options={{
                    indexAxis: "x",
                    scales: {
                      x: {
                        ticks: {
                          autoSkip: false,
                          maxRotation: 90,
                          minRotation: 45,
                        },
                      },
                      y: {
                        beginAtZero: true,
                      },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    barThickness: 30, // Adjust bar thickness
                  }}
                />
              </div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="text-lg font-semibold mb-4">Inventory Status</h4>
            <Pie data={inventoryStatusData} />
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Manage Products</h3>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-5 h-5 mr-2" /> Add Product
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell><img src={product.image} alt={product.title} className="w-12 h-12" /></TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Button variant="outline" size="icon" onClick={() => { setSelectedProduct(product); setIsDialogOpen(true); }}>
                    <Edit className="w-5 h-5" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                    <Trash className="w-5 h-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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

// Product Form Component (unchanged)
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

export default Dashboard;