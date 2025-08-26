import { useState } from 'react';
import { GitBranch, Tag, Clock, AlertTriangle, CheckCircle, Info, Download, Bell, X } from 'lucide-react';

interface Version {
  version: string;
  releaseDate: string;
  status: 'stable' | 'beta' | 'deprecated';
  changes: {
    type: 'feature' | 'fix' | 'breaking' | 'improvement';
    description: string;
  }[];
  downloadCount: number;
  compatibleWith: string[];
}

interface VersionControlProps {
  productName: string;
  currentVersion: string;
  installedVersion?: string;
}

export default function VersionControl({ productName, currentVersion, installedVersion }: VersionControlProps) {
  const [showUpdateNotification, setShowUpdateNotification] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [subscribedToUpdates, setSubscribedToUpdates] = useState(false);

  const versions: Version[] = [
    {
      version: '2.3.1',
      releaseDate: '2024-12-20',
      status: 'stable',
      changes: [
        { type: 'fix', description: 'Fixed crash when opening large models' },
        { type: 'fix', description: 'Resolved memory leak in rendering module' },
        { type: 'improvement', description: 'Improved performance by 25%' }
      ],
      downloadCount: 1234,
      compatibleWith: ['Revit 2024', 'Revit 2023', 'Revit 2022', 'Revit 2021']
    },
    {
      version: '2.3.0',
      releaseDate: '2024-12-01',
      status: 'stable',
      changes: [
        { type: 'feature', description: 'Added AI-powered space optimization' },
        { type: 'feature', description: 'New export formats (IFC, DWG)' },
        { type: 'improvement', description: 'Updated UI with dark mode support' },
        { type: 'breaking', description: 'Removed support for Revit 2019' }
      ],
      downloadCount: 3456,
      compatibleWith: ['Revit 2024', 'Revit 2023', 'Revit 2022', 'Revit 2021']
    },
    {
      version: '2.2.5',
      releaseDate: '2024-11-15',
      status: 'stable',
      changes: [
        { type: 'fix', description: 'Fixed compatibility with Windows 11 23H2' },
        { type: 'improvement', description: 'Reduced plugin size by 15%' }
      ],
      downloadCount: 5678,
      compatibleWith: ['Revit 2024', 'Revit 2023', 'Revit 2022', 'Revit 2021', 'Revit 2020']
    },
    {
      version: '2.4.0-beta',
      releaseDate: '2024-12-25',
      status: 'beta',
      changes: [
        { type: 'feature', description: 'Experimental cloud collaboration features' },
        { type: 'feature', description: 'Real-time sync with team members' },
        { type: 'improvement', description: 'New plugin architecture for better stability' }
      ],
      downloadCount: 234,
      compatibleWith: ['Revit 2024']
    },
    {
      version: '1.9.8',
      releaseDate: '2024-06-01',
      status: 'deprecated',
      changes: [
        { type: 'fix', description: 'Legacy bug fixes' }
      ],
      downloadCount: 8901,
      compatibleWith: ['Revit 2020', 'Revit 2019', 'Revit 2018']
    }
  ];

  const hasUpdate = installedVersion && installedVersion !== currentVersion;

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <span className="text-green-600">✨</span>;
      case 'fix':
        return <span className="text-blue-600">🐛</span>;
      case 'breaking':
        return <span className="text-red-600">⚠️</span>;
      case 'improvement':
        return <span className="text-purple-600">🚀</span>;
      default:
        return <span className="text-gray-600">•</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'stable':
        return (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
            Stable
          </span>
        );
      case 'beta':
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-semibold">
            Beta
          </span>
        );
      case 'deprecated':
        return (
          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-semibold">
            Deprecated
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {hasUpdate && showUpdateNotification && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900">Update Available!</p>
                <p className="text-sm text-blue-700 mt-1">
                  Version {currentVersion} is now available (you have {installedVersion})
                </p>
                <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                  Download Update
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowUpdateNotification(false)}
              className="text-blue-600 hover:text-blue-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{productName} Version History</h2>
              <p className="text-purple-100 mt-1">Track updates, features, and improvements</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-purple-100">Current Version</p>
              <p className="text-xl font-bold">{currentVersion}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSubscribedToUpdates(!subscribedToUpdates)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  subscribedToUpdates 
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Bell className="h-4 w-4" />
                {subscribedToUpdates ? 'Subscribed to Updates' : 'Subscribe to Updates'}
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <GitBranch className="h-4 w-4" />
              <span>{versions.filter(v => v.status === 'stable').length} stable releases</span>
            </div>
          </div>

          <div className="space-y-4">
            {versions.map((version) => (
              <div
                key={version.version}
                className={`border rounded-lg transition-all ${
                  version.version === installedVersion 
                    ? 'border-primary bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => setSelectedVersion(selectedVersion === version.version ? null : version.version)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Tag className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">Version {version.version}</h3>
                          {getStatusBadge(version.status)}
                          {version.version === installedVersion && (
                            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-semibold">
                              Installed
                            </span>
                          )}
                          {version.version === currentVersion && version.version !== installedVersion && (
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                              Latest
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {version.releaseDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            {version.downloadCount.toLocaleString()} downloads
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle download
                      }}
                      className="text-primary hover:text-blue-700 p-2"
                      disabled={version.status === 'deprecated'}
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {selectedVersion === version.version && (
                  <div className="border-t px-4 py-4 bg-gray-50">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Changes in this version:</h4>
                        <ul className="space-y-2">
                          {version.changes.map((change, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              {getChangeIcon(change.type)}
                              <span className="text-gray-700">{change.description}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Compatible with:</h4>
                        <div className="flex flex-wrap gap-2">
                          {version.compatibleWith.map((compat, idx) => (
                            <span key={idx} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                              {compat}
                            </span>
                          ))}
                        </div>
                      </div>

                      {version.status === 'deprecated' && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <p className="text-sm text-red-800">
                              This version is deprecated and no longer supported. Please upgrade to a newer version.
                            </p>
                          </div>
                        </div>
                      )}

                      {version.status === 'beta' && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <Info className="h-4 w-4 text-yellow-600" />
                            <p className="text-sm text-yellow-800">
                              Beta version - may contain bugs. Use in production at your own risk.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 text-gray-600" />
              <div className="text-sm text-gray-700">
                <p className="font-semibold mb-1">Auto-Update Settings</p>
                <p>Configure automatic updates in your plugin settings within Revit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}