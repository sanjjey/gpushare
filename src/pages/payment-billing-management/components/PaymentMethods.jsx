import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PaymentMethods = ({ paymentMethods, onAddMethod, onRemoveMethod, onSetDefault }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMethod, setNewMethod] = useState({
    type: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: '',
    bankName: '',
    accountNumber: '',
    routingNumber: ''
  });

  const methodTypes = [
    { value: 'card', label: 'Credit/Debit Card' },
    { value: 'bank', label: 'Bank Account' },
    { value: 'paypal', label: 'PayPal' }
  ];

  const handleAddMethod = () => {
    onAddMethod(newMethod);
    setNewMethod({
      type: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      holderName: '',
      bankName: '',
      accountNumber: '',
      routingNumber: ''
    });
    setShowAddForm(false);
  };

  const getMethodIcon = (type) => {
    switch (type) {
      case 'card':
        return 'CreditCard';
      case 'bank':
        return 'Building2';
      case 'paypal':
        return 'Wallet';
      default:
        return 'CreditCard';
    }
  };

  const maskCardNumber = (number) => {
    return `**** **** **** ${number?.slice(-4)}`;
  };

  const maskAccountNumber = (number) => {
    return `****${number?.slice(-4)}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Payment Methods</h2>
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowAddForm(true)}
        >
          Add Method
        </Button>
      </div>
      {/* Existing Payment Methods */}
      <div className="space-y-4 mb-6">
        {paymentMethods?.map((method) => (
          <div key={method?.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                <Icon name={getMethodIcon(method?.type)} size={20} className="text-muted-foreground" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-foreground">
                    {method?.type === 'card' ? method?.brand : method?.type === 'bank' ? method?.bankName : 'PayPal'}
                  </p>
                  {method?.isDefault && (
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {method?.type === 'card' 
                    ? maskCardNumber(method?.cardNumber)
                    : method?.type === 'bank'
                    ? maskAccountNumber(method?.accountNumber)
                    : method?.email
                  }
                </p>
                <p className="text-xs text-muted-foreground">
                  {method?.type === 'card' ? `Expires ${method?.expiryDate}` : `Added ${method?.addedDate}`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!method?.isDefault && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSetDefault(method?.id)}
                >
                  Set Default
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveMethod(method?.id)}
                className="text-destructive hover:text-destructive"
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Add Payment Method Form */}
      {showAddForm && (
        <div className="border border-border rounded-lg p-6 bg-muted/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Add Payment Method</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAddForm(false)}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          <div className="space-y-4">
            <Select
              label="Payment Method Type"
              options={methodTypes}
              value={newMethod?.type}
              onChange={(value) => setNewMethod({ ...newMethod, type: value })}
            />

            {newMethod?.type === 'card' && (
              <>
                <Input
                  label="Card Holder Name"
                  type="text"
                  placeholder="John Doe"
                  value={newMethod?.holderName}
                  onChange={(e) => setNewMethod({ ...newMethod, holderName: e?.target?.value })}
                />
                <Input
                  label="Card Number"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={newMethod?.cardNumber}
                  onChange={(e) => setNewMethod({ ...newMethod, cardNumber: e?.target?.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    type="text"
                    placeholder="MM/YY"
                    value={newMethod?.expiryDate}
                    onChange={(e) => setNewMethod({ ...newMethod, expiryDate: e?.target?.value })}
                  />
                  <Input
                    label="CVV"
                    type="text"
                    placeholder="123"
                    value={newMethod?.cvv}
                    onChange={(e) => setNewMethod({ ...newMethod, cvv: e?.target?.value })}
                  />
                </div>
              </>
            )}

            {newMethod?.type === 'bank' && (
              <>
                <Input
                  label="Bank Name"
                  type="text"
                  placeholder="Chase Bank"
                  value={newMethod?.bankName}
                  onChange={(e) => setNewMethod({ ...newMethod, bankName: e?.target?.value })}
                />
                <Input
                  label="Account Number"
                  type="text"
                  placeholder="1234567890"
                  value={newMethod?.accountNumber}
                  onChange={(e) => setNewMethod({ ...newMethod, accountNumber: e?.target?.value })}
                />
                <Input
                  label="Routing Number"
                  type="text"
                  placeholder="021000021"
                  value={newMethod?.routingNumber}
                  onChange={(e) => setNewMethod({ ...newMethod, routingNumber: e?.target?.value })}
                />
              </>
            )}

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddMethod}>
                Add Payment Method
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;