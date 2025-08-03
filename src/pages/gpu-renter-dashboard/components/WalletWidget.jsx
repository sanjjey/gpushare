import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WalletWidget = ({ balance = 245.50, onTopUp }) => {
  const [showTransactions, setShowTransactions] = useState(false);

  const recentTransactions = [
    {
      id: 1,
      type: 'rental_payment',
      description: 'RTX 4090 Rental - 4 hours',
      amount: -18.00,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed'
    },
    {
      id: 2,
      type: 'top_up',
      description: 'Wallet Top-up',
      amount: +100.00,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'completed'
    },
    {
      id: 3,
      type: 'rental_payment',
      description: 'RTX 3080 Rental - 2 hours',
      amount: -12.50,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: 'completed'
    }
  ];

  const formatAmount = (amount) => {
    const sign = amount >= 0 ? '+' : '';
    return `${sign}$${Math.abs(amount)?.toFixed(2)}`;
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'rental_payment':
        return 'CreditCard';
      case 'top_up':
        return 'Plus';
      default:
        return 'DollarSign';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-minimal">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Wallet</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowTransactions(!showTransactions)}
        >
          <Icon name="History" size={16} />
        </Button>
      </div>
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-foreground mb-2">
          ${balance?.toFixed(2)}
        </div>
        <p className="text-sm text-muted-foreground">Available Balance</p>
      </div>
      <div className="flex gap-3 mb-4">
        <Button
          variant="default"
          size="sm"
          className="flex-1"
          onClick={onTopUp}
          iconName="Plus"
          iconPosition="left"
        >
          Top Up
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          iconName="Send"
          iconPosition="left"
        >
          Withdraw
        </Button>
      </div>
      {showTransactions && (
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Recent Transactions</h4>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {recentTransactions?.map((transaction) => (
              <div key={transaction?.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    transaction?.type === 'top_up' ?'bg-success/10 text-success' :'bg-primary/10 text-primary'
                  }`}>
                    <Icon name={getTransactionIcon(transaction?.type)} size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {transaction?.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatTimestamp(transaction?.timestamp)}
                    </p>
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  transaction?.amount >= 0 ? 'text-success' : 'text-foreground'
                }`}>
                  {formatAmount(transaction?.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletWidget;