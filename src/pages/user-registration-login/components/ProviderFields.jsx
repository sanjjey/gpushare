import React from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const ProviderFields = ({ formData, onInputChange, errors }) => {
  const payoutOptions = [
    { value: 'paypal', label: 'PayPal' },
    { value: 'bank', label: 'Bank Transfer' },
    { value: 'crypto', label: 'Cryptocurrency' },
    { value: 'stripe', label: 'Stripe Connect' }
  ];

  return (
    <div className="space-y-6 pt-6 border-t border-border">
      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-medium text-foreground mb-2 flex items-center">
          <span className="w-2 h-2 bg-success rounded-full mr-2"></span>
          Provider Setup
        </h4>
        <p className="text-sm text-muted-foreground">
          Additional information required for GPU providers
        </p>
      </div>
      <Select
        label="Preferred Payout Method"
        description="How would you like to receive payments?"
        options={payoutOptions}
        value={formData?.payoutMethod}
        onChange={(value) => onInputChange({ target: { name: 'payoutMethod', value } })}
        error={errors?.payoutMethod}
        placeholder="Select payout method"
        required
      />
      <Input
        label="Hardware Description"
        type="text"
        name="hardwareDescription"
        placeholder="e.g., RTX 4090, 24GB VRAM, Custom Cooling"
        value={formData?.hardwareDescription}
        onChange={onInputChange}
        error={errors?.hardwareDescription}
        description="Brief description of your GPU setup"
      />
      <div className="space-y-4">
        <Checkbox
          label="Hardware Verification Consent"
          description="I consent to automated hardware verification and performance benchmarking"
          name="hardwareVerification"
          checked={formData?.hardwareVerification}
          onChange={onInputChange}
          error={errors?.hardwareVerification}
          required
        />

        <Checkbox
          label="Remote Access Agreement"
          description="I understand that renters will have remote access to my GPU during rental periods"
          name="remoteAccessAgreement"
          checked={formData?.remoteAccessAgreement}
          onChange={onInputChange}
          error={errors?.remoteAccessAgreement}
          required
        />

        <Checkbox
          label="Earnings Disclosure"
          description="I agree to share earnings data for platform analytics and tax reporting"
          name="earningsDisclosure"
          checked={formData?.earningsDisclosure}
          onChange={onInputChange}
          error={errors?.earningsDisclosure}
        />
      </div>
    </div>
  );
};

export default ProviderFields;