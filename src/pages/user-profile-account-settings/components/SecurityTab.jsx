import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SecurityTab = ({ user, onUpdateSecurity }) => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(user?.twoFactorEnabled || false);
  const [showQRCode, setShowQRCode] = useState(false);

  // Mock active sessions data
  const activeSessions = [
    {
      id: 1,
      device: 'MacBook Pro',
      browser: 'Chrome 120.0',
      location: 'San Francisco, CA',
      ipAddress: '192.168.1.100',
      lastActive: new Date(Date.now() - 5 * 60 * 1000),
      current: true
    },
    {
      id: 2,
      device: 'iPhone 15',
      browser: 'Safari Mobile',
      location: 'San Francisco, CA',
      ipAddress: '192.168.1.101',
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      current: false
    },
    {
      id: 3,
      device: 'Windows PC',
      browser: 'Edge 120.0',
      location: 'Los Angeles, CA',
      ipAddress: '10.0.0.50',
      lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
      current: false
    }
  ];

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({ ...prev, [field]: value }));
    if (passwordErrors?.[field]) {
      setPasswordErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validatePasswordForm = () => {
    const errors = {};
    
    if (!passwordForm?.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordForm?.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordForm?.newPassword?.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(passwordForm?.newPassword)) {
      errors.newPassword = 'Password must contain uppercase, lowercase, and number';
    }
    
    if (!passwordForm?.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (passwordForm?.newPassword !== passwordForm?.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handlePasswordSubmit = () => {
    if (validatePasswordForm()) {
      // Mock password change - in real app, this would call an API
      if (passwordForm?.currentPassword === 'password123') {
        onUpdateSecurity({ passwordChanged: true });
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setPasswordErrors({ currentPassword: 'Current password is incorrect' });
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev?.[field] }));
  };

  const handleTwoFactorToggle = () => {
    if (!twoFactorEnabled) {
      setShowQRCode(true);
    } else {
      setTwoFactorEnabled(false);
      setShowQRCode(false);
    }
  };

  const handleTwoFactorSetup = () => {
    setTwoFactorEnabled(true);
    setShowQRCode(false);
    onUpdateSecurity({ twoFactorEnabled: true });
  };

  const handleTerminateSession = (sessionId) => {
    // Mock session termination
    console.log('Terminating session:', sessionId);
  };

  const formatLastActive = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Active now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getDeviceIcon = (device) => {
    if (device?.includes('iPhone') || device?.includes('Android')) return 'Smartphone';
    if (device?.includes('iPad') || device?.includes('Tablet')) return 'Tablet';
    if (device?.includes('Mac')) return 'Monitor';
    return 'Laptop';
  };

  return (
    <div className="space-y-8">
      {/* Change Password */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Change Password</h3>
        <div className="space-y-4 max-w-md">
          <div className="relative">
            <Input
              label="Current Password"
              type={showPasswords?.current ? 'text' : 'password'}
              value={passwordForm?.currentPassword}
              onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
              error={passwordErrors?.currentPassword}
              placeholder="Enter current password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
            >
              <Icon name={showPasswords?.current ? 'EyeOff' : 'Eye'} size={16} />
            </button>
          </div>

          <div className="relative">
            <Input
              label="New Password"
              type={showPasswords?.new ? 'text' : 'password'}
              value={passwordForm?.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
              error={passwordErrors?.newPassword}
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
            >
              <Icon name={showPasswords?.new ? 'EyeOff' : 'Eye'} size={16} />
            </button>
          </div>

          <div className="relative">
            <Input
              label="Confirm New Password"
              type={showPasswords?.confirm ? 'text' : 'password'}
              value={passwordForm?.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
              error={passwordErrors?.confirmPassword}
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
            >
              <Icon name={showPasswords?.confirm ? 'EyeOff' : 'Eye'} size={16} />
            </button>
          </div>

          <Button
            variant="default"
            onClick={handlePasswordSubmit}
            iconName="Save"
            iconPosition="left"
            className="mt-4"
          >
            Update Password
          </Button>
        </div>
      </div>
      {/* Two-Factor Authentication */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Add an extra layer of security to your account
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`text-sm font-medium ${twoFactorEnabled ? 'text-success' : 'text-muted-foreground'}`}>
              {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </span>
            <button
              onClick={handleTwoFactorToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                twoFactorEnabled ? 'bg-success' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {showQRCode && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-medium text-foreground mb-3">Setup Two-Factor Authentication</h4>
            <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="bg-white p-4 rounded-lg">
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                  <Icon name="QrCode" size={48} className="text-gray-400" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-3">
                  1. Install an authenticator app like Google Authenticator or Authy
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  2. Scan this QR code with your authenticator app
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  3. Enter the 6-digit code from your app to complete setup
                </p>
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Enter 6-digit code"
                    className="w-40"
                  />
                  <Button
                    variant="default"
                    onClick={handleTwoFactorSetup}
                    size="sm"
                  >
                    Verify & Enable
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Active Sessions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Active Sessions</h3>
        <div className="space-y-4">
          {activeSessions?.map((session) => (
            <div
              key={session?.id}
              className="flex items-center justify-between p-4 bg-muted rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                  <Icon name={getDeviceIcon(session?.device)} size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-foreground">{session?.device}</p>
                    {session?.current && (
                      <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{session?.browser}</p>
                  <p className="text-sm text-muted-foreground">
                    {session?.location} • {session?.ipAddress} • {formatLastActive(session?.lastActive)}
                  </p>
                </div>
              </div>
              {!session?.current && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTerminateSession(session?.id)}
                  iconName="X"
                  iconPosition="left"
                >
                  Terminate
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            iconName="LogOut"
            iconPosition="left"
          >
            Sign Out All Other Sessions
          </Button>
        </div>
      </div>
      {/* Account Deletion */}
      <div className="bg-card rounded-lg border border-destructive/20 p-6">
        <h3 className="text-lg font-semibold text-destructive mb-2">Danger Zone</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
          >
            Export Account Data
          </Button>
          <Button
            variant="destructive"
            iconName="Trash2"
            iconPosition="left"
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;