import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-primary">ShopHub</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              Products
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center">
            <Button variant="ghost" className="relative p-2">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-cart-bounce">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-gray-600 hover:text-primary transition-colors px-4 py-2"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-primary transition-colors px-4 py-2"
              >
                Products
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-primary transition-colors px-4 py-2"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-primary transition-colors px-4 py-2"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};