import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const QuickActionsPanel = ({ onAddGPU, onBulkManage, notifications }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const quickActions = [
    {
      id: 'add-gpu',
      title: 'Add New GPU',
      description: 'List a new GPU for rent',
      icon: 'Plus',
      color: 'bg-primary text-primary-foreground',
      action: onAddGPU
    },
    {
      id: 'bulk-manage',
      title: 'Bulk Management',
      description: 'Manage multiple GPUs',
      icon: 'Settings',
      color: 'bg-secondary text-secondary-foreground',
      action: onBulkManage
    },
    {
      id: 'analytics',
      title: 'View Analytics',
      description: 'Performance insights',
      icon: 'BarChart3',
      color: 'bg-accent text-accent-foreground',
      action: () => console.log('View Analytics')
    },
    {
      id: 'support',
      title: 'Get Support',
      description: 'Help & documentation',
      icon: 'HelpCircle',
      color: 'bg-muted text-muted-foreground',
      action: () => console.log('Get Support')
    }
  ];

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return notificationTime?.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-minimal">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors text-left"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action?.color}`}>
                <Icon name={action?.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{action?.title}</p>
                <p className="text-sm text-muted-foreground">{action?.description}</p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
      {/* Notification Center */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-minimal">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          <div className="flex items-center space-x-2">
            {notifications?.filter(n => !n?.read)?.length > 0 && (
              <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
                {notifications?.filter(n => !n?.read)?.length}
              </span>
            )}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-sm text-primary hover:text-primary/80 font-medium"
            >
              {showNotifications ? 'Hide' : 'Show All'}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {(showNotifications ? notifications : notifications?.slice(0, 3))?.map((notification) => (
            <div
              key={notification?.id}
              className={`flex items-start space-x-3 p-3 rounded-lg ${
                !notification?.read ? 'bg-primary/5 border border-primary/20' : 'bg-muted/30'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                notification?.type === 'rental_request' ? 'bg-primary/10 text-primary' :
                notification?.type === 'payment'? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
              }`}>
                <Icon 
                  name={
                    notification?.type === 'rental_request' ? 'MessageSquare' :
                    notification?.type === 'payment'? 'DollarSign' : 'AlertCircle'
                  } 
                  size={14} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {notification?.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {notification?.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTimestamp(notification?.timestamp)}
                </p>
              </div>
              {!notification?.read && (
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
              )}
            </div>
          ))}
        </div>

        {notifications?.length === 0 && (
          <div className="text-center py-6">
            <Icon name="Bell" size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No notifications</p>
          </div>
        )}
      </div>
      {/* Performance Summary */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-minimal">
        <h3 className="text-lg font-semibold text-foreground mb-4">Performance Summary</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Utilization Rate</span>
            <span className="text-sm font-medium text-foreground">78%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-success h-2 rounded-full" style={{ width: '78%' }}></div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Avg. Session Duration</span>
            <span className="text-sm font-medium text-foreground">4.2 hours</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Customer Rating</span>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5]?.map((star) => (
                <Icon
                  key={star}
                  name="Star"
                  size={14}
                  className={star <= 4 ? "text-warning fill-current" : "text-muted"}
                />
              ))}
              <span className="text-sm font-medium text-foreground ml-1">4.8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;