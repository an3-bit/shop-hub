import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="text-primary" />
                  <p>info@shophub.co.ke</p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-primary" />
                  <p>+254 700 000 000</p>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="text-primary" />
                  <p>123 Moi Avenue, Nairobi, Kenya</p>
                </div>
              </div>
            </div>
            
            <div>
              <form className="space-y-4">
                <Input placeholder="Your Name" />
                <Input type="email" placeholder="Your Email" />
                <Textarea placeholder="Your Message" className="h-32" />
                <Button className="w-full">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;