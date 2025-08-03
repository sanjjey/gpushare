import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivityFeed = ({ onViewAll }) => {
  const [activities, setActivities] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const mockActivities = [
      {
        id: 1,
        type: 'rental_started',
        title: 'GPU Rental Started',
        description: 'Successfully started rental session for RTX 4090',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        icon: 'Play',
        color: 'text-success',
        bgColor: 'bg-success/10',
        metadata: {
          gpuModel: 'RTX 4090',
          provider: 'TechGuru_92',
          sessionId: 'sess_4090_001'
        }
      },
      {
        id: 2,
        type: 'payment_processed',
        title: 'Payment Processed',
        description: 'Payment of $18.00 processed for GPU rental',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        icon: 'CreditCard',
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        metadata: {
          amount: 18.00,
          paymentMethod: 'Wallet Balance'
        }
      },
      {
        id: 3,
        type: 'rental_completed',
        title: 'Rental Session Completed',
        description: 'RTX 3080 rental session completed successfully',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        icon: 'CheckCircle',
        color: 'text-success',
        bgColor: 'bg-success/10',
        metadata: {
          gpuModel: 'RTX 3080',
          duration: '2 hours',
          totalCost: 6.50
        }
      },
      {
        id: 4,
        type: 'wallet_topup',
        title: 'Wallet Top-up',
        description: 'Added $100.00 to your wallet balance',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        icon: 'Plus',
        color: 'text-success',
        bgColor: 'bg-success/10',
        metadata: {
          amount: 100.00,
          paymentMethod: 'Credit Card'
        }
      },
      {
        id: 5,
        type: 'favorite_added',
        title: 'GPU Added to Favorites',
        description: 'Added RTX 4070 from NextGen_Rigs to favorites',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        icon: 'Heart',
        color: 'text-error',
        bgColor: 'bg-error/10',
        metadata: {
          gpuModel: 'RTX 4070',
          provider: 'NextGen_Rigs'
        }
      },
      {
        id: 6,
        type: 'profile_updated',
        title: 'Profile Updated',
        description: 'Updated your account preferences and notification settings',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        icon: 'Settings',
        color: 'text-muted-foreground',
        bgColor: 'bg-muted',
        metadata: {}
      },
      {
        id: 7,
        type: 'rental_request',
        title: 'Rental Request Sent',
        description: 'Sent rental request for RTX 4080 to CloudMiner_Pro',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        icon: 'Send',
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        metadata: {
          gpuModel: 'RTX 4080',
          provider: 'CloudMiner_Pro'
        }
      },
      {
        id: 8,
        type: 'system_notification',
        title: 'System Maintenance',
        description: 'Scheduled maintenance completed successfully',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        icon: 'AlertCircle',
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        metadata: {}
      }
    ];

    setActivities(mockActivities);
  }, []);

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp?.toLocaleDateString();
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'rental_started':
        return 'Play';
      case 'rental_completed':
        return 'CheckCircle';
      case 'payment_processed':
        return 'CreditCard';
      case 'wallet_topup':
        return 'Plus';
      case 'favorite_added':
        return 'Heart';
      case 'profile_updated':
        return 'Settings';
      case 'rental_request':
        return 'Send';
      case 'system_notification':
        return 'AlertCircle';
      default:
        return 'Activity';
    }
  };

  const displayedActivities = showAll ? activities : activities?.slice(0, 5);

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-minimal">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          iconName={showAll ? 'ChevronUp' : 'ChevronDown'}
          iconPosition="right"
        >
          {showAll ? 'Show Less' : 'Show All'}
        </Button>
      </div>
      {activities?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Activity" size={32} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No recent activity</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedActivities?.map((activity, index) => (
            <div key={activity?.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${activity?.bgColor} flex-shrink-0`}>
                <Icon 
                  name={getActivityIcon(activity?.type)} 
                  size={16} 
                  className={activity?.color} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground">
                    {activity?.title}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(activity?.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {activity?.description}
                </p>
                
                {/* Activity Metadata */}
                {Object.keys(activity?.metadata)?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {activity?.metadata?.gpuModel && (
                      <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-full">
                        {activity?.metadata?.gpuModel}
                      </span>
                    )}
                    {activity?.metadata?.provider && (
                      <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-full">
                        {activity?.metadata?.provider}
                      </span>
                    )}
                    {activity?.metadata?.amount && (
                      <span className="px-2 py-1 bg-success/10 text-xs text-success rounded-full">
                        ${activity?.metadata?.amount?.toFixed(2)}
                      </span>
                    )}
                    {activity?.metadata?.duration && (
                      <span className="px-2 py-1 bg-primary/10 text-xs text-primary rounded-full">
                        {activity?.metadata?.duration}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {activities?.length > 5 && !showAll && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => setShowAll(true)}
            iconName="ChevronDown"
            iconPosition="right"
          >
            View {activities?.length - 5} More Activities
          </Button>
        </div>
      )}
      {onViewAll && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={onViewAll}
            iconName="ExternalLink"
            iconPosition="right"
          >
            View Full Activity History
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentActivityFeed;