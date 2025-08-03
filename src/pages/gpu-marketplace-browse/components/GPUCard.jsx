import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const GPUCard = ({ gpu, onCompareToggle, isInComparison }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showRentModal, setShowRentModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const navigate = useNavigate();

  const handleRentNow = (e) => {
    e?.stopPropagation();
    if (gpu?.availability === 'available') {
      setShowRentModal(true);
    }
  };

  const handleProviderClick = (e) => {
    e?.stopPropagation();
    // Navigate to provider dashboard for now since we don't have separate provider profile pages navigate('/gpu-provider-dashboard');
  };

  const handleCompareToggle = (e) => {
    e?.stopPropagation();
    onCompareToggle(gpu);
  };

  const handleContactProvider = (e) => {
    e?.stopPropagation();
    setShowContactModal(true);
  };

  const handleViewDetails = () => {
    // For now, we'll show an alert with detailed information since we don't have a details page
    const details = `
GPU Details:
• ${gpu?.brand} ${gpu?.model}
• ${gpu?.memory}GB VRAM (${gpu?.memoryType})
• Architecture: ${gpu?.architecture}
• CUDA Cores: ${gpu?.cudaCores}
• RT Cores: ${gpu?.rtCores}
• Tensor Cores: ${gpu?.tensorCores}
• Clock Speed: ${gpu?.clockSpeed} MHz
• Memory Bandwidth: ${gpu?.bandwidth} GB/s
• Power Consumption: ${gpu?.powerConsumption}W
• Temperature: ${gpu?.temperature}°C
• Performance Score: ${gpu?.performanceScore}
• Location: ${gpu?.location} (${gpu?.distance} miles)
• Uptime: ${gpu?.uptime}%
• Last Active: ${gpu?.lastActive}

Provider: ${gpu?.provider?.name}
Rating: ${gpu?.provider?.rating}/5 (${gpu?.provider?.reviewCount} reviews)
Verified: ${gpu?.provider?.verified ? 'Yes' : 'No'}

Pricing:
• Hourly: $${gpu?.pricing?.hourly}
• Daily: $${gpu?.pricing?.daily}
• Monthly: $${gpu?.pricing?.monthly}
    `;
    alert(details);
  };

  const RentModal = () => (
    showRentModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowRentModal(false)}>
        <div className="bg-card p-6 rounded-lg max-w-md w-full mx-4" onClick={(e) => e?.stopPropagation()}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Rent {gpu?.brand} {gpu?.model}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Rental Duration</label>
              <select className="w-full p-2 border border-border rounded-md bg-background text-foreground">
                <option value="hourly">Hourly - ${gpu?.pricing?.hourly}/hour</option>
                <option value="daily">Daily - ${gpu?.pricing?.daily}/day</option>
                <option value="monthly">Monthly - ${gpu?.pricing?.monthly}/month</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Duration</label>
              <input 
                type="number" 
                min="1" 
                defaultValue="1"
                className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                placeholder="Enter duration"
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowRentModal(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="default" 
                className="flex-1"
                onClick={() => {
                  alert('Rental request submitted! (Payment integration would be implemented here)');
                  setShowRentModal(false);
                }}
              >
                Proceed
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  const ContactModal = () => (
    showContactModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowContactModal(false)}>
        <div className="bg-card p-6 rounded-lg max-w-md w-full mx-4" onClick={(e) => e?.stopPropagation()}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Contact {gpu?.provider?.name}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
              <input 
                type="text" 
                className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                placeholder="Subject line"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Message</label>
              <textarea 
                rows="4"
                className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                placeholder="Your message..."
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowContactModal(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="default" 
                className="flex-1"
                onClick={() => {
                  alert('Message sent to provider! (Messaging system would be implemented here)');
                  setShowContactModal(false);
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );

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
    <>
      <div
        className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-all duration-200 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleViewDetails}
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
            title={isInComparison ? 'Remove from comparison' : 'Add to comparison'}
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
              title="View provider profile"
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
              title={gpu?.availability === 'available' ? 'Rent this GPU' : 'GPU not available'}
            >
              {gpu?.availability === 'available' ? 'Rent Now' : 'Unavailable'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleContactProvider}
              title="Contact provider"
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
      
      <RentModal />
      <ContactModal />
    </>
  );
};

export default GPUCard;