import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Architecture from './pages/Architecture';
import CivilEngineering from './pages/CivilEngineering';
import MEP from './pages/MEP';
import CustomRequest from './pages/CustomRequest';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import PluginManagement from './pages/PluginManagement';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/architecture" element={<Architecture />} />
              <Route path="/civil-engineering" element={<CivilEngineering />} />
              <Route path="/mep" element={<MEP />} />
              <Route path="/custom-request" element={<CustomRequest />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/plugin-management" element={<PluginManagement />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;