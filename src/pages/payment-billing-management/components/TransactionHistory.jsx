import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TransactionHistory = ({ transactions, user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'rental', label: 'GPU Rental' },
    { value: 'payout', label: 'Payout' },
    { value: 'deposit', label: 'Deposit' },
    { value: 'refund', label: 'Refund' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' }
  ];

  const filteredTransactions = transactions?.filter(transaction => {
    const matchesSearch = transaction?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         transaction?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesType = filterType === 'all' || transaction?.type === filterType;
    const matchesStatus = filterStatus === 'all' || transaction?.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'failed':
        return 'text-destructive bg-destructive/10';
      case 'cancelled':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'rental':
        return 'Monitor';
      case 'payout':
        return 'ArrowUpRight';
      case 'deposit':
        return 'ArrowDownLeft';
      case 'refund':
        return 'RotateCcw';
      default:
        return 'DollarSign';
    }
  };

  const formatAmount = (amount, type) => {
    const prefix = ['payout', 'refund']?.includes(type) ? '+' : '-';
    return `${prefix}$${Math.abs(amount)?.toFixed(2)}`;
  };

  const downloadReceipt = (transactionId) => {
    // Mock download functionality
    console.log(`Downloading receipt for transaction: ${transactionId}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-4 sm:mb-0">Transaction History</h2>
        <Button variant="outline" iconName="Download" iconPosition="left">
          Export CSV
        </Button>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Input
          type="search"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
        />
        <Select
          options={typeOptions}
          value={filterType}
          onChange={setFilterType}
          placeholder="Filter by type"
        />
        <Select
          options={statusOptions}
          value={filterStatus}
          onChange={setFilterStatus}
          placeholder="Filter by status"
        />
        <Select
          options={dateOptions}
          value={dateRange}
          onChange={setDateRange}
          placeholder="Date range"
        />
      </div>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Transaction</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
              <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions?.map((transaction) => (
              <tr key={transaction?.id} className="border-b border-border hover:bg-muted/50">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Icon name={getTypeIcon(transaction?.type)} size={16} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{transaction?.description}</p>
                      <p className="text-sm text-muted-foreground">ID: {transaction?.id}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="capitalize text-foreground">{transaction?.type}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`font-medium ${
                    ['payout', 'refund']?.includes(transaction?.type) ? 'text-success' : 'text-foreground'
                  }`}>
                    {formatAmount(transaction?.amount, transaction?.type)}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(transaction?.status)}`}>
                    {transaction?.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-muted-foreground">
                  {new Date(transaction.date)?.toLocaleDateString()}
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Download"
                      onClick={() => downloadReceipt(transaction?.id)}
                    >
                      Receipt
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredTransactions?.map((transaction) => (
          <div key={transaction?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={getTypeIcon(transaction?.type)} size={16} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{transaction?.description}</p>
                  <p className="text-sm text-muted-foreground capitalize">{transaction?.type}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(transaction?.status)}`}>
                {transaction?.status}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-lg font-semibold ${
                  ['payout', 'refund']?.includes(transaction?.type) ? 'text-success' : 'text-foreground'
                }`}>
                  {formatAmount(transaction?.amount, transaction?.type)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date)?.toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                onClick={() => downloadReceipt(transaction?.id)}
              >
                Receipt
              </Button>
            </div>
          </div>
        ))}
      </div>
      {filteredTransactions?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Receipt" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No transactions found</p>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;