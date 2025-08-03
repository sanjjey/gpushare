import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import NotificationIndicator from './NotificationIndicator';
import UserProfileDropdown from './UserProfileDropdown';

const GlobalHeader = ({ user, onNavigate, notificationCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      label: 'Dashboard',
      path: user?.role === 'provider' ? '/gpu-provider-dashboard' : '/gpu-renter-dashboard',
      icon: 'Home',
      roleVisibility: ['provider', 'renter']
    },
    {
      label: 'Browse GPUs',
      path: '/gpu-marketplace-browse',
      icon: 'Search',
      roleVisibility: ['provider', 'renter']
    },
    {
      label: 'Payments',
      path: '/payment-billing-management',
      icon: 'CreditCard',
      roleVisibility: ['provider', 'renter']
    },
    {
      label: 'Account',
      path: '/user-profile-account-settings',
      icon: 'User',
      roleVisibility: ['provider', 'renter']
    }
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path, label) => {
    if (onNavigate) {
      onNavigate({ path, label, timestamp: new Date()?.toISOString() });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border shadow-minimal">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link 
            to={user?.role === 'provider' ? '/gpu-provider-dashboard' : '/gpu-renter-dashboard'}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            onClick={() => handleNavigation(user?.role === 'provider' ? '/gpu-provider-dashboard' : '/gpu-renter-dashboard', 'Logo')}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">GPUShare</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems?.filter(item => item?.roleVisibility?.includes(user?.role))?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => handleNavigation(item?.path, item?.label)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Link>
            ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <NotificationIndicator count={notificationCount} />
          <UserProfileDropdown user={user} />
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-[1001] bg-black bg-opacity-50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-16 right-0 bottom-0 z-[1002] w-80 bg-card border-l border-border shadow-elevation-3 md:hidden animate-slide-in">
            <nav className="p-6 space-y-2">
              {menuItems?.filter(item => item?.roleVisibility?.includes(user?.role))?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => handleNavigation(item?.path, item?.label)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.label}</span>
                  </Link>
                ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default GlobalHeader;