// License key generation and validation utilities

export interface LicenseKey {
  key: string;
  productId: number;
  userId: string;
  email: string;
  createdAt: Date;
  expiresAt: Date | null;
  maxActivations: number;
  currentActivations: number;
  type: 'single' | 'team' | 'enterprise';
}

export interface Activation {
  id: string;
  licenseKey: string;
  machineId: string;
  activatedAt: Date;
  lastSeen: Date;
  osInfo: string;
  revitVersion: string;
}

// Generate a license key in format: XXXX-XXXX-XXXX-XXXX
export function generateLicenseKey(productId: number, userId: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const productCode = productId.toString(36).padStart(4, '0').toUpperCase();
  const userCode = userId.substring(0, 4).toUpperCase();
  
  const raw = `${productCode}${timestamp}${random}${userCode}`;
  const key = raw.match(/.{1,4}/g)?.join('-') || '';
  
  return key.substring(0, 19); // Format: XXXX-XXXX-XXXX-XXXX
}

// Validate license key format
export function validateLicenseKeyFormat(key: string): boolean {
  const pattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  return pattern.test(key);
}

// Generate machine-specific fingerprint (simplified for demo)
export function generateMachineId(): string {
  const userAgent = navigator.userAgent;
  const screenRes = `${screen.width}x${screen.height}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language;
  
  const data = `${userAgent}-${screenRes}-${timezone}-${language}`;
  return btoa(data).substring(0, 16);
}

// Check if license is valid
export function isLicenseValid(license: LicenseKey): boolean {
  const now = new Date();
  
  // Check expiration
  if (license.expiresAt && license.expiresAt < now) {
    return false;
  }
  
  // Check activation limit
  if (license.currentActivations >= license.maxActivations) {
    return false;
  }
  
  return true;
}

// Create activation record
export function createActivation(
  licenseKey: string,
  machineId: string,
  revitVersion: string
): Activation {
  return {
    id: Math.random().toString(36).substring(2),
    licenseKey,
    machineId,
    activatedAt: new Date(),
    lastSeen: new Date(),
    osInfo: navigator.platform,
    revitVersion
  };
}

// License type configurations
export const LICENSE_TYPES = {
  single: {
    name: 'Single User',
    maxActivations: 1,
    duration: 365, // days
    features: ['Basic Support', 'Updates for 1 Year']
  },
  team: {
    name: 'Team License',
    maxActivations: 5,
    duration: 365,
    features: ['Priority Support', 'Updates for 1 Year', 'Team Management']
  },
  enterprise: {
    name: 'Enterprise',
    maxActivations: -1, // unlimited
    duration: -1, // perpetual
    features: ['24/7 Support', 'Lifetime Updates', 'Custom Integration', 'Training']
  }
};

// Encrypt sensitive data (simplified - use proper encryption in production)
export function encryptLicenseData(data: any): string {
  return btoa(JSON.stringify(data));
}

// Decrypt license data
export function decryptLicenseData(encrypted: string): any {
  try {
    return JSON.parse(atob(encrypted));
  } catch {
    return null;
  }
}