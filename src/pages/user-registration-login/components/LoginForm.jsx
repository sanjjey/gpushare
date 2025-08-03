import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';


const LoginForm = ({ onSubmit, loading, errors }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData?.password}
        onChange={handleInputChange}
        error={errors?.password}
        required
      />
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleInputChange}
        />
        
        <Button
          variant="link"
          className="text-sm text-primary hover:underline p-0 h-auto"
        >
          Forgot password?
        </Button>
      </div>
      <Button
        type="submit"
        variant="default"
        loading={loading}
        className="w-full h-12"
        iconName="LogIn"
        iconPosition="right"
      >
        Sign In
      </Button>
      <div className="text-center text-sm text-muted-foreground">
        Demo credentials: admin@gpushare.com / password123
      </div>
    </form>
  );
};

export default LoginForm;