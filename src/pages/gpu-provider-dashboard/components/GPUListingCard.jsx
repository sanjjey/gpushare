import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const GPUListingCard = ({ gpu, onToggleAvailability, onEdit, onViewAnalytics }) => {
  const [isAvailable, setIsAvailable] = useState(gpu?.isAvailable);

  const handleToggleAvailability = () => {
    const newStatus = !isAvailable;
    setIsAvailable(newStatus);
    if (onToggleAvailability) {
      onToggleAvailability(gpu?.id, newStatus);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-success/10 text-success border-success/20';
      case 'rented':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'offline':
        return 'bg-muted text-muted-foreground border-border';
      case 'maintenance':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return 'CheckCircle';
      case 'rented':
        return 'Play';
      case 'offline':
        return 'XCircle';
      case 'maintenance':
        return 'AlertTriangle';
      default:
        return 'Circle';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-minimal hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* GPU Image */}
        <div className="w-full sm:w-32 h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={gpu?.image}
            alt={gpu?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* GPU Details */}
        <div className="flex-1 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{gpu?.name}</h3>
              <p className="text-sm text-muted-foreground">{gpu?.model}</p>
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(gpu?.status)}`}>
              <Icon name={getStatusIcon(gpu?.status)} size={14} className="mr-1" />
              {gpu?.status?.charAt(0)?.toUpperCase() + gpu?.status?.slice(1)}
            </div>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Memory:</span>
              <p className="font-medium text-foreground">{gpu?.memory}</p>
            </div>
            <div>
              <span className="text-muted-foreground">CUDA Cores:</span>
              <p className="font-medium text-foreground">{gpu?.cudaCores}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Base Clock:</span>
              <p className="font-medium text-foreground">{gpu?.baseClock}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Power:</span>
              <p className="font-medium text-foreground">{gpu?.power}</p>
            </div>
          </div>

          {/* Pricing and Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center space-x-4">
              <div>
                <span className="text-sm text-muted-foreground">Hourly Rate:</span>
                <p className="text-lg font-bold text-foreground">{formatCurrency(gpu?.hourlyRate)}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Total Earned:</span>
                <p className="text-sm font-medium text-success">{formatCurrency(gpu?.totalEarned)}</p>
              </div>
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Available:</span>
              <button
                onClick={handleToggleAvailability}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAvailable ? 'bg-success' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAvailable ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          iconName="Edit"
          iconPosition="left"
          onClick={() => onEdit && onEdit(gpu?.id)}
        >
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="BarChart3"
          iconPosition="left"
          onClick={() => onViewAnalytics && onViewAnalytics(gpu?.id)}
        >
          Analytics
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="MoreHorizontal"
        >
          More
        </Button>
      </div>
      {/* Quick Stats */}
      {gpu?.status === 'rented' && (
        <div className="mt-4 p-3 bg-primary/5 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="User" size={14} className="text-primary" />
              <span className="text-muted-foreground">Rented by:</span>
              <span className="font-medium text-foreground">{gpu?.currentRenter}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} className="text-primary" />
              <span className="text-muted-foreground">Session:</span>
              <span className="font-medium text-foreground">{gpu?.sessionDuration}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GPUListingCard;