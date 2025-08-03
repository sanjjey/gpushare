import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Image from '../AppImage';

const UserProfileDropdown = ({ user, onLogout, onRoleSwitch }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior
      localStorage.removeItem('user');
      navigate('/user-registration-login');
    }
  };

  const handleRoleSwitch = () => {
    setIsDropdownOpen(false);
    if (onRoleSwitch) {
      onRoleSwitch();
    } else {
      // Default role switch behavior
      const newRole = user?.role === 'provider' ? 'renter' : 'provider';
      const updatedUser = { ...user, role: newRole };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Navigate to appropriate dashboard
      const dashboardPath = newRole === 'provider' ? '/gpu-provider-dashboard' : '/gpu-renter-dashboard';
      navigate(dashboardPath);
    }
  };

  const menuItems = [
    {
      label: 'Profile Settings',
      path: '/user-profile-account-settings',
      icon: 'Settings',
      action: 'navigate'
    },
    {
      label: 'Help & Support',
      path: '/help',
      icon: 'HelpCircle',
      action: 'navigate'
    },
    {
      label: `Switch to ${user?.role === 'provider' ? 'Renter' : 'Provider'}`,
      icon: 'RefreshCw',
      action: 'role-switch'
    },
    {
      label: 'Sign Out',
      icon: 'LogOut',
      action: 'logout',
      variant: 'destructive'
    }
  ];

  const handleMenuItemClick = (item) => {
    setIsDropdownOpen(false);
    
    switch (item?.action) {
      case 'navigate':
        navigate(item?.path);
        break;
      case 'role-switch':
        handleRoleSwitch();
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  // Mock user data if not provided
  const displayUser = user || {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'provider',
    avatar: null
  };

  const getRoleDisplayName = (role) => {
    return role === 'provider' ? 'GPU Provider' : 'GPU Renter';
  };

  const getRoleBadgeColor = (role) => {
    return role === 'provider' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary';
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={handleDropdownToggle}
        className="flex items-center space-x-2 px-3 py-2 h-auto"
      >
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
          {displayUser?.avatar ? (
            <Image
              src={displayUser?.avatar}
              alt={displayUser?.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon name="User" size={16} className="text-muted-foreground" />
          )}
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-foreground truncate max-w-24">
            {displayUser?.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {getRoleDisplayName(displayUser?.role)}
          </p>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-muted-foreground transition-transform ${
            isDropdownOpen ? 'rotate-180' : ''
          }`} 
        />
      </Button>
      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <>
          <div 
            className="fixed inset-0 z-[1001]"
            onClick={() => setIsDropdownOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-elevation-2 z-[1003] animate-fade-in">
            {/* User Info Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  {displayUser?.avatar ? (
                    <Image
                      src={displayUser?.avatar}
                      alt={displayUser?.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Icon name="User" size={20} className="text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {displayUser?.name}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {displayUser?.email}
                  </p>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getRoleBadgeColor(displayUser?.role)}`}>
                    <Icon 
                      name={displayUser?.role === 'provider' ? 'Server' : 'Monitor'} 
                      size={12} 
                      className="mr-1" 
                    />
                    {getRoleDisplayName(displayUser?.role)}
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleMenuItemClick(item)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted transition-colors ${
                    item?.variant === 'destructive' ?'text-destructive hover:bg-destructive/10' :'text-foreground'
                  }`}
                >
                  <Icon 
                    name={item?.icon} 
                    size={16} 
                    className={item?.variant === 'destructive' ? 'text-destructive' : 'text-muted-foreground'} 
                  />
                  <span className="text-sm font-medium">{item?.label}</span>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                GPUShare v1.0.0
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfileDropdown;