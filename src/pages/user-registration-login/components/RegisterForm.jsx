import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import RoleSelector from './RoleSelector';
import ProviderFields from './ProviderFields';

const RegisterForm = ({ onSubmit, loading, errors }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    // Provider-specific fields
    payoutMethod: '',
    hardwareDescription: '',
    hardwareVerification: false,
    remoteAccessAgreement: false,
    earningsDisclosure: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({ ...prev, role }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Full Name"
        type="text"
        name="fullName"
        placeholder="Enter your full name"
        value={formData?.fullName}
        onChange={handleInputChange}
        error={errors?.fullName}
        required
      />
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData?.email}
        onChange={handleInputChange}
        error={errors?.email}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Create password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          description="Minimum 8 characters"
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={errors?.confirmPassword}
          required
        />
      </div>
      <RoleSelector
        selectedRole={formData?.role}
        onRoleChange={handleRoleChange}
        error={errors?.role}
      />
      {formData?.role === 'provider' && (
        <ProviderFields
          formData={formData}
          onInputChange={handleInputChange}
          errors={errors}
        />
      )}
      <div className="space-y-4 pt-6 border-t border-border">
        <Checkbox
          label="I agree to the Terms of Service"
          name="agreeToTerms"
          checked={formData?.agreeToTerms}
          onChange={handleInputChange}
          error={errors?.agreeToTerms}
          required
        />

        <Checkbox
          label="I agree to the Privacy Policy"
          name="agreeToPrivacy"
          checked={formData?.agreeToPrivacy}
          onChange={handleInputChange}
          error={errors?.agreeToPrivacy}
          required
        />
      </div>
      <Button
        type="submit"
        variant="default"
        loading={loading}
        className="w-full h-12"
        iconName="UserPlus"
        iconPosition="right"
      >
        Create Account
      </Button>
      <div className="text-center text-sm text-muted-foreground">
        Demo: Use any email format with password123 to register
      </div>
    </form>
  );
};

export default RegisterForm;