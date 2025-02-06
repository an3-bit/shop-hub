import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export const PromotionalBanner = () => {
  return (
    <div className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">Summer Sale is Live!</h2>
            <p className="text-lg mb-6">Get up to 50% off on selected items. Limited time offer!</p>
            <Button variant="secondary" className="group">
              Shop Now
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
              alt="Promotional Banner"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};