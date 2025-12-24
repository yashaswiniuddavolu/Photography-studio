import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import '../styles/photography.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="photo-footer">
      <div className="container-photo">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Camera size={24} className="text-white" />
              <span className="subsection-title text-white text-lg">Alex Morrison</span>
            </div>
            <p className="caption-text text-gray-400">
              Professional photographer specializing in portraits, events, and commercial photography.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/portfolio" className="caption-text">Portfolio</Link></li>
              <li><Link to="/services" className="caption-text">Services</Link></li>
              <li><Link to="/about" className="caption-text">About</Link></li>
              <li><Link to="/contact" className="caption-text">Contact</Link></li>
              <li><Link to="/booking" className="caption-text">Book Now</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span className="caption-text">+91 1234567890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span className="caption-text">helloindia@alexmorrison.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span className="caption-text">India</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Follow</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="caption-text">
            © {currentYear} Alex Morrison Photography. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;