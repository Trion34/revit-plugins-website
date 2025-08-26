import { useState, useEffect } from 'react';
import { Download, Lock, CheckCircle, AlertCircle, FileText, Shield, Clock } from 'lucide-react';

interface DownloadFile {
  id: string;
  name: string;
  version: string;
  size: string;
  releaseDate: string;
  downloadUrl: string;
  checksumMD5: string;
  requirements: string[];
}

interface DownloadPortalProps {
  productId: number;
  productName: string;
  licenseKey: string;
  isValid: boolean;
}

export default function DownloadPortal({ productId, productName, licenseKey, isValid }: DownloadPortalProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [downloadHistory, setDownloadHistory] = useState<any[]>([]);

  const currentVersion: DownloadFile = {
    id: `${productId}-latest`,
    name: `${productName} Installer`,
    version: '2.3.1',
    size: '45.2 MB',
    releaseDate: '2024-12-20',
    downloadUrl: `/api/download/${productId}/latest`,
    checksumMD5: 'a1b2c3d4e5f6g7h8i9j0',
    requirements: ['Revit 2021-2024', 'Windows 10/11', '.NET Framework 4.8']
  };

  const previousVersions: DownloadFile[] = [
    {
      id: `${productId}-v2.3.0`,
      name: `${productName} v2.3.0`,
      version: '2.3.0',
      size: '44.8 MB',
      releaseDate: '2024-12-01',
      downloadUrl: `/api/download/${productId}/2.3.0`,
      checksumMD5: 'b2c3d4e5f6g7h8i9j0k1',
      requirements: ['Revit 2021-2024', 'Windows 10/11', '.NET Framework 4.8']
    },
    {
      id: `${productId}-v2.2.5`,
      name: `${productName} v2.2.5`,
      version: '2.2.5',
      size: '43.5 MB',
      releaseDate: '2024-11-15',
      downloadUrl: `/api/download/${productId}/2.2.5`,
      checksumMD5: 'c3d4e5f6g7h8i9j0k1l2',
      requirements: ['Revit 2020-2024', 'Windows 10/11', '.NET Framework 4.7.2']
    }
  ];

  const handleDownload = async (file: DownloadFile) => {
    if (!isValid) {
      alert('Invalid license key. Please contact support.');
      return;
    }

    setDownloading(true);
    setDownloadProgress(0);

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate download completion
    setTimeout(() => {
      setDownloading(false);
      setVerifying(true);
      
      // Simulate verification
      setTimeout(() => {
        setVerifying(false);
        
        // Add to download history
        const historyEntry = {
          id: Math.random().toString(36),
          fileName: file.name,
          version: file.version,
          downloadedAt: new Date().toISOString(),
          ipAddress: '192.168.1.1',
          machineId: 'DESKTOP-ABC123'
        };
        
        setDownloadHistory([historyEntry, ...downloadHistory]);
        
        // In production, this would trigger actual file download
        console.log('Download completed:', file);
        alert(`${file.name} downloaded successfully!`);
      }, 1500);
    }, 2500);
  };

  const getSecureDownloadUrl = (file: DownloadFile): string => {
    // Generate time-limited secure download URL
    const timestamp = Date.now();
    const token = btoa(`${licenseKey}-${file.id}-${timestamp}`);
    return `${file.downloadUrl}?token=${token}&t=${timestamp}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Download Portal</h2>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
          isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isValid ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          License {isValid ? 'Active' : 'Invalid'}
        </div>
      </div>

      {!isValid ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-semibold text-red-900">License Required</p>
              <p className="text-sm text-red-700">Please enter a valid license key to access downloads.</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-semibold text-blue-900">Secure Download</p>
                <p className="text-sm text-blue-700">
                  Downloads are encrypted and tied to your license key: {licenseKey}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Version</h3>
              <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{currentVersion.name}</h4>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">LATEST</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Version: {currentVersion.version} • Size: {currentVersion.size}</p>
                      <p>Released: {currentVersion.releaseDate}</p>
                      <p>MD5: <code className="bg-gray-100 px-1 rounded text-xs">{currentVersion.checksumMD5}</code></p>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-gray-700 mb-1">System Requirements:</p>
                      <ul className="text-xs text-gray-600">
                        {currentVersion.requirements.map((req, idx) => (
                          <li key={idx}>• {req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="ml-4">
                    {downloading && downloadProgress < 100 ? (
                      <div className="text-center">
                        <div className="w-24 h-24 relative">
                          <svg className="transform -rotate-90 w-24 h-24">
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="none"
                              className="text-gray-200"
                            />
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray={251}
                              strokeDashoffset={251 - (downloadProgress / 100) * 251}
                              className="text-primary transition-all duration-300"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold">{downloadProgress}%</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">Downloading...</p>
                      </div>
                    ) : verifying ? (
                      <div className="text-center">
                        <Shield className="h-16 w-16 text-green-500 animate-pulse mx-auto" />
                        <p className="text-xs text-gray-600 mt-2">Verifying...</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDownload(currentVersion)}
                        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <Download className="h-5 w-5" />
                        Download
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous Versions</h3>
              <div className="space-y-3">
                {previousVersions.map(version => (
                  <div key={version.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{version.name}</h4>
                        <p className="text-sm text-gray-600">
                          Size: {version.size} • Released: {version.releaseDate}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDownload(version)}
                        className="text-primary hover:text-blue-700 p-2"
                        disabled={downloading || verifying}
                      >
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {downloadHistory.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Download History</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-2 font-medium text-gray-700">File</th>
                        <th className="text-left px-4 py-2 font-medium text-gray-700">Version</th>
                        <th className="text-left px-4 py-2 font-medium text-gray-700">Downloaded</th>
                        <th className="text-left px-4 py-2 font-medium text-gray-700">Machine</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {downloadHistory.map(entry => (
                        <tr key={entry.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2">{entry.fileName}</td>
                          <td className="px-4 py-2">{entry.version}</td>
                          <td className="px-4 py-2">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-gray-400" />
                              {new Date(entry.downloadedAt).toLocaleString()}
                            </div>
                          </td>
                          <td className="px-4 py-2 font-mono text-xs">{entry.machineId}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-amber-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-amber-900 mb-1">Installation Guide</p>
                  <p className="text-amber-700">
                    Need help installing? Check our{' '}
                    <a href="#" className="underline font-medium">installation guide</a> or{' '}
                    <a href="#" className="underline font-medium">video tutorial</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}