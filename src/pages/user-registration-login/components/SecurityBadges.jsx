import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Encrypted',
      color: 'text-success'
    },
    {
      icon: 'Lock',
      text: 'Secure Payments',
      color: 'text-primary'
    },
    {
      icon: 'CheckCircle',
      text: 'Verified Platform',
      color: 'text-accent'
    }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 py-6 border-t border-border">
      {securityFeatures?.map((feature, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Icon 
            name={feature?.icon} 
            size={16} 
            className={feature?.color} 
          />
          <span className="text-xs text-muted-foreground font-medium">
            {feature?.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SecurityBadges;