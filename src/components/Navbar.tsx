import { ShoppingCart, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${searchQuery}`;
    }
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              ShopHub
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg shadow-md transition-all duration-300 text-gray-600 hover:bg-purple-600 hover:text-white border border-purple-400 ${
                  location.pathname === item.path ? "bg-purple-600 text-white" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/auth"
              className="px-4 py-2 rounded-lg shadow-md transition-all duration-300 text-gray-600 hover:bg-purple-600 hover:text-white border border-purple-400"
            >
              Sign In
            </Link>
          </div>

          {/* Search, Cart, and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {/* Search Bar (Hidden on Mobile) */}
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-primary"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            {/* Search Icon (Visible on Mobile) */}
            <Button
              variant="ghost"
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Search className="h-6 w-6" />
            </Button>

            {/* Cart Icon */}
            <Link to="/cart">
              <Button variant="ghost" className="relative p-2">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu (Visible on Small Screens) */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {/* Search Bar for Mobile */}
            <div className="relative mt-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-primary"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-2 mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg shadow-md transition-all duration-300 text-gray-600 hover:bg-purple-600 hover:text-white border border-purple-400 ${
                    location.pathname === item.path ? "bg-purple-600 text-white" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/auth"
                className="px-4 py-2 rounded-lg shadow-md transition-all duration-300 text-gray-600 hover:bg-purple-600 hover:text-white border border-purple-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};