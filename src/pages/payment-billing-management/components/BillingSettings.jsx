import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BillingSettings = ({ settings, onUpdateSettings }) => {
  const [billingSettings, setBillingSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);

  const billingCycleOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'GBP', label: 'British Pound (GBP)' },
    { value: 'CAD', label: 'Canadian Dollar (CAD)' }
  ];

  const handleSettingChange = (key, value) => {
    setBillingSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    onUpdateSettings(billingSettings);
    setHasChanges(false);
  };

  const handleResetSettings = () => {
    setBillingSettings(settings);
    setHasChanges(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Billing Settings</h2>
        {hasChanges && (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleResetSettings}>
              Reset
            </Button>
            <Button onClick={handleSaveSettings}>
              Save Changes
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-6">
        {/* Payment Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Payment Preferences</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Billing Cycle"
              description="How often you want to be billed"
              options={billingCycleOptions}
              value={billingSettings?.billingCycle}
              onChange={(value) => handleSettingChange('billingCycle', value)}
            />
            
            <Select
              label="Currency"
              description="Your preferred currency for billing"
              options={currencyOptions}
              value={billingSettings?.currency}
              onChange={(value) => handleSettingChange('currency', value)}
            />
          </div>

          <Input
            label="Spending Limit"
            type="number"
            description="Maximum amount you want to spend per month"
            placeholder="1000"
            value={billingSettings?.spendingLimit}
            onChange={(e) => handleSettingChange('spendingLimit', e?.target?.value)}
          />
        </div>

        {/* Notification Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Notification Settings</h3>
          
          <div className="space-y-3">
            <Checkbox
              label="Email notifications for payments"
              description="Receive email confirmations for all payments"
              checked={billingSettings?.emailNotifications}
              onChange={(e) => handleSettingChange('emailNotifications', e?.target?.checked)}
            />
            
            <Checkbox
              label="SMS notifications for large transactions"
              description="Get SMS alerts for transactions over $100"
              checked={billingSettings?.smsNotifications}
              onChange={(e) => handleSettingChange('smsNotifications', e?.target?.checked)}
            />
            
            <Checkbox
              label="Low balance warnings"
              description="Alert me when my balance is running low"
              checked={billingSettings?.lowBalanceWarnings}
              onChange={(e) => handleSettingChange('lowBalanceWarnings', e?.target?.checked)}
            />
            
            <Checkbox
              label="Monthly spending reports"
              description="Receive detailed monthly spending summaries"
              checked={billingSettings?.monthlyReports}
              onChange={(e) => handleSettingChange('monthlyReports', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Auto-payment Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Auto-payment Settings</h3>
          
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={billingSettings?.autoPayment}
                onChange={(e) => handleSettingChange('autoPayment', e?.target?.checked)}
              />
              <div className="flex-1">
                <p className="font-medium text-foreground">Enable automatic payments</p>
                <p className="text-sm text-muted-foreground">
                  Automatically charge your default payment method when your balance is low
                </p>
              </div>
            </div>
            
            {billingSettings?.autoPayment && (
              <div className="mt-4 ml-6 space-y-3">
                <Input
                  label="Auto-recharge amount"
                  type="number"
                  placeholder="100"
                  value={billingSettings?.autoRechargeAmount}
                  onChange={(e) => handleSettingChange('autoRechargeAmount', e?.target?.value)}
                />
                
                <Input
                  label="Trigger threshold"
                  type="number"
                  description="Recharge when balance falls below this amount"
                  placeholder="25"
                  value={billingSettings?.triggerThreshold}
                  onChange={(e) => handleSettingChange('triggerThreshold', e?.target?.value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Invoice Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Invoice Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Company Name"
              type="text"
              placeholder="Your Company Name"
              value={billingSettings?.companyName}
              onChange={(e) => handleSettingChange('companyName', e?.target?.value)}
            />
            
            <Input
              label="Tax ID / VAT Number"
              type="text"
              placeholder="123-45-6789"
              value={billingSettings?.taxId}
              onChange={(e) => handleSettingChange('taxId', e?.target?.value)}
            />
          </div>

          <div className="space-y-3">
            <Input
              label="Billing Address"
              type="text"
              placeholder="123 Main Street"
              value={billingSettings?.billingAddress}
              onChange={(e) => handleSettingChange('billingAddress', e?.target?.value)}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="City"
                type="text"
                placeholder="New York"
                value={billingSettings?.city}
                onChange={(e) => handleSettingChange('city', e?.target?.value)}
              />
              
              <Input
                label="State/Province"
                type="text"
                placeholder="NY"
                value={billingSettings?.state}
                onChange={(e) => handleSettingChange('state', e?.target?.value)}
              />
              
              <Input
                label="ZIP/Postal Code"
                type="text"
                placeholder="10001"
                value={billingSettings?.zipCode}
                onChange={(e) => handleSettingChange('zipCode', e?.target?.value)}
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Security Settings</h3>
          
          <div className="space-y-3">
            <Checkbox
              label="Require 2FA for payment changes"
              description="Add extra security when modifying payment methods"
              checked={billingSettings?.require2FA}
              onChange={(e) => handleSettingChange('require2FA', e?.target?.checked)}
            />
            
            <Checkbox
              label="Transaction verification emails"
              description="Send verification emails for all transactions"
              checked={billingSettings?.transactionVerification}
              onChange={(e) => handleSettingChange('transactionVerification', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border border-destructive/20 rounded-lg p-4 bg-destructive/5">
          <h3 className="text-lg font-medium text-destructive mb-3">Danger Zone</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Delete all payment data</p>
                <p className="text-sm text-muted-foreground">
                  Permanently remove all saved payment methods and billing history
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Delete Data
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;