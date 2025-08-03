import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const GPUCard = ({ gpu, onCompareToggle, isInComparison }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleRentNow = (e) => {
    e?.stopPropagation();
    // Navigate to rental process or show rental modal
    console.log('Rent GPU:', gpu?.id);
  };

  const handleProviderClick = (e) => {
    e?.stopPropagation();
    // Navigate to provider profile
    console.log('View provider:', gpu?.provider?.id);
  };

  const handleCompareToggle = (e) => {
    e?.stopPropagation();
    onCompareToggle(gpu);
  };

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success bg-success/10';
      case 'busy':
        return 'text-warning bg-warning/10';
      case 'offline':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getAvailabilityText = (status) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'busy':
        return 'In Use';
      case 'offline':
        return 'Offline';
      default:
        return 'Unknown';
    }
  };

  const formatPrice = (price) => {
    return `$${price?.toFixed(2)}`;
  };

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-all duration-200 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => console.log('View GPU details:', gpu?.id)}
    >
      {/* GPU Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={gpu?.image}
          alt={`${gpu?.brand} ${gpu?.model}`}
          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
        />
        
        {/* Availability Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(gpu?.availability)}`}>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              gpu?.availability === 'available' ? 'bg-success' :
              gpu?.availability === 'busy' ? 'bg-warning' : 'bg-error'
            }`} />
            <span>{getAvailabilityText(gpu?.availability)}</span>
          </div>
        </div>

        {/* Compare Toggle */}
        <button
          onClick={handleCompareToggle}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isInComparison 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-black bg-opacity-50 text-white hover:bg-opacity-70'
          }`}
        >
          <Icon name="GitCompare" size={16} />
        </button>

        {/* Performance Score */}
        <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium">
          Score: {gpu?.performanceScore}
        </div>
      </div>
      {/* Card Content */}
      <div className="p-4">
        {/* GPU Title */}
        <div className="mb-2">
          <h3 className="font-semibold text-foreground text-lg truncate">
            {gpu?.brand} {gpu?.model}
          </h3>
          <p className="text-sm text-muted-foreground">
            {gpu?.memory}GB VRAM • {gpu?.architecture}
          </p>
        </div>

        {/* Key Specifications */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div className="flex items-center space-x-1">
            <Icon name="Zap" size={12} className="text-primary" />
            <span className="text-muted-foreground">{gpu?.powerConsumption}W</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Thermometer" size={12} className="text-primary" />
            <span className="text-muted-foreground">{gpu?.temperature}°C</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} className="text-primary" />
            <span className="text-muted-foreground">{gpu?.clockSpeed} MHz</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="HardDrive" size={12} className="text-primary" />
            <span className="text-muted-foreground">{gpu?.bandwidth} GB/s</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-1 mb-3">
          <Icon name="MapPin" size={14} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{gpu?.location}</span>
          <span className="text-sm text-muted-foreground">• {gpu?.distance} miles</span>
        </div>

        {/* Provider Info */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleProviderClick}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {gpu?.provider?.avatar ? (
                <Image
                  src={gpu?.provider?.avatar}
                  alt={gpu?.provider?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon name="User" size={12} className="text-muted-foreground" />
              )}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">{gpu?.provider?.name}</p>
              <div className="flex items-center space-x-1">
                {renderStars(gpu?.provider?.rating)}
                <span className="text-xs text-muted-foreground ml-1">
                  ({gpu?.provider?.reviewCount})
                </span>
              </div>
            </div>
          </button>
          
          {gpu?.provider?.verified && (
            <div className="flex items-center space-x-1 text-success">
              <Icon name="CheckCircle" size={14} />
              <span className="text-xs font-medium">Verified</span>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-foreground">
                {formatPrice(gpu?.pricing?.hourly)}
              </span>
              <span className="text-sm text-muted-foreground">/hour</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {formatPrice(gpu?.pricing?.daily)}/day • {formatPrice(gpu?.pricing?.monthly)}/month
            </div>
          </div>
          
          {gpu?.instantBooking && (
            <div className="flex items-center space-x-1 text-accent">
              <Icon name="Zap" size={14} />
              <span className="text-xs font-medium">Instant</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={handleRentNow}
            disabled={gpu?.availability !== 'available'}
          >
            {gpu?.availability === 'available' ? 'Rent Now' : 'Unavailable'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e?.stopPropagation();
              console.log('Contact provider:', gpu?.provider?.id);
            }}
          >
            <Icon name="MessageCircle" size={16} />
          </Button>
        </div>

        {/* Additional Info on Hover (Desktop) */}
        {isHovered && (
          <div className="hidden lg:block absolute inset-0 bg-card bg-opacity-95 p-4 rounded-lg">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Detailed Specs</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CUDA Cores:</span>
                    <span className="text-foreground">{gpu?.cudaCores}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">RT Cores:</span>
                    <span className="text-foreground">{gpu?.rtCores}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tensor Cores:</span>
                    <span className="text-foreground">{gpu?.tensorCores}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Memory Type:</span>
                    <span className="text-foreground">{gpu?.memoryType}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Uptime:</span>
                  <span className="text-success font-medium">{gpu?.uptime}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Active:</span>
                  <span className="text-foreground">{gpu?.lastActive}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GPUCard;