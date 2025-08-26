import { useState } from 'react';
import { Send, CheckCircle, FileText, Users, Clock, Shield } from 'lucide-react';

export default function CustomRequest() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    discipline: '',
    projectType: '',
    description: '',
    budget: '',
    timeline: '',
    teamSize: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const benefits = [
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: 'Tailored Solution',
      description: 'Get plugins designed specifically for your unique workflow requirements.'
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Expert Development',
      description: 'Our team of AEC specialists and developers understand your industry needs.'
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: 'Fast Delivery',
      description: 'Most custom plugins are delivered within 2-4 weeks from approval.'
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: 'Ongoing Support',
      description: 'Get dedicated support and updates for your custom solution.'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Submitted Successfully!</h2>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your interest in our custom plugin development services. 
            Our team will review your requirements and contact you within 24 hours.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '',
                email: '',
                company: '',
                discipline: '',
                projectType: '',
                description: '',
                budget: '',
                timeline: '',
                teamSize: ''
              });
            }}
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Custom Plugin Development</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Need a specific solution that's not in our catalog? Our expert team can develop 
            custom API plugins tailored to your exact workflow requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell Us About Your Project</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="discipline" className="block text-sm font-medium text-gray-700 mb-2">
                      Discipline *
                    </label>
                    <select
                      id="discipline"
                      name="discipline"
                      required
                      value={formData.discipline}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select discipline</option>
                      <option value="architecture">Architecture</option>
                      <option value="civil">Civil Engineering</option>
                      <option value="mep">MEP</option>
                      <option value="structural">Structural</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range *
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      required
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select budget</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="over-50k">Over $50,000</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                      Timeline *
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      required
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="2-months">Within 2 months</option>
                      <option value="3-months">Within 3 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-2">
                      Team Size
                    </label>
                    <select
                      id="teamSize"
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select team size</option>
                      <option value="1-5">1-5 users</option>
                      <option value="6-20">6-20 users</option>
                      <option value="21-50">21-50 users</option>
                      <option value="51-100">51-100 users</option>
                      <option value="over-100">Over 100 users</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type *
                  </label>
                  <input
                    type="text"
                    id="projectType"
                    name="projectType"
                    required
                    placeholder="e.g., Residential towers, Infrastructure, Healthcare facilities"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Plugin Requirements *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={6}
                    placeholder="Please describe the specific functionality you need, the problems you're trying to solve, and any technical requirements..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  Submit Request
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Process</h3>
              <ol className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-xs">1</span>
                  <span className="text-gray-600">Submit your requirements through this form</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-xs">2</span>
                  <span className="text-gray-600">Our team reviews and schedules a consultation</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-xs">3</span>
                  <span className="text-gray-600">We provide a detailed proposal and timeline</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-xs">4</span>
                  <span className="text-gray-600">Development begins with regular updates</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-xs">5</span>
                  <span className="text-gray-600">Testing, deployment, and training</span>
                </li>
              </ol>
            </div>

            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Custom Requests</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Automated drawing generation</li>
                <li>• Custom calculation tools</li>
                <li>• Data extraction & reporting</li>
                <li>• Model validation & QC</li>
                <li>• Integration with existing software</li>
                <li>• Workflow automation</li>
                <li>• Batch processing tools</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">100% Satisfaction Guarantee</h3>
              <p className="text-sm text-gray-600">
                We work closely with you throughout the development process to ensure the final 
                solution meets your expectations. Free revisions included.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}