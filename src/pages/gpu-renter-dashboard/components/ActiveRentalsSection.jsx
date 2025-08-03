import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ActiveRentalsSection = ({ onExtendRental, onStopRental, onRemoteAccess }) => {
  const [activeRentals, setActiveRentals] = useState([]);

  useEffect(() => {
    const mockActiveRentals = [
      {
        id: 1,
        gpuModel: 'NVIDIA RTX 4090',
        provider: 'TechGuru_92',
        providerRating: 4.8,
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        duration: 4,
        remainingTime: 2 * 60 * 60 * 1000,
        hourlyRate: 4.50,
        totalCost: 18.00,
        status: 'active',
        sessionId: 'sess_4090_001',
        remoteAccessUrl: 'https://remote.gpushare.com/sess_4090_001',
        usage: {
          cpuUsage: 85,
          memoryUsage: 12.5,
          gpuUsage: 92
        },
        thumbnail: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop'
      },
      {
        id: 2,
        gpuModel: 'NVIDIA RTX 3080',
        provider: 'CloudMiner_Pro',
        providerRating: 4.6,
        startTime: new Date(Date.now() - 45 * 60 * 1000),
        duration: 2,
        remainingTime: 75 * 60 * 1000,
        hourlyRate: 3.25,
        totalCost: 6.50,
        status: 'active',
        sessionId: 'sess_3080_002',
        remoteAccessUrl: 'https://remote.gpushare.com/sess_3080_002',
        usage: {
          cpuUsage: 67,
          memoryUsage: 8.2,
          gpuUsage: 78
        },
        thumbnail: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop'
      }
    ];
    setActiveRentals(mockActiveRentals);
  }, []);

  const formatRemainingTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  };

  const formatElapsedTime = (startTime) => {
    const elapsed = Date.now() - startTime?.getTime();
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  };

  const getUsageColor = (usage) => {
    if (usage >= 80) return 'text-error';
    if (usage >= 60) return 'text-warning';
    return 'text-success';
  };

  const getUsageBarColor = (usage) => {
    if (usage >= 80) return 'bg-error';
    if (usage >= 60) return 'bg-warning';
    return 'bg-success';
  };

  if (activeRentals?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center shadow-minimal">
        <Icon name="Monitor" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Active Rentals</h3>
        <p className="text-muted-foreground mb-4">
          You don't have any active GPU rentals at the moment.
        </p>
        <Button variant="default" iconName="Search" iconPosition="left">
          Browse Available GPUs
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Active Rentals</h2>
        <span className="text-sm text-muted-foreground">
          {activeRentals?.length} active session{activeRentals?.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {activeRentals?.map((rental) => (
          <div key={rental?.id} className="bg-card border border-border rounded-lg p-6 shadow-minimal">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={rental?.thumbnail}
                    alt={rental?.gpuModel}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{rental?.gpuModel}</h3>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{rental?.provider}</span>
                    <div className="flex items-center">
                      <Icon name="Star" size={12} className="text-warning fill-current" />
                      <span className="ml-1">{rental?.providerRating}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-success">ACTIVE</span>
              </div>
            </div>

            {/* Session Timer */}
            <div className="bg-muted rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Session Time</span>
                <span className="text-sm text-muted-foreground">
                  ${rental?.hourlyRate}/hour
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-foreground">
                    {formatRemainingTime(rental?.remainingTime)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Remaining ({formatElapsedTime(rental?.startTime)} elapsed)
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-foreground">
                    ${rental?.totalCost?.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">Total Cost</div>
                </div>
              </div>
            </div>

            {/* Usage Monitoring */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground mb-3">Resource Usage</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">GPU</span>
                  <span className={`text-xs font-medium ${getUsageColor(rental?.usage?.gpuUsage)}`}>
                    {rental?.usage?.gpuUsage}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getUsageBarColor(rental?.usage?.gpuUsage)}`}
                    style={{ width: `${rental?.usage?.gpuUsage}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Memory</span>
                  <span className="text-xs font-medium text-foreground">
                    {rental?.usage?.memoryUsage} GB
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${(rental?.usage?.memoryUsage / 24) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={() => onRemoteAccess(rental)}
                iconName="Monitor"
                iconPosition="left"
              >
                Remote Access
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onExtendRental(rental)}
                iconName="Clock"
              >
                Extend
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onStopRental(rental)}
                iconName="Square"
              >
                Stop
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveRentalsSection;