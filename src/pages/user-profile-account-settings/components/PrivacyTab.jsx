import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const PrivacyTab = ({ user, onUpdatePrivacy }) => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: user?.privacy?.profileVisibility || 'public',
    showEmail: user?.privacy?.showEmail || false,
    showPhone: user?.privacy?.showPhone || false,
    showLocation: user?.privacy?.showLocation || true,
    locationPrecision: user?.privacy?.locationPrecision || 'city',
    allowDirectMessages: user?.privacy?.allowDirectMessages || true,
    showOnlineStatus: user?.privacy?.showOnlineStatus || true,
    showRentalHistory: user?.privacy?.showRentalHistory || false,
    allowReviews: user?.privacy?.allowReviews || true,
    dataCollection: user?.privacy?.dataCollection || true,
    analyticsTracking: user?.privacy?.analyticsTracking || true,
    marketingCommunications: user?.privacy?.marketingCommunications || false
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (key, value) => {
    setPrivacySettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    onUpdatePrivacy(privacySettings);
    setHasChanges(false);
  };

  const profileVisibilityOptions = [
    { value: 'public', label: 'Public', description: 'Visible to all users' },
    { value: 'verified', label: 'Verified Users Only', description: 'Only verified users can see your profile' },
    { value: 'private', label: 'Private', description: 'Only you can see your profile' }
  ];

  const locationPrecisionOptions = [
    { value: 'exact', label: 'Exact Location', description: 'Show precise address' },
    { value: 'city', label: 'City Level', description: 'Show city and state only' },
    { value: 'region', label: 'Region Level', description: 'Show state/region only' },
    { value: 'country', label: 'Country Level', description: 'Show country only' },
    { value: 'hidden', label: 'Hidden', description: 'Don\'t show location' }
  ];

  const privacySections = [
    {
      title: 'Profile Visibility',
      description: 'Control who can see your profile information',
      icon: 'Eye',
      settings: [
        {
          type: 'select',
          key: 'profileVisibility',
          label: 'Profile Visibility',
          description: 'Choose who can view your profile',
          options: profileVisibilityOptions
        },
        {
          type: 'checkbox',
          key: 'showEmail',
          label: 'Show Email Address',
          description: 'Display your email address on your public profile'
        },
        {
          type: 'checkbox',
          key: 'showPhone',
          label: 'Show Phone Number',
          description: 'Display your phone number on your public profile'
        },
        {
          type: 'checkbox',
          key: 'showOnlineStatus',
          label: 'Show Online Status',
          description: 'Let others see when you\'re online'
        }
      ]
    },
    {
      title: 'Location Privacy',
      description: 'Manage how your location is shared',
      icon: 'MapPin',
      settings: [
        {
          type: 'checkbox',
          key: 'showLocation',
          label: 'Show Location',
          description: 'Display your location to help users find nearby GPUs'
        },
        {
          type: 'select',
          key: 'locationPrecision',
          label: 'Location Precision',
          description: 'Choose how precise your location appears',
          options: locationPrecisionOptions,
          disabled: !privacySettings?.showLocation
        }
      ]
    },
    {
      title: 'Communication',
      description: 'Control how others can contact you',
      icon: 'MessageCircle',
      settings: [
        {
          type: 'checkbox',
          key: 'allowDirectMessages',
          label: 'Allow Direct Messages',
          description: 'Let other users send you direct messages'
        },
        {
          type: 'checkbox',
          key: 'allowReviews',
          label: 'Allow Reviews',
          description: 'Let users leave reviews on your profile'
        }
      ]
    },
    {
      title: 'Activity & History',
      description: 'Control visibility of your platform activity',
      icon: 'Activity',
      settings: [
        {
          type: 'checkbox',
          key: 'showRentalHistory',
          label: 'Show Rental History',
          description: 'Display your rental history on your profile (ratings remain visible)'
        }
      ]
    },
    {
      title: 'Data & Analytics',
      description: 'Manage data collection and usage',
      icon: 'BarChart3',
      settings: [
        {
          type: 'checkbox',
          key: 'dataCollection',
          label: 'Usage Data Collection',
          description: 'Allow collection of usage data to improve platform experience'
        },
        {
          type: 'checkbox',
          key: 'analyticsTracking',
          label: 'Analytics Tracking',
          description: 'Enable analytics tracking for personalized recommendations'
        },
        {
          type: 'checkbox',
          key: 'marketingCommunications',
          label: 'Marketing Communications',
          description: 'Receive personalized marketing communications based on your activity'
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
                You have unsaved privacy preferences
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPrivacySettings(user?.privacy || {});
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
      {/* Privacy Sections */}
      {privacySections?.map((section, sectionIndex) => (
        <div key={sectionIndex} className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={section?.icon} size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{section?.title}</h3>
              <p className="text-sm text-muted-foreground">{section?.description}</p>
            </div>
          </div>

          <div className="space-y-6">
            {section?.settings?.map((setting, settingIndex) => (
              <div key={settingIndex} className="space-y-2">
                {setting?.type === 'checkbox' ? (
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <Checkbox
                      checked={privacySettings?.[setting?.key] || false}
                      onChange={(e) => handleSettingChange(setting?.key, e?.target?.checked)}
                      disabled={setting?.disabled}
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
                ) : setting?.type === 'select' ? (
                  <div className="space-y-2">
                    <Select
                      label={setting?.label}
                      description={setting?.description}
                      options={setting?.options}
                      value={privacySettings?.[setting?.key]}
                      onChange={(value) => handleSettingChange(setting?.key, value)}
                      disabled={setting?.disabled}
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Data Export & Deletion */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Database" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Data Management</h3>
            <p className="text-sm text-muted-foreground">Export or delete your personal data</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-medium text-foreground">Export Personal Data</p>
              <p className="text-sm text-muted-foreground">
                Download a copy of all your personal data stored on our platform
              </p>
            </div>
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
            >
              Request Export
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-medium text-foreground">Data Retention</p>
              <p className="text-sm text-muted-foreground">
                Your data is retained for 7 years after account deletion for legal compliance
              </p>
            </div>
            <Button
              variant="outline"
              iconName="Info"
              iconPosition="left"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
      {/* Privacy Tips */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-accent mt-1" />
          <div>
            <h4 className="font-medium text-foreground mb-2">Privacy Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Keep your profile visibility restricted if you're new to the platform</li>
              <li>• Consider hiding exact location for enhanced privacy</li>
              <li>• Review your privacy settings regularly as you use the platform</li>
              <li>• Enable two-factor authentication for additional security</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyTab;