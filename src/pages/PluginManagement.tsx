import { useState } from 'react';
import { Shield, Download, GitBranch, BarChart3, Key, Settings, AlertCircle } from 'lucide-react';
import DownloadPortal from '../components/DownloadPortal';
import VersionControl from '../components/VersionControl';
import UsageAnalytics from '../components/UsageAnalytics';
import PluginActivation from '../components/PluginActivation';
import { generateLicenseKey, validateLicenseKeyFormat, LICENSE_TYPES } from '../utils/licenseGenerator';

interface Plugin {
  id: number;
  name: string;
  currentVersion: string;
  installedVersion?: string;
  licenseKey?: string;
  licenseType: 'single' | 'team' | 'enterprise';
  licenseStatus: 'active' | 'expired' | 'invalid';
  expiresAt?: string;
  lastUpdated: string;
}

export default function PluginManagement() {
  const [activeTab, setActiveTab] = useState<'licenses' | 'downloads' | 'versions' | 'analytics' | 'activation'>('licenses');
  const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null);

  const userPlugins: Plugin[] = [
    {
      id: 1,
      name: 'AutoSpace Planner',
      currentVersion: '2.3.1',
      installedVersion: '2.3.0',
      licenseKey: 'ASP1-2B4C-6D8E-0F2G',
      licenseType: 'team',
      licenseStatus: 'active',
      expiresAt: '2025-12-15',
      lastUpdated: '2024-12-20'
    },
    {
      id: 2,
      name: 'DocuGen Pro',
      currentVersion: '1.8.5',
      installedVersion: '1.8.5',
      licenseKey: 'DGP2-3C5D-7E9F-1G3H',
      licenseType: 'single',
      licenseStatus: 'active',
      expiresAt: '2025-06-10',
      lastUpdated: '2024-12-10'
    },
    {
      id: 3,
      name: 'HVAC Designer Pro',
      currentVersion: '3.1.0',
      installedVersion: '3.1.0',
      licenseKey: 'HDP3-4D6E-8F0G-2H4I',
      licenseType: 'enterprise',
      licenseStatus: 'active',
      expiresAt: null,
      lastUpdated: '2024-11-20'
    }
  ];

  const handleGenerateNewKey = (plugin: Plugin) => {
    const newKey = generateLicenseKey(plugin.id, 'USR001');
    console.log('Generated new license key:', newKey);
    alert(`New license key generated: ${newKey}`);
  };

  const getLicenseTypeBadge = (type: string) => {
    const config = LICENSE_TYPES[type as keyof typeof LICENSE_TYPES];
    const colors = {
      single: 'bg-blue-100 text-blue-800',
      team: 'bg-purple-100 text-purple-800',
      enterprise: 'bg-green-100 text-green-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[type as keyof typeof colors]}`}>
        {config?.name || type}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      expired: 'bg-red-100 text-red-800',
      invalid: 'bg-gray-100 text-gray-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[status as keyof typeof colors]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Plugin Management System</h1>
          <p className="text-gray-600">Manage licenses, downloads, versions, and analytics for your plugins</p>
        </div>

        {/* Plugin Selection */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Licensed Plugins</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userPlugins.map((plugin) => (
              <div
                key={plugin.id}
                onClick={() => setSelectedPlugin(plugin)}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedPlugin?.id === plugin.id
                    ? 'border-primary bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{plugin.name}</h3>
                  {plugin.installedVersion !== plugin.currentVersion && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      Update Available
                    </span>
                  )}
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Version:</span>
                    <span className="font-medium">{plugin.installedVersion || 'Not installed'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">License:</span>
                    <div className="flex items-center gap-2">
                      {getLicenseTypeBadge(plugin.licenseType)}
                      {getStatusBadge(plugin.licenseStatus)}
                    </div>
                  </div>
                  {plugin.expiresAt && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Expires:</span>
                      <span className="font-medium">{plugin.expiresAt}</span>
                    </div>
                  )}
                </div>
                <div className="mt-3 pt-3 border-t">
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                    {plugin.licenseKey}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedPlugin ? (
          <>
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('licenses')}
                    className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                      activeTab === 'licenses'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Key className="h-4 w-4" />
                    License Management
                  </button>
                  <button
                    onClick={() => setActiveTab('downloads')}
                    className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                      activeTab === 'downloads'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Download className="h-4 w-4" />
                    Downloads
                  </button>
                  <button
                    onClick={() => setActiveTab('versions')}
                    className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                      activeTab === 'versions'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <GitBranch className="h-4 w-4" />
                    Version Control
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                      activeTab === 'analytics'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <BarChart3 className="h-4 w-4" />
                    Analytics
                  </button>
                  <button
                    onClick={() => setActiveTab('activation')}
                    className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                      activeTab === 'activation'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Shield className="h-4 w-4" />
                    Activation
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'licenses' && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">License Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm opacity-90">Product</p>
                          <p className="text-lg font-semibold">{selectedPlugin.name}</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-90">License Key</p>
                          <p className="font-mono text-lg">{selectedPlugin.licenseKey}</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-90">Type</p>
                          <p className="text-lg font-semibold">
                            {LICENSE_TYPES[selectedPlugin.licenseType].name}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm opacity-90">Status</p>
                          <p className="text-lg font-semibold">
                            {selectedPlugin.licenseStatus.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleGenerateNewKey(selectedPlugin)}
                          className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
                        >
                          Generate New Key
                        </button>
                        <button className="bg-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/30 transition-colors">
                          Extend License
                        </button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">License Features</h4>
                      <ul className="space-y-2">
                        {LICENSE_TYPES[selectedPlugin.licenseType].features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <Shield className="h-4 w-4 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Activation Limits</h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Maximum Activations</span>
                          <span className="font-semibold">
                            {LICENSE_TYPES[selectedPlugin.licenseType].maxActivations === -1
                              ? 'Unlimited'
                              : LICENSE_TYPES[selectedPlugin.licenseType].maxActivations}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Current Activations</span>
                          <span className="font-semibold">2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'downloads' && (
                  <DownloadPortal
                    productId={selectedPlugin.id}
                    productName={selectedPlugin.name}
                    licenseKey={selectedPlugin.licenseKey || ''}
                    isValid={selectedPlugin.licenseStatus === 'active'}
                  />
                )}

                {activeTab === 'versions' && (
                  <VersionControl
                    productName={selectedPlugin.name}
                    currentVersion={selectedPlugin.currentVersion}
                    installedVersion={selectedPlugin.installedVersion}
                  />
                )}

                {activeTab === 'analytics' && (
                  <UsageAnalytics
                    productId={selectedPlugin.id}
                    productName={selectedPlugin.name}
                  />
                )}

                {activeTab === 'activation' && (
                  <PluginActivation
                    plugin={selectedPlugin}
                    onActivationComplete={() => {
                      alert('Plugin activated successfully!');
                    }}
                  />
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Plugin</h3>
            <p className="text-gray-600">Choose a plugin from the list above to manage its settings</p>
          </div>
        )}
      </div>
    </div>
  );
}