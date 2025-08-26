import { ShoppingCart, Download, Star, MapPin, Mountain, Droplets } from 'lucide-react';
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

export default function CivilEngineering() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const plugins: Plugin[] = [
    {
      id: 1,
      name: 'Site Analyzer Pro',
      description: 'Comprehensive site analysis tool for topography, drainage, and environmental assessment.',
      price: 549,
      rating: 4.9,
      downloads: 876,
      category: 'Site Analysis',
      features: ['Topographic Analysis', 'Drainage Patterns', 'Cut/Fill Calculations', 'Environmental Impact']
    },
    {
      id: 2,
      name: 'RoadBuilder Suite',
      description: 'Advanced road and highway design with automatic grading and alignment optimization.',
      price: 699,
      rating: 4.8,
      downloads: 543,
      category: 'Road Design',
      features: ['Alignment Optimization', 'Cross-Section Design', 'Intersection Tools', 'Signage Placement']
    },
    {
      id: 3,
      name: 'HydroFlow Designer',
      description: 'Stormwater management and drainage system design with hydraulic calculations.',
      price: 449,
      rating: 4.7,
      downloads: 1234,
      category: 'Drainage',
      features: ['Pipe Network Design', 'Flow Calculations', 'Retention Pond Sizing', 'Compliance Reports']
    },
    {
      id: 4,
      name: 'StructCalc Pro',
      description: 'Structural analysis and design tool for civil infrastructure projects.',
      price: 799,
      rating: 4.9,
      downloads: 432,
      category: 'Structural',
      features: ['Load Analysis', 'Foundation Design', 'Retaining Walls', 'Bridge Design Tools']
    },
    {
      id: 5,
      name: 'Earthworks Optimizer',
      description: 'Optimize cut and fill operations with advanced grading and excavation planning.',
      price: 399,
      rating: 4.6,
      downloads: 765,
      category: 'Earthworks',
      features: ['Mass Haul Diagrams', 'Equipment Planning', 'Cost Estimation', '3D Visualization']
    },
    {
      id: 6,
      name: 'Utility Coordinator',
      description: 'Underground utility design and coordination with clash detection capabilities.',
      price: 499,
      rating: 4.8,
      downloads: 892,
      category: 'Utilities',
      features: ['3D Coordination', 'Clash Detection', 'Depth Analysis', 'As-Built Documentation']
    }
  ];

  const categories = ['All', 'Site Analysis', 'Road Design', 'Drainage', 'Structural', 'Earthworks', 'Utilities'];

  const filteredPlugins = selectedCategory === 'All' 
    ? plugins 
    : plugins.filter(plugin => plugin.category === selectedCategory);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Civil Engineering Plugins</h1>
          <p className="text-xl text-gray-600">
            Powerful tools for infrastructure design, site development, and civil works. 
            Streamline your engineering workflows with precision and efficiency.
          </p>
        </div>

        <div className="flex items-center gap-8 mb-8 p-6 bg-orange-50 rounded-lg">
          <MapPin className="h-12 w-12 text-orange-600" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Industry-Leading Accuracy</h3>
            <p className="text-gray-600">All plugins are validated against industry standards and building codes.</p>
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
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm font-semibold">
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
                        <span className="text-orange-600 mr-2">•</span>
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

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8">
            <Mountain className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Terrain Package</h3>
            <p className="text-gray-600 mb-4">
              Bundle deal: Get Site Analyzer Pro + Earthworks Optimizer for 20% off
            </p>
            <button className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              View Bundle
            </button>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-8">
            <Droplets className="h-10 w-10 text-cyan-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Water Management Suite</h3>
            <p className="text-gray-600 mb-4">
              Complete drainage solution with HydroFlow Designer + Utility Coordinator
            </p>
            <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-cyan-700 transition-colors">
              View Bundle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}