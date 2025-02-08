
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";

const PromotionalBanner = () => {
  const navigate = useNavigate();

  const handleGrabDeal = (category: string) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-500 py-12 px-6 text-white">
      <div className="container mx-auto">
        {/* Featured Products Highlight */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <img
                src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Premium Laptop"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold">Premium Laptop</h3>
              <p className="mt-2 text-gray-100">Experience top-notch performance with our latest laptop model.</p>
              <button 
                onClick={() => handleGrabDeal('electronics')}
                className="mt-4 bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
              >
                Shop Now
              </button>
            </div>

            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <img
                src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Smart Watch"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold">Smart Watch</h3>
              <p className="mt-2 text-gray-100">Stay connected with our latest smartwatch collection.</p>
              <button 
                onClick={() => handleGrabDeal('electronics')}
                className="mt-4 bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
              >
                Shop Now
              </button>
            </div>

            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <img
                src="https://images.pexels.com/photos/2531156/pexels-photo-2531156.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Premium Headphones"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold">Premium Headphones</h3>
              <p className="mt-2 text-gray-100">Immerse yourself in crystal-clear audio experience.</p>
              <button 
                onClick={() => handleGrabDeal('electronics')}
                className="mt-4 bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Current Offers/Deals */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Current Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 1, title: "50% Off on Shoes", image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600", category: "men's clothing" },
              { id: 2, title: "Buy 1 Get 1 Free on Clothes", image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600", category: "women's clothing" },
              { id: 3, title: "Laptops Starting at $499", image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600", category: "electronics" },
            ].map((offer) => (
              <div key={offer.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={offer.image} alt={offer.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{offer.title}</h3>
                  <button 
                    onClick={() => handleGrabDeal(offer.category)}
                    className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300"
                  >
                    Grab Deal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;
