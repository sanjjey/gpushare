import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ViewToggle = ({ currentView, onViewChange }) => {
  const viewOptions = [
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { value: 'list', icon: 'List', label: 'List View' },
    { value: 'map', icon: 'Map', label: 'Map View' }
  ];

  return (
    <div className="flex items-center bg-muted rounded-lg p-1">
      {viewOptions?.map(option => (
        <Button
          key={option?.value}
          variant={currentView === option?.value ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewChange(option?.value)}
          className="flex items-center space-x-1"
        >
          <Icon name={option?.icon} size={16} />
          <span className="hidden sm:inline">{option?.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default ViewToggle;