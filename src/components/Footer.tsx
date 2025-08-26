import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">API Plugins Pro</h3>
            <p className="text-gray-400 text-sm">
              Professional API plugins for Architecture, Engineering, and Construction workflows.
              Streamline your design process with our cutting-edge tools.
            </p>
            <div className="flex space-x-4">
              <Github className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/architecture" className="text-gray-400 hover:text-white">
                  Architecture Tools
                </Link>
              </li>
              <li>
                <Link to="/civil-engineering" className="text-gray-400 hover:text-white">
                  Civil Engineering
                </Link>
              </li>
              <li>
                <Link to="/mep" className="text-gray-400 hover:text-white">
                  MEP Solutions
                </Link>
              </li>
              <li>
                <Link to="/custom-request" className="text-gray-400 hover:text-white">
                  Custom Development
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400 hover:text-white cursor-pointer">Documentation</li>
              <li className="text-gray-400 hover:text-white cursor-pointer">API Reference</li>
              <li className="text-gray-400 hover:text-white cursor-pointer">Tutorials</li>
              <li className="text-gray-400 hover:text-white cursor-pointer">Community Forum</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>support@apipluginspro.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 API Plugins Pro. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <Link to="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </Link>
            <Link to="#" className="text-gray-400 hover:text-white">
              License Agreement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}