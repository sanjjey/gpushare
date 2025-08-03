import React from 'react';
import Icon from '../../../components/AppIcon';

const EarningsSummaryCard = ({ earnings }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value?.toFixed(1)}%`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-minimal">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Earnings Overview</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Calendar" size={16} />
          <span>Last 30 days</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Revenue */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={16} className="text-success" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(earnings?.totalRevenue)}
            </p>
            <div className="flex items-center space-x-1">
              <Icon 
                name={earnings?.revenueChange >= 0 ? "TrendingUp" : "TrendingDown"} 
                size={14} 
                className={earnings?.revenueChange >= 0 ? "text-success" : "text-destructive"} 
              />
              <span className={`text-sm ${earnings?.revenueChange >= 0 ? "text-success" : "text-destructive"}`}>
                {formatPercentage(earnings?.revenueChange)}
              </span>
              <span className="text-sm text-muted-foreground">vs last month</span>
            </div>
          </div>
        </div>

        {/* Pending Payouts */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={16} className="text-warning" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Pending Payouts</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(earnings?.pendingPayouts)}
            </p>
            <p className="text-sm text-muted-foreground">
              Next payout: {earnings?.nextPayoutDate}
            </p>
          </div>
        </div>

        {/* Active Rentals */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={16} className="text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Active Rentals</span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {earnings?.activeRentals}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatCurrency(earnings?.hourlyRate)}/hour avg rate
            </p>
          </div>
        </div>
      </div>
      {/* Mini Chart Placeholder */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-foreground">Revenue Trend</h3>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>This month</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-muted rounded-full"></div>
              <span>Last month</span>
            </div>
          </div>
        </div>
        <div className="h-20 bg-muted/30 rounded-lg flex items-end justify-between px-2 py-2">
          {earnings?.chartData?.map((value, index) => (
            <div
              key={index}
              className="bg-primary rounded-t-sm"
              style={{
                height: `${(value / Math.max(...earnings?.chartData)) * 100}%`,
                width: '12px'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EarningsSummaryCard;