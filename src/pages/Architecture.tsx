import { ShoppingCart, Download, Star, Check } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import SearchBar from '../components/SearchBar';

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

export default function Architecture() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedToCart, setAddedToCart] = useState<number[]>([]);
  const { addToCart } = useCart();

  const plugins: Plugin[] = [
    {
      id: 1,
      name: 'AutoSpace Planner',
      description: 'AI-powered space planning tool that automatically generates optimal room layouts based on your requirements.',
      price: 299,
      rating: 4.8,
      downloads: 1234,
      category: 'Space Planning',
      features: ['AI Layout Generation', 'Code Compliance Check', 'Real-time Visualization', 'Export to CAD']
    },
    {
      id: 2,
      name: 'DocuGen Pro',
      description: 'Automatically generate construction documents, schedules, and specifications from your BIM model.',
      price: 399,
      rating: 4.9,
      downloads: 892,
      category: 'Documentation',
      features: ['Auto Sheet Generation', 'Schedule Creation', 'Specification Export', 'Drawing Set Management']
    },
    {
      id: 3,
      name: 'RenderFlow',
      description: 'Batch rendering and visualization workflow automation for photorealistic presentations.',
      price: 449,
      rating: 4.7,
      downloads: 567,
      category: 'Rendering',
      features: ['Batch Processing', 'Cloud Rendering', 'Material Library', 'Animation Support']
    },
    {
      id: 4,
      name: 'BIM Manager Suite',
      description: 'Comprehensive BIM management tools for model coordination, clash detection, and team collaboration.',
      price: 599,
      rating: 4.9,
      downloads: 2341,
      category: 'BIM Management',
      features: ['Clash Detection', 'Model Audit', 'Version Control', 'Team Collaboration']
    },
    {
      id: 5,
      name: 'Facade Designer',
      description: 'Parametric facade design tool with environmental analysis and optimization capabilities.',
      price: 349,
      rating: 4.6,
      downloads: 423,
      category: 'Design Tools',
      features: ['Parametric Design', 'Solar Analysis', 'Wind Load Calc', 'Material Optimization']
    },
    {
      id: 6,
      name: 'StairMaster Pro',
      description: 'Advanced stair and railing design tool with automatic code compliance checking.',
      price: 199,
      rating: 4.8,
      downloads: 1567,
      category: 'Design Tools',
      features: ['Code Compliance', 'Custom Profiles', '3D Visualization', 'Detail Generation']
    }
  ];

  const categories = ['All', 'Space Planning', 'Documentation', 'Rendering', 'BIM Management', 'Design Tools'];

  const filteredPlugins = plugins.filter(plugin => {
    const matchesCategory = selectedCategory === 'All' || plugin.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (plugin: Plugin) => {
    addToCart({
      id: plugin.id,
      name: plugin.name,
      price: plugin.price,
      category: plugin.category
    });
    setAddedToCart([...addedToCart, plugin.id]);
    setTimeout(() => {
      setAddedToCart(prev => prev.filter(id => id !== plugin.id));
    }, 2000);
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Architecture Plugins</h1>
          <p className="text-xl text-gray-600">
            Professional tools designed specifically for architectural workflows. Automate repetitive tasks, 
            enhance design quality, and deliver projects faster.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
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
          <SearchBar onSearch={setSearchQuery} placeholder="Search architecture plugins..." />
        </div>

        {filteredPlugins.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No plugins found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 text-primary hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlugins.map((plugin) => (
              <div key={plugin.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{plugin.name}</h3>
                    <span className="bg-blue-100 text-primary px-2 py-1 rounded text-sm font-semibold">
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
                          <span className="text-primary mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-2xl font-bold text-gray-900">${plugin.price}</span>
                    <button 
                      onClick={() => handleAddToCart(plugin)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                        addedToCart.includes(plugin.id)
                          ? 'bg-green-500 text-white'
                          : 'bg-primary text-white hover:bg-blue-700'
                      }`}
                    >
                      {addedToCart.includes(plugin.id) ? (
                        <>
                          <Check className="h-4 w-4" />
                          Added!
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help Choosing?</h2>
          <p className="text-gray-600 mb-4">
            Our team of architecture experts can help you select the right plugins for your specific workflow needs.
          </p>
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Schedule a Consultation
          </button>
        </div>
      </div>
    </div>
  );
}