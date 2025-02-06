import React from 'react';

const PromotionalBanner = () => {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-500 py-12 px-6 text-white">
      <div className="container mx-auto">
        {/* Featured Product Highlight */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Featured Product</h2>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Featured Product"
              className="w-full md:w-1/3 rounded-lg shadow-lg"
            />
            <div>
              <h3 className="text-2xl font-semibold">Premium Laptop</h3>
              <p className="mt-2">Experience top-notch performance with our latest laptop model.</p>
              <button className="mt-4 bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
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
              { id: 1, title: "50% Off on Shoes", image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600" },
              { id: 2, title: "Buy 1 Get 1 Free on Clothes", image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600" },
              { id: 3, title: "Laptops Starting at $499", image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600" },
            ].map((offer) => (
              <div key={offer.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={offer.image} alt={offer.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{offer.title}</h3>
                  <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300">
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