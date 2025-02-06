import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const PromotionalBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold mb-4">Welcome to ShopHub!</h2>
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2">Special Offers</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-300">★</span>
                    Get 50% off on all electronics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-300">★</span>
                    Free shipping on orders above KES 10,000
                  </li>
                </ul>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2">Featured Products</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-300">⚡</span>
                    Latest iPhone - KES 150,000
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-300">⚡</span>
                    Nike Air Max - KES 12,000
                  </li>
                </ul>
              </div>
            </div>
            <Link to="/products">
              <Button variant="secondary" className="group">
                Shop Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop"
              alt="Shopping Banner"
              className="rounded-lg shadow-xl object-cover h-[400px] w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};