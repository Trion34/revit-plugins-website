import { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, Users, Clock, Activity, Globe, 
  Monitor, Cpu, HardDrive, Zap, Calendar, Filter 
} from 'lucide-react';

interface UsageMetric {
  date: string;
  activeUsers: number;
  sessions: number;
  avgSessionDuration: number; // in minutes
  features: {
    name: string;
    uses: number;
  }[];
  errors: number;
  performance: {
    avgLoadTime: number; // in ms
    avgMemoryUsage: number; // in MB
    avgCpuUsage: number; // percentage
  };
}

interface UserActivity {
  userId: string;
  userName: string;
  lastActive: string;
  totalUsage: number; // in hours
  favoriteFeatures: string[];
  machineId: string;
  location: string;
}

export default function UsageAnalytics({ productId, productName }: { productId: number; productName: string }) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedMetric, setSelectedMetric] = useState<'users' | 'performance' | 'features'>('users');
  const [realTimeUsers, setRealTimeUsers] = useState(42);

  // Simulate real-time user count updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentMetrics: UsageMetric = {
    date: '2024-12-26',
    activeUsers: 1234,
    sessions: 3456,
    avgSessionDuration: 45,
    features: [
      { name: 'Auto Layout', uses: 892 },
      { name: 'Documentation Gen', uses: 654 },
      { name: 'Clash Detection', uses: 543 },
      { name: 'Export to CAD', uses: 421 },
      { name: 'Batch Processing', uses: 387 }
    ],
    errors: 12,
    performance: {
      avgLoadTime: 250,
      avgMemoryUsage: 156,
      avgCpuUsage: 23
    }
  };

  const topUsers: UserActivity[] = [
    {
      userId: 'USR001',
      userName: 'John Smith',
      lastActive: '2 hours ago',
      totalUsage: 234,
      favoriteFeatures: ['Auto Layout', 'Documentation Gen'],
      machineId: 'DESKTOP-ABC123',
      location: 'New York, USA'
    },
    {
      userId: 'USR002',
      userName: 'Sarah Johnson',
      lastActive: '5 minutes ago',
      totalUsage: 189,
      favoriteFeatures: ['Clash Detection', 'Export to CAD'],
      machineId: 'LAPTOP-XYZ789',
      location: 'London, UK'
    },
    {
      userId: 'USR003',
      userName: 'Mike Chen',
      lastActive: '1 hour ago',
      totalUsage: 167,
      favoriteFeatures: ['Batch Processing', 'Auto Layout'],
      machineId: 'WORKSTATION-001',
      location: 'Tokyo, Japan'
    }
  ];

  const weeklyData = [
    { day: 'Mon', users: 234, sessions: 567 },
    { day: 'Tue', users: 267, sessions: 623 },
    { day: 'Wed', users: 298, sessions: 712 },
    { day: 'Thu', users: 312, sessions: 798 },
    { day: 'Fri', users: 289, sessions: 756 },
    { day: 'Sat', users: 145, sessions: 234 },
    { day: 'Sun', users: 123, sessions: 198 }
  ];

  const getHealthScore = () => {
    const errorRate = currentMetrics.errors / currentMetrics.sessions;
    const performanceScore = 100 - (currentMetrics.performance.avgLoadTime / 10);
    const usageScore = Math.min(100, (currentMetrics.activeUsers / 10));
    return Math.round((performanceScore + usageScore - errorRate * 100) / 2);
  };

  const healthScore = getHealthScore();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Usage Analytics</h2>
            <p className="text-gray-600 mt-1">{productName} - Real-time metrics and insights</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                timeRange === '7d' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                timeRange === '30d' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeRange('90d')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                timeRange === '90d' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              90 Days
            </button>
          </div>
        </div>

        {/* Real-time Status Bar */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 text-white mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="h-6 w-6 animate-pulse" />
              <div>
                <p className="text-sm opacity-90">Live Status</p>
                <p className="text-xl font-bold">{realTimeUsers} Active Users</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">System Health</p>
              <p className="text-xl font-bold">{healthScore}%</p>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-8 w-8 text-blue-600" />
              <span className="text-xs text-green-600 font-semibold">+12%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{currentMetrics.activeUsers.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Active Users</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-8 w-8 text-purple-600" />
              <span className="text-xs text-green-600 font-semibold">+5%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{currentMetrics.avgSessionDuration} min</p>
            <p className="text-sm text-gray-600">Avg. Session</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Zap className="h-8 w-8 text-green-600" />
              <span className="text-xs text-red-600 font-semibold">-3%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{currentMetrics.performance.avgLoadTime}ms</p>
            <p className="text-sm text-gray-600">Load Time</p>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-8 w-8 text-red-600" />
              <span className="text-xs text-green-600 font-semibold">-15%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{currentMetrics.errors}</p>
            <p className="text-sm text-gray-600">Errors Today</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b mb-6">
          <nav className="flex -mb-px">
            <button
              onClick={() => setSelectedMetric('users')}
              className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                selectedMetric === 'users'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              User Activity
            </button>
            <button
              onClick={() => setSelectedMetric('features')}
              className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                selectedMetric === 'features'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Feature Usage
            </button>
            <button
              onClick={() => setSelectedMetric('performance')}
              className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                selectedMetric === 'performance'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Performance
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {selectedMetric === 'users' && (
          <div className="space-y-6">
            {/* Weekly Activity Chart */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
              <div className="flex items-end justify-between h-48 gap-2">
                {weeklyData.map((data) => (
                  <div key={data.day} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-primary rounded-t" style={{ height: `${(data.users / 350) * 100}%` }}></div>
                    <span className="text-xs text-gray-600 mt-2">{data.day}</span>
                    <span className="text-xs font-semibold">{data.users}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Users Table */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Users</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-gray-700">User</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-700">Last Active</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-700">Total Usage</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-700">Location</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-700">Top Features</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {topUsers.map((user) => (
                      <tr key={user.userId} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-900">{user.userName}</p>
                            <p className="text-sm text-gray-500">{user.machineId}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{user.lastActive}</td>
                        <td className="px-4 py-3 text-sm font-medium">{user.totalUsage}h</td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {user.location}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {user.favoriteFeatures.map((feature, idx) => (
                              <span key={idx} className="bg-gray-100 text-xs px-2 py-1 rounded">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedMetric === 'features' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Usage Distribution</h3>
            {currentMetrics.features.map((feature) => (
              <div key={feature.name} className="flex items-center gap-4">
                <div className="w-32 font-medium text-gray-700">{feature.name}</div>
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${(feature.uses / 1000) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-20 text-right text-sm font-semibold text-gray-900">
                  {feature.uses}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedMetric === 'performance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">CPU Usage</p>
                    <p className="text-2xl font-bold">{currentMetrics.performance.avgCpuUsage}%</p>
                  </div>
                </div>
                <div className="bg-white rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: `${currentMetrics.performance.avgCpuUsage}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <HardDrive className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Memory Usage</p>
                    <p className="text-2xl font-bold">{currentMetrics.performance.avgMemoryUsage}MB</p>
                  </div>
                </div>
                <div className="bg-white rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-purple-600 h-full rounded-full"
                    style={{ width: `${(currentMetrics.performance.avgMemoryUsage / 500) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Response Time</p>
                    <p className="text-2xl font-bold">{currentMetrics.performance.avgLoadTime}ms</p>
                  </div>
                </div>
                <div className="bg-white rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      currentMetrics.performance.avgLoadTime < 300 ? 'bg-green-600' : 'bg-yellow-600'
                    }`}
                    style={{ width: `${Math.min(100, (currentMetrics.performance.avgLoadTime / 500) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Monitor className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-yellow-900 mb-1">Performance Tip</p>
                  <p className="text-yellow-700">
                    Consider optimizing batch processing operations to reduce memory usage during peak hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}