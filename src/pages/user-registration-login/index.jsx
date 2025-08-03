import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLoginButtons from './components/SocialLoginButtons';
import SecurityBadges from './components/SecurityBadges';

const UserRegistrationLogin = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      const dashboardPath = userData?.role === 'provider' ? '/gpu-provider-dashboard' : '/gpu-renter-dashboard';
      navigate(dashboardPath);
    }
  }, [navigate]);

  const validateLoginForm = (formData) => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };

  const validateRegisterForm = (formData) => {
    const newErrors = {};
    
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData?.role) {
      newErrors.role = 'Please select your role';
    }
    
    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }
    
    if (!formData?.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
    }
    
    // Provider-specific validation
    if (formData?.role === 'provider') {
      if (!formData?.payoutMethod) {
        newErrors.payoutMethod = 'Please select a payout method';
      }
      
      if (!formData?.hardwareVerification) {
        newErrors.hardwareVerification = 'Hardware verification consent is required';
      }
      
      if (!formData?.remoteAccessAgreement) {
        newErrors.remoteAccessAgreement = 'Remote access agreement is required';
      }
    }
    
    return newErrors;
  };

  const handleLogin = async (formData) => {
    const validationErrors = validateLoginForm(formData);
    
    if (Object.keys(validationErrors)?.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication - check demo credentials
      if (formData?.email === 'admin@gpushare.com' && formData?.password === 'password123') {
        const userData = {
          id: 1,
          name: 'John Smith',
          email: formData?.email,
          role: 'provider',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          joinedDate: new Date()?.toISOString(),
          isVerified: true
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/gpu-provider-dashboard');
      } else if (formData?.email?.includes('@') && formData?.password === 'password123') {
        const userData = {
          id: 2,
          name: formData?.email?.split('@')?.[0],
          email: formData?.email,
          role: 'renter',
          avatar: null,
          joinedDate: new Date()?.toISOString(),
          isVerified: false
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/gpu-renter-dashboard');
      } else {
        setErrors({ 
          email: 'Invalid credentials. Use admin@gpushare.com / password123 or any email with password123' 
        });
      }
    } catch (error) {
      setErrors({ email: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    const validationErrors = validateRegisterForm(formData);
    
    if (Object.keys(validationErrors)?.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const userData = {
        id: Date.now(),
        name: formData?.fullName,
        email: formData?.email,
        role: formData?.role,
        avatar: null,
        joinedDate: new Date()?.toISOString(),
        isVerified: false,
        // Provider-specific data
        ...(formData?.role === 'provider' && {
          payoutMethod: formData?.payoutMethod,
          hardwareDescription: formData?.hardwareDescription
        })
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      
      const dashboardPath = formData?.role === 'provider' ? '/gpu-provider-dashboard' : '/gpu-renter-dashboard';
      navigate(dashboardPath);
    } catch (error) {
      setErrors({ email: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: Date.now(),
        name: `${provider} User`,
        email: `user@${provider}.com`,
        role: 'renter',
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face`,
        joinedDate: new Date()?.toISOString(),
        isVerified: true,
        loginMethod: provider
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/gpu-renter-dashboard');
    } catch (error) {
      setErrors({ email: `${provider} login failed. Please try again.` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">GPUShare</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Welcome to the GPU Marketplace
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <div className="bg-card border border-border rounded-xl shadow-minimal p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                {activeTab === 'login' ? 'Welcome Back' : 'Join GPUShare'}
              </h1>
              <p className="text-muted-foreground">
                {activeTab === 'login' ?'Sign in to access your dashboard' :'Create your account to get started'
                }
              </p>
            </div>

            {/* Tab Navigation */}
            <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Social Login */}
            <SocialLoginButtons onSocialLogin={handleSocialLogin} loading={loading} />

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            {/* Forms */}
            {activeTab === 'login' ? (
              <LoginForm 
                onSubmit={handleLogin} 
                loading={loading} 
                errors={errors} 
              />
            ) : (
              <RegisterForm 
                onSubmit={handleRegister} 
                loading={loading} 
                errors={errors} 
              />
            )}

            {/* Security Badges */}
            <SecurityBadges />
          </div>

          {/* Footer Links */}
          <div className="text-center mt-6 space-y-2">
            <p className="text-sm text-muted-foreground">
              By continuing, you agree to our{' '}
              <button className="text-primary hover:underline">Terms of Service</button>
              {' '}and{' '}
              <button className="text-primary hover:underline">Privacy Policy</button>
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} GPUShare. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserRegistrationLogin;