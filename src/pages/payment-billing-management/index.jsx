import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import Icon from '../../components/AppIcon';

import BalanceOverview from './components/BalanceOverview';
import PaymentMethods from './components/PaymentMethods';
import TransactionHistory from './components/TransactionHistory';
import EarningsDashboard from './components/EarningsDashboard';
import BillingSettings from './components/BillingSettings';
import DisputeResolution from './components/DisputeResolution';

const PaymentBillingManagement = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [notificationCount, setNotificationCount] = useState(3);

  // Mock data
  const [balanceData, setBalanceData] = useState({
    currentBalance: 1250.75,
    monthlyEarnings: 3200.00,
    monthlySpending: 450.25,
    pendingAmount: 125.50,
    pendingCount: 2
  });

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      brand: 'Visa',
      cardNumber: '4532123456789012',
      expiryDate: '12/26',
      holderName: 'John Doe',
      isDefault: true,
      addedDate: '2024-01-15'
    },
    {
      id: 2,
      type: 'bank',
      bankName: 'Chase Bank',
      accountNumber: '1234567890',
      routingNumber: '021000021',
      isDefault: false,
      addedDate: '2024-02-20'
    },
    {
      id: 3,
      type: 'paypal',
      email: 'john.doe@email.com',
      isDefault: false,
      addedDate: '2024-03-10'
    }
  ]);

  const [transactions, setTransactions] = useState([
    {
      id: 'TXN-001',
      description: 'GPU Rental - RTX 4090',
      type: 'rental',
      amount: 45.50,
      status: 'completed',
      date: '2025-08-02T10:30:00Z',
      method: 'Visa ****9012'
    },
    {
      id: 'TXN-002',
      description: 'Payout to Bank Account',
      type: 'payout',
      amount: 1250.00,
      status: 'pending',
      date: '2025-08-01T15:45:00Z',
      method: 'Chase Bank ****7890'
    },
    {
      id: 'TXN-003',
      description: 'Account Top-up',
      type: 'deposit',
      amount: 200.00,
      status: 'completed',
      date: '2025-07-30T09:15:00Z',
      method: 'PayPal'
    },
    {
      id: 'TXN-004',
      description: 'GPU Rental - RTX 3080',
      type: 'rental',
      amount: 32.75,
      status: 'completed',
      date: '2025-07-28T14:20:00Z',
      method: 'Visa ****9012'
    },
    {
      id: 'TXN-005',
      description: 'Refund - Cancelled Rental',
      type: 'refund',
      amount: 25.00,
      status: 'completed',
      date: '2025-07-25T11:30:00Z',
      method: 'Visa ****9012'
    }
  ]);

  const [earningsData, setEarningsData] = useState({
    totalRevenue: 28450.75,
    monthlyEarnings: 3200.00,
    pendingPayout: 1250.00,
    totalHours: 112
  });

  const [billingSettings, setBillingSettings] = useState({
    billingCycle: 'monthly',
    currency: 'USD',
    spendingLimit: '1000',
    emailNotifications: true,
    smsNotifications: false,
    lowBalanceWarnings: true,
    monthlyReports: true,
    autoPayment: false,
    autoRechargeAmount: '100',
    triggerThreshold: '25',
    companyName: '',
    taxId: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    require2FA: true,
    transactionVerification: true
  });

  const [disputes, setDisputes] = useState([
    {
      id: 'DSP-001',
      transactionId: 'TXN-001',
      type: 'billing_error',
      description: 'I was charged twice for the same GPU rental session. The rental was for 2 hours but I was billed for 4 hours.',
      amount: '45.50',
      status: 'in_review',
      createdAt: '2025-07-20T10:00:00Z',
      timeline: [
        {
          action: 'Dispute created',
          timestamp: '2025-07-20T10:00:00Z'
        },
        {
          action: 'Under review by support team',
          timestamp: '2025-07-21T09:30:00Z'
        }
      ]
    },
    {
      id: 'DSP-002',
      transactionId: 'TXN-003',
      type: 'service_not_received',
      description: 'GPU was not available despite successful payment. Session never started.',
      amount: '75.00',
      status: 'resolved',
      createdAt: '2025-07-15T14:30:00Z',
      timeline: [
        {
          action: 'Dispute created',
          timestamp: '2025-07-15T14:30:00Z'
        },
        {
          action: 'Investigation completed',
          timestamp: '2025-07-16T11:00:00Z'
        },
        {
          action: 'Refund processed',
          timestamp: '2025-07-16T15:45:00Z'
        }
      ]
    }
  ]);

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Mock user data
      setUser({
        id: 1,
        name: 'John Doe',
        email: 'john.doe@email.com',
        role: 'provider',
        avatar: null
      });
    }
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'payments', label: 'Payment Methods', icon: 'CreditCard' },
    { id: 'transactions', label: 'Transactions', icon: 'Receipt' },
    ...(user?.role === 'provider' ? [{ id: 'earnings', label: 'Earnings', icon: 'TrendingUp' }] : []),
    { id: 'settings', label: 'Billing Settings', icon: 'Settings' },
    { id: 'disputes', label: 'Disputes', icon: 'MessageSquare' }
  ];

  const handleAddPaymentMethod = (method) => {
    const newMethod = {
      ...method,
      id: paymentMethods?.length + 1,
      isDefault: paymentMethods?.length === 0,
      addedDate: new Date()?.toISOString()?.split('T')?.[0]
    };
    setPaymentMethods([...paymentMethods, newMethod]);
  };

  const handleRemovePaymentMethod = (methodId) => {
    setPaymentMethods(paymentMethods?.filter(method => method?.id !== methodId));
  };

  const handleSetDefaultPaymentMethod = (methodId) => {
    setPaymentMethods(paymentMethods?.map(method => ({
      ...method,
      isDefault: method?.id === methodId
    })));
  };

  const handleUpdateBillingSettings = (newSettings) => {
    setBillingSettings(newSettings);
  };

  const handleCreateDispute = (dispute) => {
    const newDispute = {
      ...dispute,
      id: `DSP-${String(disputes?.length + 1)?.padStart(3, '0')}`,
      status: 'open',
      createdAt: new Date()?.toISOString(),
      timeline: [
        {
          action: 'Dispute created',
          timestamp: new Date()?.toISOString()
        }
      ]
    };
    setDisputes([newDispute, ...disputes]);
  };

  const handleUpdateDispute = (disputeId, updates) => {
    setDisputes(disputes?.map(dispute => 
      dispute?.id === disputeId ? { ...dispute, ...updates } : dispute
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <BalanceOverview user={user} balanceData={balanceData} />;
      case 'payments':
        return (
          <PaymentMethods
            paymentMethods={paymentMethods}
            onAddMethod={handleAddPaymentMethod}
            onRemoveMethod={handleRemovePaymentMethod}
            onSetDefault={handleSetDefaultPaymentMethod}
          />
        );
      case 'transactions':
        return <TransactionHistory transactions={transactions} user={user} />;
      case 'earnings':
        return user?.role === 'provider' ? (
          <EarningsDashboard earningsData={earningsData} user={user} />
        ) : null;
      case 'settings':
        return (
          <BillingSettings
            settings={billingSettings}
            onUpdateSettings={handleUpdateBillingSettings}
          />
        );
      case 'disputes':
        return (
          <DisputeResolution
            disputes={disputes}
            onCreateDispute={handleCreateDispute}
            onUpdateDispute={handleUpdateDispute}
          />
        );
      default:
        return <BalanceOverview user={user} balanceData={balanceData} />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={32} className="animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Payment & Billing Management - GPUShare</title>
        <meta name="description" content="Manage your payments, billing, and financial transactions on GPUShare" />
      </Helmet>
      <GlobalHeader user={user} notificationCount={notificationCount} />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="CreditCard" size={20} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Payment & Billing</h1>
                <p className="text-muted-foreground">
                  Manage your financial transactions and billing settings
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentBillingManagement;