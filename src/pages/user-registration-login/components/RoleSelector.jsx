import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelector = ({ selectedRole, onRoleChange, error }) => {
  const roles = [
    {
      id: 'provider',
      title: 'GPU Provider',
      description: 'Rent out your GPU hardware and earn passive income',
      icon: 'Server',
      benefits: ['Monetize idle hardware', 'Flexible pricing control', 'Automated payments'],
      color: 'border-success hover:border-success/70 hover:bg-success/5'
    },
    {
      id: 'renter',
      title: 'GPU Renter',
      description: 'Access high-performance GPUs for your projects',
      icon: 'Monitor',
      benefits: ['Pay-per-use pricing', 'Instant access', 'No hardware investment'],
      color: 'border-primary hover:border-primary/70 hover:bg-primary/5'
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Choose Your Role *
        </label>
        {error && (
          <p className="text-sm text-destructive mb-3">{error}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles?.map((role) => (
          <div
            key={role?.id}
            onClick={() => onRoleChange(role?.id)}
            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedRole === role?.id
                ? role?.id === 'provider' ?'border-success bg-success/10' :'border-primary bg-primary/10'
                : `border-border ${role?.color}`
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                selectedRole === role?.id
                  ? role?.id === 'provider' ?'bg-success text-white' :'bg-primary text-white' :'bg-muted text-muted-foreground'
              }`}>
                <Icon name={role?.icon} size={20} />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  {role?.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {role?.description}
                </p>
                
                <ul className="space-y-1">
                  {role?.benefits?.map((benefit, index) => (
                    <li key={index} className="flex items-center text-xs text-muted-foreground">
                      <Icon name="Check" size={12} className="mr-2 text-success" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {selectedRole === role?.id && (
              <div className="absolute top-2 right-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  role?.id === 'provider' ? 'bg-success' : 'bg-primary'
                }`}>
                  <Icon name="Check" size={12} className="text-white" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;