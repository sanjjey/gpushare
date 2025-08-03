import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileTab = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+1 (555) 123-4567',
    bio: user?.bio || 'Experienced GPU provider with high-performance hardware for AI/ML workloads.',
    location: user?.location || 'San Francisco, CA',
    website: user?.website || 'https://johndoe.dev',
    avatar: user?.avatar || null
  });
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!profileData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!profileData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(profileData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (profileData?.phone && !/^\+?[\d\s\-\(\)]+$/?.test(profileData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (profileData?.website && !/^https?:\/\/.+/?.test(profileData?.website)) {
      newErrors.website = 'Please enter a valid URL (include http:// or https://)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdateProfile(profileData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setProfileData({
      name: user?.name || 'John Doe',
      email: user?.email || 'john.doe@example.com',
      phone: user?.phone || '+1 (555) 123-4567',
      bio: user?.bio || 'Experienced GPU provider with high-performance hardware for AI/ML workloads.',
      location: user?.location || 'San Francisco, CA',
      website: user?.website || 'https://johndoe.dev',
      avatar: user?.avatar || null
    });
    setErrors({});
    setIsEditing(false);
  };

  const handleAvatarUpload = (event) => {
    const file = event.target?.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload process
      setTimeout(() => {
        const mockUrl = `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`;
        setProfileData(prev => ({ ...prev, avatar: mockUrl }));
        setIsUploading(false);
      }, 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Profile Photo Section */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Profile Photo</h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {profileData?.avatar ? (
                <Image
                  src={profileData?.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon name="User" size={32} className="text-muted-foreground" />
              )}
            </div>
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <Icon name="Loader2" size={20} className="text-white animate-spin" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-3">
              Upload a professional photo to build trust with renters. JPG or PNG, max 5MB.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('avatar-upload')?.click()}
                disabled={isUploading}
                iconName="Upload"
                iconPosition="left"
              >
                {isUploading ? 'Uploading...' : 'Upload Photo'}
              </Button>
              {profileData?.avatar && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setProfileData(prev => ({ ...prev, avatar: null }))}
                  iconName="Trash2"
                  iconPosition="left"
                >
                  Remove
                </Button>
              )}
            </div>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>
      {/* Personal Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              iconName="Edit"
              iconPosition="left"
            >
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSave}
                iconName="Save"
                iconPosition="left"
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            type="text"
            value={profileData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            error={errors?.name}
            disabled={!isEditing}
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={profileData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            disabled={!isEditing}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            value={profileData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            disabled={!isEditing}
            placeholder="+1 (555) 123-4567"
          />

          <Input
            label="Location"
            type="text"
            value={profileData?.location}
            onChange={(e) => handleInputChange('location', e?.target?.value)}
            disabled={!isEditing}
            placeholder="City, State/Country"
          />

          <div className="md:col-span-2">
            <Input
              label="Website"
              type="url"
              value={profileData?.website}
              onChange={(e) => handleInputChange('website', e?.target?.value)}
              error={errors?.website}
              disabled={!isEditing}
              placeholder="https://your-website.com"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Bio {user?.role === 'provider' && <span className="text-muted-foreground">(Recommended for providers)</span>}
            </label>
            <textarea
              value={profileData?.bio}
              onChange={(e) => handleInputChange('bio', e?.target?.value)}
              disabled={!isEditing}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
              placeholder="Tell others about yourself, your experience, and what makes you a reliable GPU provider..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              {profileData?.bio?.length}/500 characters
            </p>
          </div>
        </div>
      </div>
      {/* Account Status */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Account Status</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="CheckCircle" size={20} className="text-success" />
              </div>
              <div>
                <p className="font-medium text-foreground">Email Verified</p>
                <p className="text-sm text-muted-foreground">Your email address has been confirmed</p>
              </div>
            </div>
            <div className="w-2 h-2 bg-success rounded-full"></div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon name="Clock" size={20} className="text-warning" />
              </div>
              <div>
                <p className="font-medium text-foreground">Phone Verification</p>
                <p className="text-sm text-muted-foreground">Verify your phone number for enhanced security</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Verify Now
            </Button>
          </div>

          {user?.role === 'provider' && (
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Provider Verification</p>
                  <p className="text-sm text-muted-foreground">Complete identity verification to earn trust badges</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Start Verification
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;