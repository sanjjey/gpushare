import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingSpinner = ({ message = "Loading GPUs..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin mb-4">
        <Icon name="Loader2" size={32} className="text-primary" />
      </div>
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};

export default LoadingSpinner;