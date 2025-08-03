import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'rental_request':
        return 'MessageSquare';
      case 'rental_started':
        return 'Play';
      case 'rental_ended':
        return 'Square';
      case 'payment_received':
        return 'DollarSign';
      case 'gpu_listed':
        return 'Plus';
      case 'gpu_updated':
        return 'Edit';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'rental_request':
        return 'text-primary bg-primary/10';
      case 'rental_started':
        return 'text-success bg-success/10';
      case 'rental_ended':
        return 'text-muted-foreground bg-muted';
      case 'payment_received':
        return 'text-success bg-success/10';
      case 'gpu_listed':
        return 'text-accent bg-accent/10';
      case 'gpu_updated':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return activityTime?.toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-minimal">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities?.length > 0 ? (
          activities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/30 transition-colors">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">
                    {activity?.title}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(activity?.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mt-1">
                  {activity?.description}
                </p>
                
                {activity?.amount && (
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-sm font-medium text-success">
                      {formatCurrency(activity?.amount)}
                    </span>
                    {activity?.gpuName && (
                      <span className="text-xs text-muted-foreground">
                        • {activity?.gpuName}
                      </span>
                    )}
                  </div>
                )}
                
                {activity?.renterName && (
                  <div className="flex items-center space-x-2 mt-2">
                    <Icon name="User" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {activity?.renterName}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No recent activity</p>
            <p className="text-sm text-muted-foreground mt-1">
              Your rental activities will appear here
            </p>
          </div>
        )}
      </div>
      {activities?.length > 5 && (
        <div className="mt-6 pt-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary/80 font-medium py-2">
            Load More Activities
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivityFeed;