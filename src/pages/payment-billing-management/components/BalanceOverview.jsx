import React from 'react';
import Icon from '../../../components/AppIcon';

const BalanceOverview = ({ user, balanceData }) => {
  const isProvider = user?.role === 'provider';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Current Balance */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Wallet" size={20} className="text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Current Balance</h3>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-foreground">${balanceData?.currentBalance}</p>
          <p className="text-sm text-muted-foreground">Available for {isProvider ? 'withdrawal' : 'spending'}</p>
        </div>
      </div>
      {/* Monthly Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name={isProvider ? "TrendingUp" : "TrendingDown"} size={20} className="text-success" />
            </div>
            <h3 className="font-semibold text-foreground">This Month</h3>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-foreground">
            ${isProvider ? balanceData?.monthlyEarnings : balanceData?.monthlySpending}
          </p>
          <p className="text-sm text-muted-foreground">
            {isProvider ? 'Total earnings' : 'Total spent'}
          </p>
          <div className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={14} className="text-success" />
            <span className="text-sm text-success">+12.5% from last month</span>
          </div>
        </div>
      </div>
      {/* Pending Transactions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <h3 className="font-semibold text-foreground">Pending</h3>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-foreground">${balanceData?.pendingAmount}</p>
          <p className="text-sm text-muted-foreground">
            {balanceData?.pendingCount} {isProvider ? 'payouts' : 'payments'} pending
          </p>
        </div>
      </div>
    </div>
  );
};

export default BalanceOverview;