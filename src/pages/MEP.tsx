import { ShoppingCart, Download, Star, Wind, Zap, Droplets, Gauge } from 'lucide-react';
import { useState } from 'react';

interface Plugin {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  downloads: number;
  category: string;
  features: string[];
}

export default function MEP() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const plugins: Plugin[] = [
    {
      id: 1,
      name: 'HVAC Designer Pro',
      description: 'Complete HVAC system design with load calculations and equipment selection.',
      price: 649,
      rating: 4.9,
      downloads: 1456,
      category: 'HVAC',
      features: ['Load Calculations', 'Duct Sizing', 'Equipment Selection', 'Energy Analysis']
    },
    {
      id: 2,
      name: 'ElectriCalc Suite',
      description: 'Electrical system design with circuit calculations and panel scheduling.',
      price: 549,
      rating: 4.8,
      downloads: 987,
      category: 'Electrical',
      features: ['Circuit Design', 'Load Balancing', 'Panel Schedules', 'Voltage Drop Calc']
    },
    {
      id: 3,
      name: 'PipeRoute Master',
      description: 'Intelligent pipe routing with automatic sizing and clash avoidance.',
      price: 499,
      rating: 4.7,
      downloads: 1123,
      category: 'Plumbing',
      features: ['Auto Routing', 'Pipe Sizing', 'Pressure Loss Calc', 'Isometric Generation']
    },
    {
      id: 4,
      name: 'ClashGuard Pro',
      description: 'Advanced clash detection and coordination between MEP systems.',
      price: 799,
      rating: 4.9,
      downloads: 2341,
      category: 'Coordination',
      features: ['Real-time Detection', 'Automated Reports', 'Priority Resolution', 'BIM Integration']
    },
    {
      id: 5,
      name: 'Energy Optimizer',
      description: 'Building energy analysis and optimization for sustainable design.',
      price: 699,
      rating: 4.8,
      downloads: 654,
      category: 'Energy',
      features: ['Energy Modeling', 'LEED Analysis', 'Cost Optimization', 'Carbon Tracking']
    },
    {
      id: 6,
      name: 'FireFlow Systems',
      description: 'Fire protection system design with sprinkler layout and hydraulic calculations.',
      price: 599,
      rating: 4.7,
      downloads: 432,
      category: 'Fire Protection',
      features: ['Sprinkler Layout', 'Hydraulic Calc', 'Code Compliance', 'Pump Sizing']
    },
    {
      id: 7,
      name: 'Control Logic Builder',
      description: 'Building automation and control system programming interface.',
      price: 449,
      rating: 4.6,
      downloads: 321,
      category: 'Controls',
      features: ['Logic Programming', 'Sequence Builder', 'Point Mapping', 'Simulation Mode']
    },
    {
      id: 8,
      name: 'Fabrication Pro',
      description: 'Convert design models to fabrication-ready documentation with spooling.',
      price: 749,
      rating: 4.9,
      downloads: 876,
      category: 'Fabrication',
      features: ['Spool Drawings', 'Material Lists', 'Shop Drawings', 'QR Tracking']
    }
  ];

  const categories = ['All', 'HVAC', 'Electrical', 'Plumbing', 'Coordination', 'Energy', 'Fire Protection', 'Controls', 'Fabrication'];

  const filteredPlugins = selectedCategory === 'All' 
    ? plugins 
    : plugins.filter(plugin => plugin.category === selectedCategory);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">MEP Engineering Plugins</h1>
          <p className="text-xl text-gray-600">
            Comprehensive MEP design tools for mechanical, electrical, and plumbing systems. 
            Optimize coordination, reduce clashes, and deliver efficient building systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg">
            <Wind className="h-8 w-8 text-red-600" />
            <div>
              <h3 className="font-semibold text-gray-900">HVAC Systems</h3>
              <p className="text-sm text-gray-600">Complete mechanical design</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg">
            <Zap className="h-8 w-8 text-yellow-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Electrical Systems</h3>
              <p className="text-sm text-gray-600">Power & lighting design</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
            <Droplets className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Plumbing Systems</h3>
              <p className="text-sm text-gray-600">Water & drainage design</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlugins.map((plugin) => (
            <div key={plugin.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{plugin.name}</h3>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-semibold">
                    {plugin.category}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{plugin.description}</p>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{plugin.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>{plugin.downloads}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Key Features:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {plugin.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-2xl font-bold text-gray-900">${plugin.price}</span>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">MEP Complete Bundle</h2>
              <p className="text-green-100">
                Get all MEP plugins with 30% discount - Perfect for integrated MEP firms
              </p>
            </div>
            <div className="text-right">
              <p className="text-green-100 line-through text-sm">$4,929</p>
              <p className="text-3xl font-bold mb-2">$3,450</p>
              <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                Get Bundle Deal
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
          <div className="flex items-start gap-3">
            <Gauge className="h-6 w-6 text-amber-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Performance Guarantee</h3>
              <p className="text-gray-600">
                All MEP plugins are optimized for large projects and guarantee processing of models with up to 
                1 million elements without performance degradation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}