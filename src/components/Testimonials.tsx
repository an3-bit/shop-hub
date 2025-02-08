import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment: "Amazing products and excellent service! Will definitely shop here again.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Mike Thompson",
    rating: 4,
    comment: "Great selection of items. The quality is outstanding.",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
 
  {
    id: 3,
    name: "John Smith",
    rating: 5,
    comment: "Exceptional quality and fast shipping. Highly recommended!",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 3 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-[#D3E4FD] overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="relative">
          <div 
            className="flex flex-wrap justify-center transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full sm:w-1/2 lg:w-1/3 px-4 flex justify-center"
              >
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mb-3"
                  />
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <div className="flex justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{testimonial.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
