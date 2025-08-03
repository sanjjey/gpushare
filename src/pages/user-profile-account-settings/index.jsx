import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GlobalHeader from '../../components/ui/GlobalHeader';
import ProfileTab from './components/ProfileTab';
import SecurityTab from './components/SecurityTab';
import NotificationTab from './components/NotificationTab';
import PrivacyTab from './components/PrivacyTab';
import VerificationTab from './components/VerificationTab';

const UserProfileAccountSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock user data
  useEffect(() => {
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      role: 'provider',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'Experienced GPU provider with high-performance hardware for AI/ML workloads. I maintain enterprise-grade equipment in a climate-controlled environment.',
      location: 'San Francisco, CA',
      website: 'https://johndoe.dev',
      joinedDate: new Date('2023-01-15'),
      twoFactorEnabled: false,
      notifications: {
        email: {
          rentalRequests: true,
          paymentConfirmations: true,
          systemUpdates: true,
          marketingEmails: false,
          securityAlerts: true,
          weeklyReports: true
        },
        sms: {
          rentalRequests: false,
          paymentConfirmations: true,
          systemUpdates: false,
          securityAlerts: true
        },
        push: {
          rentalRequests: true,
          paymentConfirmations: true,
          systemUpdates: true,
          chatMessages: true,
          gpuStatusChanges: true
        }
      },
      privacy: {
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false,
        showLocation: true,
        locationPrecision: 'city',
        allowDirectMessages: true,
        showOnlineStatus: true,
        showRentalHistory: false,
        allowReviews: true,
        dataCollection: true,
        analyticsTracking: true,
        marketingCommunications: false
      },
      verification: {
        identityStatus: 'verified',
        hardwareStatus: 'verified',
        documentsUploaded: [
          {
            type: 'photo_id',
            filename: 'drivers_license.jpg',
            uploadedAt: new Date('2023-02-01'),
            status: 'verified'
          }
        ],
        trustScore: 85,
        badges: ['identity_verified', 'hardware_verified', 'trusted_provider']
      }
    };
    setUser(mockUser);
  }, []);

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      description: 'Personal information and bio'
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      description: 'Password and authentication'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      description: 'Email, SMS, and push preferences'
    },
    {
      id: 'privacy',
      label: 'Privacy',
      icon: 'Eye',
      description: 'Visibility and data settings'
    }
  ];

  // Add verification tab for providers
  if (user?.role === 'provider') {
    tabs?.push({
      id: 'verification',
      label: 'Verification',
      icon: 'CheckCircle',
      description: 'Identity and hardware verification'
    });
  }

  const handleTabChange = (tabId) => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave this tab?');
      if (!confirmLeave) return;
    }
    setActiveTab(tabId);
    setHasUnsavedChanges(false);
    setIsMobileMenuOpen(false);
  };

  const handleUpdateProfile = (profileData) => {
    setUser(prev => ({ ...prev, ...profileData }));
    setHasUnsavedChanges(false);
    // Show success message
    console.log('Profile updated:', profileData);
  };

  const handleUpdateSecurity = (securityData) => {
    setUser(prev => ({ ...prev, ...securityData }));
    setHasUnsavedChanges(false);
    console.log('Security updated:', securityData);
  };

  const handleUpdateNotifications = (notificationData) => {
    setUser(prev => ({ ...prev, notifications: notificationData }));
    setHasUnsavedChanges(false);
    console.log('Notifications updated:', notificationData);
  };

  const handleUpdatePrivacy = (privacyData) => {
    setUser(prev => ({ ...prev, privacy: privacyData }));
    setHasUnsavedChanges(false);
    console.log('Privacy updated:', privacyData);
  };

  const handleUpdateVerification = (verificationData) => {
    setUser(prev => ({ ...prev, verification: { ...prev?.verification, ...verificationData } }));
    setHasUnsavedChanges(false);
    console.log('Verification updated:', verificationData);
  };

  const handleNavigation = (navigationData) => {
    console.log('Navigation:', navigationData);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab user={user} onUpdateProfile={handleUpdateProfile} />;
      case 'security':
        return <SecurityTab user={user} onUpdateSecurity={handleUpdateSecurity} />;
      case 'notifications':
        return <NotificationTab user={user} onUpdateNotifications={handleUpdateNotifications} />;
      case 'privacy':
        return <PrivacyTab user={user} onUpdatePrivacy={handleUpdatePrivacy} />;
      case 'verification':
        return <VerificationTab user={user} onUpdateVerification={handleUpdateVerification} />;
      default:
        return <ProfileTab user={user} onUpdateProfile={handleUpdateProfile} />;
    }
  };

  const currentTab = tabs?.find(tab => tab?.id === activeTab);

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Icon name="Loader2" size={24} className="animate-spin text-primary" />
          <span className="text-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader 
        user={user} 
        onNavigate={handleNavigation}
        notificationCount={3}
      />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="lg:hidden"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
            </div>
            <p className="text-muted-foreground">
              Manage your profile, security, and preferences
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-80 flex-shrink-0">
              {/* Mobile Tab Selector */}
              <div className="lg:hidden mb-6">
                <Button
                  variant="outline"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-full justify-between"
                  iconName="ChevronDown"
                  iconPosition="right"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={currentTab?.icon} size={20} />
                    <span>{currentTab?.label}</span>
                  </div>
                </Button>

                {isMobileMenuOpen && (
                  <div className="mt-2 bg-card border border-border rounded-lg shadow-elevation-2">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => handleTabChange(tab?.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg ${
                          activeTab === tab?.id ? 'bg-primary/10 text-primary' : 'text-foreground'
                        }`}
                      >
                        <Icon name={tab?.icon} size={20} />
                        <div>
                          <p className="font-medium">{tab?.label}</p>
                          <p className="text-sm text-muted-foreground">{tab?.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop Sidebar */}
              <div className="hidden lg:block bg-card rounded-lg border border-border p-2">
                <nav className="space-y-1">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => handleTabChange(tab?.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={20} />
                      <div>
                        <p className="font-medium">{tab?.label}</p>
                        <p className="text-sm opacity-80">{tab?.description}</p>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>

              {/* User Summary Card */}
              <div className="hidden lg:block mt-6 bg-card rounded-lg border border-border p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    {user?.avatar ? (
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Icon name="User" size={24} className="text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{user?.name}</h3>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${
                        user?.role === 'provider' ? 'bg-success' : 'bg-primary'
                      }`} />
                      <span className="text-xs text-muted-foreground capitalize">
                        {user?.role === 'provider' ? 'GPU Provider' : 'GPU Renter'}
                      </span>
                    </div>
                  </div>
                </div>

                {user?.role === 'provider' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Trust Score</span>
                      <span className="font-medium text-foreground">{user?.verification?.trustScore || 0}/100</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div 
                        className="h-full bg-accent rounded-full transition-all duration-300"
                        style={{ width: `${user?.verification?.trustScore || 0}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="bg-card rounded-lg border border-border">
                {/* Tab Header */}
                <div className="px-6 py-4 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={currentTab?.icon} size={20} className="text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">{currentTab?.label}</h2>
                      <p className="text-sm text-muted-foreground">{currentTab?.description}</p>
                    </div>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileAccountSettings;