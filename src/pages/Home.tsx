import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Users, Code, Building, HardHat, Wrench } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-secondary" />,
      title: 'Lightning Fast',
      description: 'Optimize your workflows with high-performance API plugins that save hours of manual work.'
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary" />,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and secure API connections protect your valuable project data.'
    },
    {
      icon: <Users className="h-8 w-8 text-secondary" />,
      title: 'Team Collaboration',
      description: 'Share plugins across teams with centralized licensing and management tools.'
    },
    {
      icon: <Code className="h-8 w-8 text-secondary" />,
      title: 'Custom Development',
      description: 'Need something specific? Our team can build custom plugins tailored to your workflow.'
    }
  ];

  const disciplines = [
    {
      icon: <Building className="h-12 w-12 text-primary" />,
      title: 'Architecture',
      description: 'Automate repetitive design tasks, generate documentation, and optimize building layouts.',
      link: '/architecture',
      plugins: ['Space Planning', 'Documentation', 'Rendering', 'BIM Management']
    },
    {
      icon: <HardHat className="h-12 w-12 text-primary" />,
      title: 'Civil Engineering',
      description: 'Streamline infrastructure design, terrain modeling, and structural analysis workflows.',
      link: '/civil-engineering',
      plugins: ['Site Analysis', 'Road Design', 'Drainage', 'Structural Calc']
    },
    {
      icon: <Wrench className="h-12 w-12 text-primary" />,
      title: 'MEP',
      description: 'Optimize mechanical, electrical, and plumbing system design and coordination.',
      link: '/mep',
      plugins: ['HVAC Design', 'Electrical Calc', 'Pipe Routing', 'Clash Detection']
    }
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Professional API Plugins for
              <span className="text-primary"> AEC Industry</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline your Architecture, Engineering, and Construction workflows with our 
              powerful API plugins. Save time, reduce errors, and boost productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/architecture"
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Browse Plugins
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/custom-request"
                className="bg-white text-primary border-2 border-primary px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Request Custom Plugin
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our API Plugins?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Plugins by Discipline
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Specialized tools designed for specific industry needs. Choose your discipline to explore our comprehensive plugin catalog.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {disciplines.map((discipline, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-8">
                  <div className="flex justify-center mb-6">{discipline.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">{discipline.title}</h3>
                  <p className="text-gray-600 mb-6 text-center">{discipline.description}</p>
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Popular Plugins:</p>
                    <div className="flex flex-wrap gap-2">
                      {discipline.plugins.map((plugin, idx) => (
                        <span key={idx} className="bg-blue-50 text-primary px-3 py-1 rounded-full text-sm">
                          {plugin}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    to={discipline.link}
                    className="block w-full bg-primary text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Explore {discipline.title} Plugins
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary to-indigo-600 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our expert development team can create tailored API plugins specific to your unique workflow requirements.
            </p>
            <Link
              to="/custom-request"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}