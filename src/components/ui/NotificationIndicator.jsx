import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const NotificationIndicator = ({ count = 0, onNotificationClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Mock notifications for demonstration
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'rental_request',
        title: 'New GPU Rental Request',
        message: 'Someone wants to rent your RTX 4090',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false
      },
      {
        id: 2,
        type: 'payment_received',
        title: 'Payment Received',
        message: '$45.50 received for GPU rental',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false
      },
      {
        id: 3,
        type: 'system_alert',
        title: 'GPU Status Update',
        message: 'Your GPU is now available for rent',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: true
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  // Animate when count changes
  useEffect(() => {
    if (count > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [count]);

  const handleNotificationClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (onNotificationClick) {
      onNotificationClick();
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'rental_request':
        return 'MessageSquare';
      case 'payment_received':
        return 'DollarSign';
      case 'system_alert':
        return 'AlertCircle';
      default:
        return 'Bell';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp?.toLocaleDateString();
  };

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleNotificationClick}
        className={`relative ${isAnimating ? 'animate-pulse' : ''}`}
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center animate-pulse-slow">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>
      {/* Notification Dropdown */}
      {isDropdownOpen && (
        <>
          <div 
            className="fixed inset-0 z-[1001]"
            onClick={() => setIsDropdownOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevation-2 z-[1003] animate-fade-in">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {unreadCount} unread
                  </span>
                )}
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications?.length > 0 ? (
                notifications?.map((notification) => (
                  <div
                    key={notification?.id}
                    className={`p-4 border-b border-border last:border-b-0 hover:bg-muted transition-colors cursor-pointer ${
                      !notification?.read ? 'bg-accent/5' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        notification?.type === 'rental_request' ? 'bg-primary/10 text-primary' :
                        notification?.type === 'payment_received'? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                      }`}>
                        <Icon name={getNotificationIcon(notification?.type)} size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-foreground truncate">
                            {notification?.title}
                          </p>
                          {!notification?.read && (
                            <div className="w-2 h-2 bg-primary rounded-full ml-2" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification?.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatTimestamp(notification?.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <Icon name="Bell" size={32} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No notifications yet</p>
                </div>
              )}
            </div>
            
            {notifications?.length > 0 && (
              <div className="p-4 border-t border-border">
                <Button variant="ghost" size="sm" className="w-full">
                  View All Notifications
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationIndicator;