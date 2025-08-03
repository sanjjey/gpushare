import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLoginButtons = ({ onSocialLogin, loading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white hover:bg-gray-50 border border-border',
      textColor: 'text-foreground'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: 'Github',
      bgColor: 'bg-gray-900 hover:bg-gray-800',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="space-y-3">
      {socialProviders?.map((provider) => (
        <Button
          key={provider?.id}
          variant="outline"
          onClick={() => onSocialLogin(provider?.id)}
          disabled={loading}
          className={`w-full h-12 ${provider?.bgColor} ${provider?.textColor}`}
        >
          <Icon name={provider?.icon} size={20} className="mr-3" />
          Continue with {provider?.name}
        </Button>
      ))}
    </div>
  );
};

export default SocialLoginButtons;