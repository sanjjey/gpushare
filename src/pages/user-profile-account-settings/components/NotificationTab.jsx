import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationTab = ({ user, onUpdateNotifications }) => {
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      rentalRequests: user?.notifications?.email?.rentalRequests ?? true,
      paymentConfirmations: user?.notifications?.email?.paymentConfirmations ?? true,
      systemUpdates: user?.notifications?.email?.systemUpdates ?? true,
      marketingEmails: user?.notifications?.email?.marketingEmails ?? false,
      securityAlerts: user?.notifications?.email?.securityAlerts ?? true,
      weeklyReports: user?.notifications?.email?.weeklyReports ?? true
    },
    sms: {
      rentalRequests: user?.notifications?.sms?.rentalRequests ?? false,
      paymentConfirmations: user?.notifications?.sms?.paymentConfirmations ?? true,
      systemUpdates: user?.notifications?.sms?.systemUpdates ?? false,
      securityAlerts: user?.notifications?.sms?.securityAlerts ?? true
    },
    push: {
      rentalRequests: user?.notifications?.push?.rentalRequests ?? true,
      paymentConfirmations: user?.notifications?.push?.paymentConfirmations ?? true,
      systemUpdates: user?.notifications?.push?.systemUpdates ?? true,
      chatMessages: user?.notifications?.push?.chatMessages ?? true,
      gpuStatusChanges: user?.notifications?.push?.gpuStatusChanges ?? true
    }
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleNotificationChange = (category, type, checked) => {
    setNotificationSettings(prev => ({
      ...prev,
      [category]: {
        ...prev?.[category],
        [type]: checked
      }
    }));
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    onUpdateNotifications(notificationSettings);
    setHasChanges(false);
  };

  const handleResetToDefaults = () => {
    const defaultSettings = {
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
    };
    setNotificationSettings(defaultSettings);
    setHasChanges(true);
  };

  const notificationCategories = [
    {
      id: 'email',
      title: 'Email Notifications',
      description: 'Receive notifications via email',
      icon: 'Mail',
      settings: [
        {
          key: 'rentalRequests',
          label: 'Rental Requests',
          description: 'When someone requests to rent your GPU or when your rental request is approved'
        },
        {
          key: 'paymentConfirmations',
          label: 'Payment Confirmations',
          description: 'Payment receipts, refunds, and billing notifications'
        },
        {
          key: 'systemUpdates',
          label: 'System Updates',
          description: 'Platform updates, maintenance notifications, and new features'
        },
        {
          key: 'marketingEmails',
          label: 'Marketing Emails',
          description: 'Product updates, tips, and promotional content'
        },
        {
          key: 'securityAlerts',
          label: 'Security Alerts',
          description: 'Login attempts, password changes, and security notifications'
        },
        {
          key: 'weeklyReports',
          label: 'Weekly Reports',
          description: 'Summary of your activity, earnings, and platform insights'
        }
      ]
    },
    {
      id: 'sms',
      title: 'SMS Notifications',
      description: 'Receive notifications via text message',
      icon: 'MessageSquare',
      settings: [
        {
          key: 'rentalRequests',
          label: 'Rental Requests',
          description: 'Urgent rental requests and approvals'
        },
        {
          key: 'paymentConfirmations',
          label: 'Payment Confirmations',
          description: 'Important payment notifications'
        },
        {
          key: 'systemUpdates',
          label: 'System Updates',
          description: 'Critical system maintenance and outages'
        },
        {
          key: 'securityAlerts',
          label: 'Security Alerts',
          description: 'Critical security notifications'
        }
      ]
    },
    {
      id: 'push',
      title: 'Push Notifications',
      description: 'Receive notifications in your browser',
      icon: 'Bell',
      settings: [
        {
          key: 'rentalRequests',
          label: 'Rental Requests',
          description: 'Real-time rental requests and status updates'
        },
        {
          key: 'paymentConfirmations',
          label: 'Payment Confirmations',
          description: 'Instant payment notifications'
        },
        {
          key: 'systemUpdates',
          label: 'System Updates',
          description: 'Platform updates and announcements'
        },
        {
          key: 'chatMessages',
          label: 'Chat Messages',
          description: 'New messages from other users'
        },
        {
          key: 'gpuStatusChanges',
          label: 'GPU Status Changes',
          description: 'When your GPU goes online/offline or encounters issues'
        }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Save Changes Bar */}
      {hasChanges && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="AlertCircle" size={20} className="text-primary" />
              <p className="text-sm font-medium text-primary">
                You have unsaved notification preferences
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setNotificationSettings(user?.notifications || {});
                  setHasChanges(false);
                }}
              >
                Discard
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSaveChanges}
                iconName="Save"
                iconPosition="left"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Notification Categories */}
      {notificationCategories?.map((category) => (
        <div key={category?.id} className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={category?.icon} size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{category?.title}</h3>
              <p className="text-sm text-muted-foreground">{category?.description}</p>
            </div>
          </div>

          <div className="space-y-4">
            {category?.settings?.map((setting) => (
              <div key={setting?.key} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <Checkbox
                  checked={notificationSettings?.[category?.id]?.[setting?.key] || false}
                  onChange={(e) => handleNotificationChange(category?.id, setting?.key, e?.target?.checked)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground cursor-pointer">
                    {setting?.label}
                  </label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {setting?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={handleResetToDefaults}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset to Defaults
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              // Enable all notifications
              const allEnabled = {};
              notificationCategories?.forEach(category => {
                allEnabled[category.id] = {};
                category?.settings?.forEach(setting => {
                  allEnabled[category.id][setting.key] = true;
                });
              });
              setNotificationSettings(allEnabled);
              setHasChanges(true);
            }}
            iconName="Volume2"
            iconPosition="left"
          >
            Enable All
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              // Disable all notifications except security
              const allDisabled = {};
              notificationCategories?.forEach(category => {
                allDisabled[category.id] = {};
                category?.settings?.forEach(setting => {
                  allDisabled[category.id][setting.key] = setting?.key === 'securityAlerts';
                });
              });
              setNotificationSettings(allDisabled);
              setHasChanges(true);
            }}
            iconName="VolumeX"
            iconPosition="left"
          >
            Disable All (Keep Security)
          </Button>
        </div>
      </div>
      {/* Notification Frequency */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Notification Frequency</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
            <div>
              <p className="text-sm font-medium text-foreground">Digest Mode</p>
              <p className="text-sm text-muted-foreground">
                Bundle non-urgent notifications into daily or weekly summaries
              </p>
            </div>
            <select className="px-3 py-2 border border-border rounded-lg bg-input text-foreground text-sm">
              <option value="instant">Instant</option>
              <option value="daily">Daily Digest</option>
              <option value="weekly">Weekly Digest</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
            <div>
              <p className="text-sm font-medium text-foreground">Quiet Hours</p>
              <p className="text-sm text-muted-foreground">
                Pause non-urgent notifications during specified hours
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="time"
                defaultValue="22:00"
                className="px-2 py-1 border border-border rounded text-sm bg-input"
              />
              <span className="text-sm text-muted-foreground">to</span>
              <input
                type="time"
                defaultValue="08:00"
                className="px-2 py-1 border border-border rounded text-sm bg-input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationTab;