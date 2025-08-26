import { useState } from 'react';
import { Download, Key, Package, Settings, User, FileText, Star, Clock } from 'lucide-react';

interface Purchase {
  id: string;
  name: string;
  date: string;
  version: string;
  licenseKey: string;
  downloads: number;
  maxDownloads: number;
  status: 'active' | 'expired';
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('licenses');
  
  const purchases: Purchase[] = [
    {
      id: '1',
      name: 'AutoSpace Planner',
      date: '2024-12-15',
      version: '2.3.1',
      licenseKey: 'ASP-XXXX-XXXX-XXXX',
      downloads: 3,
      maxDownloads: 5,
      status: 'active'
    },
    {
      id: '2',
      name: 'DocuGen Pro',
      date: '2024-12-10',
      version: '1.8.5',
      licenseKey: 'DGP-XXXX-XXXX-XXXX',
      downloads: 2,
      maxDownloads: 5,
      status: 'active'
    },
    {
      id: '3',
      name: 'HVAC Designer Pro',
      date: '2024-11-20',
      version: '3.1.0',
      licenseKey: 'HDP-XXXX-XXXX-XXXX',
      downloads: 5,
      maxDownloads: 5,
      status: 'active'
    }
  ];

  const stats = {
    totalPlugins: 3,
    activeLicenses: 3,
    totalSpent: 1547,
    supportTickets: 0
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Dashboard</h1>
          <p className="text-gray-600">Manage your plugins, licenses, and account settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <Package className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gray-900">{stats.totalPlugins}</span>
            </div>
            <p className="text-gray-600 text-sm">Total Plugins</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <Key className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">{stats.activeLicenses}</span>
            </div>
            <p className="text-gray-600 text-sm">Active Licenses</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">${stats.totalSpent}</span>
            </div>
            <p className="text-gray-600 text-sm">Total Spent</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <Star className="h-8 w-8 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-900">{stats.supportTickets}</span>
            </div>
            <p className="text-gray-600 text-sm">Support Tickets</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('licenses')}
                className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'licenses'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Key className="inline-block h-4 w-4 mr-2" />
                Licenses
              </button>
              <button
                onClick={() => setActiveTab('downloads')}
                className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'downloads'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Download className="inline-block h-4 w-4 mr-2" />
                Downloads
              </button>
              <button
                onClick={() => setActiveTab('account')}
                className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'account'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <User className="inline-block h-4 w-4 mr-2" />
                Account
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'settings'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Settings className="inline-block h-4 w-4 mr-2" />
                Settings
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'licenses' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Licenses</h2>
                {purchases.map((purchase) => (
                  <div key={purchase.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{purchase.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Version {purchase.version} • Purchased {purchase.date}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm font-mono bg-gray-100 px-3 py-1 rounded">
                            {purchase.licenseKey}
                          </span>
                          <button className="text-primary hover:text-blue-700 text-sm font-medium">
                            Copy Key
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          purchase.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {purchase.status}
                        </span>
                        <p className="text-sm text-gray-600 mt-2">
                          {purchase.downloads}/{purchase.maxDownloads} downloads
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'downloads' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Downloads</h2>
                {purchases.map((purchase) => (
                  <div key={purchase.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{purchase.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">Version {purchase.version}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download
                        </button>
                        <button className="text-primary hover:text-blue-700 font-medium">
                          View Docs
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'account' && (
              <div className="max-w-2xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      type="text"
                      defaultValue="Architecture Firm Inc."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Update Profile
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="max-w-2xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive updates about new plugins and features</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">Auto-renewal</p>
                      <p className="text-sm text-gray-600">Automatically renew licenses before expiration</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="font-medium text-gray-900">Beta Features</p>
                      <p className="text-sm text-gray-600">Get early access to new features</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}