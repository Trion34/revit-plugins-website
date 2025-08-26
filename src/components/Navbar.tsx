import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/architecture', label: 'Architecture' },
    { path: '/civil-engineering', label: 'Civil Engineering' },
    { path: '/mep', label: 'MEP' },
    { path: '/custom-request', label: 'Custom Plugins' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-gray-800">API Plugins Pro</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-gray-600 hover:text-primary transition-colors ${
                  location.pathname === item.path ? 'text-primary font-semibold' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/dashboard"
              className={`text-gray-600 hover:text-primary transition-colors flex items-center gap-1 ${
                location.pathname === '/dashboard' ? 'text-primary font-semibold' : ''
              }`}
            >
              <User className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/cart"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 relative"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-primary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? 'text-primary bg-blue-50'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/dashboard'
                    ? 'text-primary bg-blue-50'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 mt-2 relative"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="ml-2 bg-white text-primary text-xs rounded-full px-2 py-0.5">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}