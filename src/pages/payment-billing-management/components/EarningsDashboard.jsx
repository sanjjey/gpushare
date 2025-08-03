import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EarningsDashboard = ({ earningsData, user }) => {
  const isProvider = user?.role === 'provider';

  if (!isProvider) return null;

  const monthlyData = [
    { month: 'Jan', earnings: 1200, hours: 45 },
    { month: 'Feb', earnings: 1800, hours: 67 },
    { month: 'Mar', earnings: 2400, hours: 89 },
    { month: 'Apr', earnings: 2100, hours: 78 },
    { month: 'May', earnings: 2800, hours: 95 },
    { month: 'Jun', earnings: 3200, hours: 112 }
  ];

  const payoutSchedule = [
    {
      id: 1,
      amount: 1250.00,
      date: '2025-08-15',
      status: 'scheduled',
      method: 'Bank Transfer'
    },
    {
      id: 2,
      amount: 890.50,
      date: '2025-08-01',
      status: 'completed',
      method: 'PayPal'
    },
    {
      id: 3,
      amount: 2100.75,
      date: '2025-07-15',
      status: 'completed',
      method: 'Bank Transfer'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'scheduled':
        return 'text-primary bg-primary/10';
      case 'processing':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-success" />
            </div>
            <h3 className="font-semibold text-foreground">Total Revenue</h3>
          </div>
          <p className="text-3xl font-bold text-foreground">${earningsData?.totalRevenue}</p>
          <p className="text-sm text-muted-foreground">All time earnings</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">This Month</h3>
          </div>
          <p className="text-3xl font-bold text-foreground">${earningsData?.monthlyEarnings}</p>
          <div className="flex items-center space-x-1 mt-2">
            <Icon name="TrendingUp" size={14} className="text-success" />
            <span className="text-sm text-success">+18.2% from last month</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <h3 className="font-semibold text-foreground">Pending Payout</h3>
          </div>
          <p className="text-3xl font-bold text-foreground">${earningsData?.pendingPayout}</p>
          <p className="text-sm text-muted-foreground">Next payout: Aug 15</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={20} className="text-accent" />
            </div>
            <h3 className="font-semibold text-foreground">Rental Hours</h3>
          </div>
          <p className="text-3xl font-bold text-foreground">{earningsData?.totalHours}</p>
          <p className="text-sm text-muted-foreground">This month</p>
        </div>
      </div>
      {/* Earnings Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Monthly Earnings</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">6M</Button>
            <Button variant="outline" size="sm">1Y</Button>
            <Button size="sm">All</Button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="earnings" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Payout Schedule */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Payout Schedule</h3>
          <Button variant="outline" iconName="Settings" iconPosition="left">
            Payout Settings
          </Button>
        </div>

        <div className="space-y-4">
          {payoutSchedule?.map((payout) => (
            <div key={payout?.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name="ArrowUpRight" size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">${payout?.amount?.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">{payout?.method}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(payout.date)?.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(payout?.status)}`}>
                  {payout?.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Automatic Payouts</p>
              <p className="text-sm text-muted-foreground">
                Payouts are processed automatically every 15 days when your balance exceeds $100.
                You can also request manual payouts at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Tax Documents */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Tax Documents</h3>
          <Button variant="outline" iconName="Download" iconPosition="left">
            Download 1099
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="FileText" size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">2024 Tax Summary</p>
                <p className="text-sm text-muted-foreground">Form 1099-MISC</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Total earnings: $28,450.00
            </p>
            <Button variant="outline" size="sm" fullWidth>
              Download PDF
            </Button>
          </div>

          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="FileText" size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">2023 Tax Summary</p>
                <p className="text-sm text-muted-foreground">Form 1099-MISC</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Total earnings: $21,200.00
            </p>
            <Button variant="outline" size="sm" fullWidth>
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsDashboard;