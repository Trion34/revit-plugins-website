import { useState } from 'react';
import { Shield, Check, X, Monitor, Loader, Copy, RefreshCw, Trash2, AlertTriangle } from 'lucide-react';
import { generateMachineId, createActivation, validateLicenseKeyFormat, Activation } from '../utils/licenseGenerator';

interface PluginActivationProps {
  plugin: {
    id: number;
    name: string;
    licenseKey?: string;
    licenseType: string;
    licenseStatus: string;
  };
  onActivationComplete: () => void;
}

export default function PluginActivation({ plugin, onActivationComplete }: PluginActivationProps) {
  const [activationKey, setActivationKey] = useState(plugin.licenseKey || '');
  const [isActivating, setIsActivating] = useState(false);
  const [activationStatus, setActivationStatus] = useState<'idle' | 'validating' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showManualActivation, setShowManualActivation] = useState(false);

  const machineId = generateMachineId();

  const activations: Activation[] = [
    {
      id: '1',
      licenseKey: plugin.licenseKey || '',
      machineId: 'DESKTOP-ABC123',
      activatedAt: new Date('2024-12-01'),
      lastSeen: new Date('2024-12-26'),
      osInfo: 'Windows 11',
      revitVersion: '2024.1'
    },
    {
      id: '2',
      licenseKey: plugin.licenseKey || '',
      machineId: 'LAPTOP-XYZ789',
      activatedAt: new Date('2024-12-15'),
      lastSeen: new Date('2024-12-25'),
      osInfo: 'Windows 10',
      revitVersion: '2023.2'
    }
  ];

  const handleActivation = async () => {
    if (!validateLicenseKeyFormat(activationKey)) {
      setErrorMessage('Invalid license key format. Please use: XXXX-XXXX-XXXX-XXXX');
      setActivationStatus('error');
      return;
    }

    setIsActivating(true);
    setActivationStatus('validating');
    setErrorMessage('');

    // Simulate activation process
    setTimeout(() => {
      // Simulate validation
      if (activationKey === plugin.licenseKey) {
        const newActivation = createActivation(activationKey, machineId, '2024.1');
        console.log('New activation:', newActivation);
        
        setActivationStatus('success');
        setTimeout(() => {
          onActivationComplete();
        }, 2000);
      } else {
        setActivationStatus('error');
        setErrorMessage('License key validation failed. Please check your key and try again.');
      }
      setIsActivating(false);
    }, 2000);
  };

  const handleDeactivation = (activationId: string) => {
    if (confirm('Are you sure you want to deactivate this device? You can reactivate it later.')) {
      console.log('Deactivating:', activationId);
      alert('Device deactivated successfully');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Activation Status Card */}
      <div className={`rounded-lg p-6 ${
        plugin.licenseStatus === 'active' 
          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
          : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{plugin.name}</h3>
            <p className="text-sm opacity-90">
              License Status: <span className="font-semibold">{plugin.licenseStatus.toUpperCase()}</span>
            </p>
            {plugin.licenseKey && (
              <div className="flex items-center gap-2 mt-2">
                <code className="bg-white/20 px-3 py-1 rounded text-sm">{plugin.licenseKey}</code>
                <button
                  onClick={() => copyToClipboard(plugin.licenseKey!)}
                  className="text-white/80 hover:text-white"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
          <Shield className="h-12 w-12 opacity-80" />
        </div>
      </div>

      {/* Activation Form */}
      {plugin.licenseStatus !== 'active' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activate Plugin</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Key
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={activationKey}
                  onChange={(e) => setActivationKey(e.target.value.toUpperCase())}
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
                  maxLength={19}
                />
                <button
                  onClick={handleActivation}
                  disabled={isActivating || !activationKey}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isActivating ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Activating...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4" />
                      Activate
                    </>
                  )}
                </button>
              </div>
              {errorMessage && (
                <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Machine ID:</strong> <code className="bg-white px-2 py-1 rounded">{machineId}</code>
              </p>
              <p className="text-sm text-blue-700 mt-1">
                This unique identifier will be associated with your license activation.
              </p>
            </div>

            <button
              onClick={() => setShowManualActivation(!showManualActivation)}
              className="text-primary hover:text-blue-700 text-sm font-medium"
            >
              {showManualActivation ? 'Hide' : 'Show'} Manual Activation Instructions
            </button>

            {showManualActivation && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-gray-900">Manual Activation Steps:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  <li>Copy your Machine ID: <code className="bg-white px-2 py-1 rounded">{machineId}</code></li>
                  <li>Visit our activation portal: <a href="#" className="text-primary hover:underline">activate.apipluginspro.com</a></li>
                  <li>Enter your license key and Machine ID</li>
                  <li>Download the activation file</li>
                  <li>Place the file in your Revit plugins folder</li>
                  <li>Restart Revit to complete activation</li>
                </ol>
              </div>
            )}
          </div>

          {activationStatus === 'validating' && (
            <div className="mt-4 bg-blue-50 rounded-lg p-4 flex items-center gap-3">
              <Loader className="h-5 w-5 text-blue-600 animate-spin" />
              <p className="text-blue-800">Validating license key and activating plugin...</p>
            </div>
          )}

          {activationStatus === 'success' && (
            <div className="mt-4 bg-green-50 rounded-lg p-4 flex items-center gap-3">
              <Check className="h-5 w-5 text-green-600" />
              <p className="text-green-800 font-semibold">Plugin activated successfully!</p>
            </div>
          )}
        </div>
      )}

      {/* Active Devices */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Activated Devices</h3>
          <button className="text-primary hover:text-blue-700 flex items-center gap-1 text-sm">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        <div className="space-y-3">
          {activations.map((activation) => (
            <div key={activation.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Monitor className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">{activation.machineId}</p>
                    <div className="text-sm text-gray-600 space-y-1 mt-1">
                      <p>OS: {activation.osInfo} • Revit: {activation.revitVersion}</p>
                      <p>Activated: {activation.activatedAt.toLocaleDateString()}</p>
                      <p>Last Seen: {activation.lastSeen.toLocaleDateString()} at {activation.lastSeen.toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {activation.machineId === machineId && (
                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-semibold">
                      This Device
                    </span>
                  )}
                  <button
                    onClick={() => handleDeactivation(activation.id)}
                    className="text-red-500 hover:text-red-600 p-1"
                    title="Deactivate this device"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Monitor className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p>No activated devices yet</p>
          </div>
        )}

        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-amber-900 mb-1">Activation Limit</p>
              <p className="text-amber-700">
                You have used 2 of 5 available activations for this license.
                Deactivate unused devices to free up slots.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}