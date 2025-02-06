const About = () => {
  return (
    <div className="min-h-screen">
      <div
        className="h-[400px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8")',
        }}
      >
        <div className="h-full w-full bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">About ShopHub</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-600 mb-8">
            ShopHub was founded with a simple mission: to provide quality products at affordable
            prices to our customers in Kenya. We believe in creating a seamless shopping
            experience that brings joy to our customers while maintaining the highest standards
            of service.
          </p>
          <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
          <p className="text-gray-600">
            We aim to be the leading e-commerce platform in Kenya, offering a wide range of
            products from local and international brands. Our commitment to excellence and
            customer satisfaction drives everything we do.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;