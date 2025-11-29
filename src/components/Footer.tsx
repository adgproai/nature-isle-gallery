import { Mail, Phone, MapPin, Youtube, Facebook, Instagram } from "lucide-react";
import { NavLink } from "./NavLink";
import logo from "@/assets/logo.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-deep text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="EmeraldPics Logo" className="w-10 h-10 object-contain" />
              <div>
                <h3 className="font-serif text-2xl font-bold">EmeraldPics</h3>
                <p className="text-sm text-white/70">Photography</p>
              </div>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              Professional event photography and videography services capturing the natural 
              beauty and cultural richness of Dominica, the Nature Isle.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <a href="#hero" className="text-white/80 hover:text-accent transition-colors cursor-pointer">
                Home
              </a>
              <a href="#gallery" className="text-white/80 hover:text-accent transition-colors cursor-pointer">
                Gallery
              </a>
              <a href="#services" className="text-white/80 hover:text-accent transition-colors cursor-pointer">
                Services
              </a>
              <a href="#about" className="text-white/80 hover:text-accent transition-colors cursor-pointer">
                About
              </a>
              <a href="#contact" className="text-white/80 hover:text-accent transition-colors cursor-pointer">
                Contact
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <a
                href="tel:7676154170"
                className="flex items-start gap-3 text-white/80 hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>767 615 4170</span>
              </a>
              <a
                href="mailto:steve.vidal@gmail.com"
                className="flex items-start gap-3 text-white/80 hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>steve.vidal@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-white/80">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Fortune, Dominica</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>© {currentYear} EmeraldPics Photography. All rights reserved.</p>
            <p>Capturing the essence of the Nature Isle</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
